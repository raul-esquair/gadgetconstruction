import { NextResponse } from "next/server";
import { isCronAuthorized } from "@/lib/reviews/cron-auth";
import { healthSnapshot } from "@/lib/reviews/queries";

export const dynamic = "force-dynamic";

/**
 * Health check for the review-request system, polled daily at 18:00 UTC by
 * .github/workflows/review-system-health.yml — an hour after the send — which
 * emails an alert when `ok` is false or this doesn't answer 200.
 *
 * It exists for the failures that are otherwise silent: every one of these
 * leaves the site looking fine while customers stop getting review emails.
 * The window is 26 hours so each daily check covers the send before it, with
 * slack for the check running late.
 *
 * ⚠️ The response is printed in public GitHub Actions logs. Counts and
 * generic messages only — never customer data or raw error text.
 */
const WINDOW_HOURS = 26;

export async function GET(request: Request) {
  if (!isCronAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const problems: string[] = [];

  if (!process.env.RESEND_API_KEY) {
    problems.push("RESEND_API_KEY is not set on Netlify, so no review email can send.");
  }
  if (!process.env.CONTACT_EMAIL) {
    problems.push("CONTACT_EMAIL is not set on Netlify, so unhappy-customer alerts from /feedback fail.");
  }

  let snapshot;
  try {
    snapshot = await healthSnapshot(WINDOW_HOURS);
  } catch (err) {
    // Details go to the Netlify function log, not the public response.
    console.error("[review-health] database check failed:", err);
    problems.push(
      "The database did not answer. Check whether the Supabase project is paused (Supabase dashboard → Restore) and that DATABASE_URL on Netlify is current.",
    );
    return NextResponse.json({ ok: false, problems }, { status: 503 });
  }

  const sentRecently =
    snapshot.lastSentAt !== null &&
    Date.now() - snapshot.lastSentAt.getTime() < WINDOW_HOURS * 3_600_000;

  // Overdue alone is normal during a backfill — the batch cap drains it a few
  // a day. Overdue with nothing sent in the window means the send isn't running.
  if (snapshot.overdue > 0 && !sentRecently) {
    problems.push(
      `${snapshot.overdue} review email(s) are overdue and nothing has been sent in ${WINDOW_HOURS} hours. The daily 17:00 UTC send is probably not running: check Netlify → Logs → Functions → review-dispatch.`,
    );
  }

  // The touch is claimed before the send, so a rejected send leaves a claim
  // with no Resend id — and that customer skips that email for good.
  if (snapshot.unconfirmedRecent > 0) {
    problems.push(
      `${snapshot.unconfirmedRecent} review email(s) in the last ${WINDOW_HOURS} hours were never confirmed by Resend, so they were probably rejected. Check the Resend dashboard and the review-dispatch function log.`,
    );
  }

  return NextResponse.json({
    ok: problems.length === 0,
    problems,
    checks: {
      database: "ok",
      due: snapshot.due,
      overdue: snapshot.overdue,
      lastSentAt: snapshot.lastSentAt?.toISOString() ?? null,
      unconfirmedRecent: snapshot.unconfirmedRecent,
    },
  });
}
