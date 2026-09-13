import { COMPANY } from "@/lib/constants";
import type { ReviewRequest } from "@/lib/db/schema";
import { escapeHtml } from "@/lib/utils";
import type { TouchNumber } from "./schedule";
import { addDays, daysBetween, todayInBusinessTz } from "./dates";

export interface RenderedEmail {
  subject: string;
  text: string;
  html: string;
  unsubscribeUrl: string;
}

/**
 * The part of each email Osmin can edit from /dashboard/settings. The feedback
 * link, signature, license line and unsubscribe footer are added around it
 * and are not editable — an edit must not be able to drop the link or the
 * opt-out.
 */
export interface EmailTemplate {
  subject: string;
  body: string;
}

export const SUBJECT_MAX = 150;
export const BODY_MAX = 3000;

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

/** Fields a template can use, written as {first_name} in the text. */
export const MERGE_FIELDS = [
  { key: "first_name", label: "Customer's first name", example: "Jane" },
  { key: "project", label: "The job, e.g. “your new deck” or “your project”", example: "your new deck" },
  {
    key: "when_finished",
    label: "“today”, “a few days ago” or “a little while back”",
    example: "a few days ago",
  },
] as const;

export type MergeFieldKey = (typeof MERGE_FIELDS)[number]["key"];

/**
 * The launch copy, and what "Reset to original" restores.
 *
 * Subject lines assume the work is good rather than asking whether it was.
 * "How did it turn out?" reads as a contractor unsure of his own job — the
 * ask isn't whether the deck is good, it's whether they'd say so publicly.
 * Each of the three also has to look distinct in an inbox; three
 * near-identical lines from one sender read as automation.
 */
export const DEFAULT_TEMPLATES: Record<TouchNumber, EmailTemplate> = {
  1: {
    subject: "A favor about {project}",
    body: [
      "Hi {first_name},",
      `${COMPANY.ownerFirstName} here from ${COMPANY.shortName}. We finished {project} {when_finished}.`,
      "I'd be grateful if you'd take thirty seconds to tell me how it went. It comes straight to me, and it's how the next homeowner decides whether to trust us with their house.",
    ].join("\n\n"),
  },
  2: {
    subject: "Still hoping to hear from you, {first_name}",
    body: [
      "Hi {first_name},",
      "I know how easily an email like this gets buried, so I wanted to send one more.",
      "If anything about {project} isn't right, I'd rather hear it from you than not hear it at all.",
    ].join("\n\n"),
  },
  3: {
    subject: "Last one from me, I promise",
    body: [
      "Hi {first_name},",
      "This is the last time I'll ask, I promise.",
      "If {project} turned out well, a quick word from you helps us more than just about anything else. And if it didn't, I'd still like the chance to make it right.",
    ].join("\n\n"),
  },
};

/** Line endings normalised and trailing space trimmed, so comparisons are stable. */
export function normalizeTemplate(t: EmailTemplate): EmailTemplate {
  return {
    subject: t.subject.replace(/\s+/g, " ").trim(),
    body: t.body.replace(/\r\n?/g, "\n").replace(/[ \t]+$/gm, "").trim(),
  };
}

export function isDefaultTemplate(n: TouchNumber, t: EmailTemplate): boolean {
  const a = normalizeTemplate(t);
  const b = normalizeTemplate(DEFAULT_TEMPLATES[n]);
  return a.subject === b.subject && a.body === b.body;
}

const FIELD_PATTERN = /\{([^{}]*)\}/g;
const FIELD_KEYS = new Set<string>(MERGE_FIELDS.map((f) => f.key));

/** Every {placeholder} in the text that isn't a known field, e.g. a typo'd {frist_name}. */
export function unknownFields(text: string): string[] {
  const found = [...text.matchAll(FIELD_PATTERN)].map((m) => m[1]);
  return [...new Set(found.filter((key) => !FIELD_KEYS.has(key)))];
}

/** Problems with a template, as sentences for the settings page; empty when it's fine. */
export function templateProblems(t: EmailTemplate): string[] {
  const { subject, body } = normalizeTemplate(t);
  const problems: string[] = [];
  if (!subject) problems.push("The subject can't be empty.");
  if (subject.length > SUBJECT_MAX) problems.push(`Keep the subject under ${SUBJECT_MAX} characters.`);
  if (!body) problems.push("The message can't be empty.");
  if (body.length > BODY_MAX) problems.push(`Keep the message under ${BODY_MAX} characters.`);
  const unknown = unknownFields(`${subject}\n${body}`);
  if (unknown.length > 0) {
    problems.push(
      `${unknown.map((k) => `{${k}}`).join(", ")} isn't a field. Use ${MERGE_FIELDS.map((f) => `{${f.key}}`).join(", ")}.`,
    );
  }
  return problems;
}

function fill(text: string, values: Record<MergeFieldKey, string>): string {
  return text.replace(FIELD_PATTERN, (match, key: string) =>
    key in values ? values[key as MergeFieldKey] : match,
  );
}

function firstName(full: string): string {
  return full.trim().split(/\s+/)[0] || full.trim();
}

/**
 * {when_finished} has to match how long ago the job actually finished. With
 * same-day sends possible, "a few days ago" is wrong as often as it's right.
 */
function whenFinished(request: ReviewRequest, today: string): string {
  const age = request.completedAt ? daysBetween(request.completedAt, today) : null;
  if (age !== null && age <= 0) return "today";
  if (age !== null && age <= 7) return "a few days ago";
  return "a little while back";
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

/**
 * Pure and dependency-light on purpose: the settings page runs it in the
 * browser for its live preview, and the owner guide's build script runs it to
 * print the emails word for word.
 *
 * A request with an empty token (the settings page's test send) links to the
 * bare /feedback and /unsubscribe pages, so clicking through writes nothing.
 */
export function renderReviewEmail(
  request: ReviewRequest,
  touch: TouchNumber,
  today: string = todayInBusinessTz(),
  template: EmailTemplate = DEFAULT_TEMPLATES[touch],
): RenderedEmail {
  const query = request.token ? `?t=${request.token}` : "";
  const feedbackUrl = `${COMPANY.url}/feedback${query}`;
  const unsubscribeUrl = `${COMPANY.url}/unsubscribe${query}`;

  const values: Record<MergeFieldKey, string> = {
    first_name: firstName(request.name),
    project: (request.projectType && PROJECT_PHRASES[request.projectType]) || "your project",
    when_finished: whenFinished(request, today),
  };

  const { subject: rawSubject, body: rawBody } = normalizeTemplate(template);
  const subject = fill(rawSubject, values);
  const body = fill(rawBody, values);
  const paragraphs = body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

  const text = [
    paragraphs.join("\n\n"),
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
    paragraphs
      .map((p) => `  <p style="margin:0 0 16px;">${escapeHtml(p).replace(/\n/g, "<br>")}</p>`)
      .join("\n"),
    feedbackUrl,
    unsubscribeUrl,
  );

  return { subject, text, html, unsubscribeUrl };
}

/**
 * The made-up customer behind the settings page's preview and test sends.
 * Finished three days ago, so {when_finished} reads "a few days ago".
 */
export function sampleCustomer(today: string): ReviewRequest {
  const now = new Date();
  return {
    id: "sample",
    token: "",
    name: "Jane Doe",
    email: "jane@example.com",
    phone: null,
    projectType: "composite-decks",
    completedAt: addDays(today, -3),
    startAt: today,
    status: "active",
    stoppedReason: null,
    stoppedAt: null,
    respondedAt: null,
    rating: null,
    notes: null,
    createdAt: now,
    updatedAt: now,
  };
}
