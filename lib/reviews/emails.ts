import { COMPANY } from "@/lib/constants";
import type { ReviewRequest } from "@/lib/db/schema";
import { escapeHtml } from "@/lib/utils";
import type { TouchNumber } from "./schedule";
import { daysBetween, todayInBusinessTz } from "./dates";

export interface RenderedEmail {
  subject: string;
  text: string;
  html: string;
  unsubscribeUrl: string;
}

/**
 * How each service reads mid-sentence: "We finished ___ today", "A favor
 * about ___", "If ___ turned out well". Written out by hand because the
 * service names don't survive being lowercased into a sentence ("your
 * concrete foundations & slabs"). Keyed by SERVICES slug; a service missing
 * here falls back to "your project".
 */
const PROJECT_PHRASES: Record<string, string> = {
  "concrete-foundations": "your new foundation",
  "structural-repairs": "the structural repair",
  "retaining-walls": "your new retaining wall",
  "complete-remodel": "your remodel",
  "composite-decks": "your new deck",
  "exterior-repairs": "the exterior repairs",
};

function firstName(full: string): string {
  return full.trim().split(/\s+/)[0] || full.trim();
}

function projectPhrase(request: ReviewRequest): string | null {
  return request.projectType ? (PROJECT_PHRASES[request.projectType] ?? null) : null;
}

/**
 * Touch 1's opening line has to match how long ago the job actually finished.
 * With same-day sends possible, "a few days ago" is wrong as often as it's
 * right.
 */
function openingLine(request: ReviewRequest, phrase: string, today: string): string {
  const intro = `${COMPANY.ownerFirstName} here from ${COMPANY.shortName}.`;
  const age = request.completedAt ? daysBetween(request.completedAt, today) : null;

  if (age !== null && age <= 0) return `${intro} We wrapped up ${phrase} today.`;
  if (age !== null && age <= 7) return `${intro} We finished ${phrase} a few days ago.`;
  return `${intro} We finished ${phrase} a little while back, and I wanted to follow up.`;
}

/**
 * Deliberately plain. These read as an email one contractor typed to one
 * customer — no logo banner, no button graphics, no columns. A designed
 * marketing template converts worse here and is more likely to be filtered.
 */
function wrap(bodyHtml: string, feedbackUrl: string, unsubscribeUrl: string): string {
  return `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#222222;max-width:520px;">
${bodyHtml}
  <p style="margin:24px 0;">
    <a href="${feedbackUrl}" style="color:#CC0000;font-weight:600;">${escapeHtml(feedbackUrl)}</a>
  </p>
  <p style="margin:24px 0 4px;">Thanks,<br>${escapeHtml(COMPANY.owner)}<br>
    <span style="color:#666;">${escapeHtml(COMPANY.name)} &middot; CA Lic. #${escapeHtml(COMPANY.license)}</span><br>
    <a href="${COMPANY.phoneHref}" style="color:#CC0000;">${escapeHtml(COMPANY.phone)}</a>
  </p>
  <p style="margin:28px 0 0;font-size:12px;color:#999;">
    Don't want these? <a href="${unsubscribeUrl}" style="color:#999;">Unsubscribe</a>.
  </p>
</div>`.trim();
}

export function renderReviewEmail(
  request: ReviewRequest,
  touch: TouchNumber,
  today: string = todayInBusinessTz(),
): RenderedEmail {
  const name = firstName(request.name);
  const phrase = projectPhrase(request);
  const project = phrase ?? "your project";
  const feedbackUrl = `${COMPANY.url}/feedback?t=${request.token}`;
  const unsubscribeUrl = `${COMPANY.url}/unsubscribe?t=${request.token}`;

  let subject: string;
  let lines: string[];

  /**
   * Subject lines assume the work is good rather than asking whether it was.
   * "How did it turn out?" reads as a contractor unsure of his own job — the
   * ask isn't whether the deck is good, it's whether they'd say so publicly.
   * Each of the three also has to look distinct in an inbox; three
   * near-identical lines from one sender read as automation.
   */
  if (touch === 1) {
    subject = phrase ? `A favor about ${phrase}` : `A favor to ask you`;
    lines = [
      `Hi ${name},`,
      openingLine(request, project, today),
      `I'd be grateful if you'd take thirty seconds to tell me how it went. It comes straight to me, and it's how the next homeowner decides whether to trust us with their house.`,
    ];
  } else if (touch === 2) {
    subject = `Still hoping to hear from you, ${name}`;
    lines = [
      `Hi ${name},`,
      `I know how easily an email like this gets buried, so I wanted to send one more.`,
      `If anything about ${project} isn't right, I'd rather hear it from you than not hear it at all.`,
    ];
  } else {
    subject = `Last one from me, I promise`;
    lines = [
      `Hi ${name},`,
      `This is the last time I'll ask, I promise.`,
      `If ${project} turned out well, a quick word from you helps us more than just about anything else. And if it didn't, I'd still like the chance to make it right.`,
    ];
  }

  const text = [
    lines.join("\n\n"),
    ``,
    feedbackUrl,
    ``,
    `Thanks,`,
    COMPANY.owner,
    `${COMPANY.name} · CA Lic. #${COMPANY.license}`,
    COMPANY.phone,
    ``,
    `Don't want these? Unsubscribe: ${unsubscribeUrl}`,
  ].join("\n");

  const html = wrap(
    lines.map((l) => `  <p style="margin:0 0 16px;">${escapeHtml(l)}</p>`).join("\n"),
    feedbackUrl,
    unsubscribeUrl,
  );

  return { subject, text, html, unsubscribeUrl };
}
