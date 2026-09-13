"use server";

import { Resend } from "resend";
import { COMPANY } from "@/lib/constants";
import { escapeHtml } from "@/lib/utils";
import { getReviewSettings } from "@/lib/reviews/queries";

export interface FeedbackSubmission {
  /** 1 = not happy … 4 = delighted. Mostly 1–2; 3–4 via the "tell Osmin privately" link. */
  rating: number;
  name: string;
  email: string;
  phone: string;
  details: string;
  /** Set when the customer came from a tracked review-request email. */
  token?: string | null;
}

export type FeedbackResult = { ok: true } | { ok: false; error: string };

const FROM = "Gadget Construction <estimates@gadgetconstructionsf.com>";
const CALL_US = `Something went wrong. Please call us at ${COMPANY.phone}.`;

const RATING_LABELS: Record<number, string> = {
  1: "Not happy",
  2: "Could have been better",
  3: "Happy",
  4: "Delighted",
};

/**
 * Private feedback from /feedback. Goes to the same inbox as estimate leads,
 * plus an ntfy push at a higher priority than a lead gets — an unhappy
 * customer is the more time-sensitive of the two.
 */
export async function submitFeedback(data: FeedbackSubmission): Promise<FeedbackResult> {
  const name = data.name?.trim();
  const details = data.details?.trim();
  const email = data.email?.trim() || "";
  const phone = data.phone?.trim() || "";
  const rating = Number(data.rating);

  if (!name || !details) {
    return { ok: false, error: "Please add your name and tell us what happened." };
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 4) {
    return { ok: false, error: CALL_US };
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  // A complaint with no way to reach the person back is the one failure mode
  // that makes this page pointless.
  if (!email && !phone) {
    return {
      ok: false,
      error: "Please add a phone number or an email so we can reach you.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = await alertRecipients();
  if (!apiKey || to.length === 0) {
    console.error("submitFeedback: RESEND_API_KEY or CONTACT_EMAIL is not set");
    return { ok: false, error: CALL_US };
  }

  const ratingLabel = RATING_LABELS[rating] ?? String(rating);
  const subject = `Customer feedback — ${ratingLabel} — ${name}`;

  const text = [
    `A customer left private feedback on the website.`,
    ``,
    `Rating: ${ratingLabel} (${rating} of 4)`,
    ``,
    data.token ? `(Matched to a tracked review request.)` : `(Arrived without a tracking link.)`,
    ``,
    `Name: ${name}`,
    `Phone: ${phone || "Not provided"}`,
    `Email: ${email || "Not provided"}`,
    ``,
    `What they said:`,
    details,
    ``,
    email
      ? `Reply directly to this email to respond to ${name}.`
      : `No email provided — call ${phone} to follow up.`,
  ].join("\n");

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#222222;">
      <div style="background:#CC0000;color:#fff;padding:12px 16px;border-radius:8px;margin:0 0 20px;">
        <p style="margin:0;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;">Private customer feedback</p>
        <p style="margin:4px 0 0;font-size:18px;font-weight:600;">${escapeHtml(ratingLabel)}</p>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:6px 0;color:#666;width:110px;">Name</td><td style="padding:6px 0;font-weight:600;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:6px 0;color:#666;">Phone</td><td style="padding:6px 0;">${
          phone
            ? `<a href="tel:${escapeHtml(phone)}" style="color:#CC0000;">${escapeHtml(phone)}</a>`
            : '<span style="color:#999;">Not provided</span>'
        }</td></tr>
        <tr><td style="padding:6px 0;color:#666;">Email</td><td style="padding:6px 0;">${
          email
            ? `<a href="mailto:${escapeHtml(email)}" style="color:#CC0000;">${escapeHtml(email)}</a>`
            : '<span style="color:#999;">Not provided</span>'
        }</td></tr>
      </table>
      <h3 style="margin:24px 0 8px;font-size:15px;">What they said</h3>
      <p style="margin:0;white-space:pre-wrap;font-size:14px;line-height:1.5;">${escapeHtml(details)}</p>
      <p style="margin:24px 0 0;font-size:12px;color:#888;">${
        email
          ? `Reply directly to this email to respond to ${escapeHtml(name)}.`
          : `No email provided — call ${escapeHtml(phone)} to follow up.`
      }</p>
    </div>
  `;

  const emailPromise = new Resend(apiKey).emails.send({
    from: FROM,
    to,
    ...(email ? { replyTo: email } : {}),
    subject,
    text,
    html,
  });

  const ntfyPromise = sendNtfy({ name, phone, email, ratingLabel, details });

  try {
    const [emailResult, ntfyResult] = await Promise.allSettled([emailPromise, ntfyPromise]);

    if (ntfyResult.status === "rejected") {
      console.error("ntfy error:", ntfyResult.reason);
    }

    if (emailResult.status === "rejected") {
      console.error("Resend threw:", emailResult.reason);
      return { ok: false, error: CALL_US };
    }
    if (emailResult.value.error) {
      console.error("Resend error:", emailResult.value.error);
      return { ok: false, error: CALL_US };
    }

    return { ok: true };
  } catch (err) {
    console.error("submitFeedback threw:", err);
    return { ok: false, error: CALL_US };
  }
}

/**
 * Whoever Osmin chose on the dashboard's settings page, else CONTACT_EMAIL.
 * A database hiccup falls back to CONTACT_EMAIL rather than losing the
 * complaint — this is the one email that must always go somewhere.
 */
async function alertRecipients(): Promise<string[]> {
  const fallback = process.env.CONTACT_EMAIL ? [process.env.CONTACT_EMAIL] : [];
  try {
    const { alertEmails } = await getReviewSettings();
    return alertEmails.length > 0 ? alertEmails : fallback;
  } catch (err) {
    console.error("submitFeedback: could not read alert recipients, using CONTACT_EMAIL:", err);
    return fallback;
  }
}

async function sendNtfy(p: {
  name: string;
  phone: string;
  email: string;
  ratingLabel: string;
  details: string;
}) {
  const topic = process.env.NTFY_TOPIC;
  if (!topic) return;

  const body = [
    `${p.name}${p.phone ? ` · ${p.phone}` : ""}`,
    p.email || "",
    "",
    p.details.length > 300 ? `${p.details.slice(0, 300)}…` : p.details,
  ]
    .filter(Boolean)
    .join("\n");

  // HTTP headers must be Latin-1, so the title stays ASCII — a customer's
  // name belongs in the body, where UTF-8 is fine.
  const telDigits = p.phone.replace(/[^\d+]/g, "");
  const res = await fetch(`https://ntfy.sh/${encodeURIComponent(topic)}`, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      Title: `Unhappy customer - ${p.ratingLabel}`,
      Priority: "5",
      Tags: "warning",
      ...(telDigits ? { Click: `tel:${telDigits}` } : {}),
    },
    body,
  });

  if (!res.ok) {
    throw new Error(`ntfy ${res.status}: ${await res.text()}`);
  }
}
