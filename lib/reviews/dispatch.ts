import { Resend } from "resend";
import { COMPANY } from "@/lib/constants";
import { renderReviewEmail } from "./emails";
import {
  attachProviderId,
  closeCompletedSequences,
  findDueRequests,
  getReviewSettings,
  recordTouch,
} from "./queries";

/**
 * From Osmin, on the domain already verified in Resend for the estimate form.
 * The address only has to exist as a sender — replies go to REPLY_TO.
 */
export const FROM = `${COMPANY.owner} <osmin@gadgetconstructionsf.com>`;

/**
 * Replies go to an inbox someone actually reads: the address set on the
 * dashboard's settings page, else REVIEW_REPLY_TO, else the same inbox the
 * estimate leads land in.
 */
export function defaultReplyTo(): string | null {
  return process.env.REVIEW_REPLY_TO || process.env.CONTACT_EMAIL || null;
}

/**
 * Per-run send cap. Two reasons it exists:
 *  1. Deliverability — a domain that normally sends a handful of
 *     transactional emails suddenly emitting 40 looks like a compromised
 *     account to receiving servers.
 *  2. Netlify scheduled functions time out at 30s.
 */
const DEFAULT_BATCH_LIMIT = 8;

export interface DispatchResult {
  attempted: number;
  sent: number;
  failed: number;
  skipped: number;
  closed: number;
  errors: string[];
  dryRun: boolean;
  /** Sending is paused from the dashboard — nothing was considered. */
  paused: boolean;
}

export async function dispatchReviewEmails(
  options: { limit?: number; dryRun?: boolean } = {},
): Promise<DispatchResult> {
  const envLimit = Number(process.env.REVIEW_BATCH_LIMIT);
  const limit =
    options.limit ?? (Number.isFinite(envLimit) && envLimit > 0 ? envLimit : DEFAULT_BATCH_LIMIT);
  const dryRun = options.dryRun ?? false;

  const result: DispatchResult = {
    attempted: 0,
    sent: 0,
    failed: 0,
    skipped: 0,
    closed: 0,
    errors: [],
    dryRun,
    paused: false,
  };

  // Read fresh on every run. If this throws, the run fails loudly (and the
  // health check notices) rather than assuming "not paused".
  const settings = await getReviewSettings();
  if (settings.paused) {
    result.paused = true;
    return result;
  }

  const due = await findDueRequests(limit, settings);
  result.attempted = due.length;

  if (due.length === 0) {
    if (!dryRun) result.closed = await closeCompletedSequences(settings);
    return result;
  }

  // Checked before any touch is claimed, so a misconfigured deploy doesn't
  // silently burn touches it can't send.
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey && !dryRun) {
    result.errors.push("RESEND_API_KEY is not set — nothing sent.");
    result.failed = due.length;
    return result;
  }

  const resend = apiKey ? new Resend(apiKey) : null;

  for (const { request, touch } of due) {
    const email = renderReviewEmail(request, touch, undefined, settings.templates[touch]);

    if (dryRun) {
      result.sent++;
      continue;
    }

    /**
     * Claim the touch BEFORE sending. If the process dies mid-run, the worst
     * case is a customer misses one email — invisible and recoverable.
     * Recording afterwards would risk sending the same email twice, which is
     * neither. The unique index makes the claim atomic.
     */
    const claimed = await recordTouch(request.id, touch);
    if (!claimed) {
      result.skipped++;
      continue;
    }

    try {
      const sendResult = await resend!.emails.send({
        from: FROM,
        to: request.email,
        replyTo: settings.replyTo ?? defaultReplyTo() ?? undefined,
        subject: email.subject,
        text: email.text,
        html: email.html,
        headers: {
          // Improves deliverability and gives Gmail/Outlook a native
          // unsubscribe affordance.
          "List-Unsubscribe": `<${email.unsubscribeUrl}>`,
        },
      });

      if (sendResult.error) {
        result.failed++;
        result.errors.push(`${request.email} touch ${touch}: ${sendResult.error.message}`);
        continue;
      }

      // Backfill the message id now that we have it. Best-effort — the email
      // is already out, so a failure here must not be reported as a failure.
      if (sendResult.data?.id) {
        try {
          await attachProviderId(request.id, touch, sendResult.data.id);
        } catch (err) {
          console.error(`Could not record provider id for ${request.email}:`, err);
        }
      }

      result.sent++;
    } catch (err) {
      result.failed++;
      result.errors.push(
        `${request.email} touch ${touch}: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  if (!dryRun) result.closed = await closeCompletedSequences(settings);
  return result;
}
