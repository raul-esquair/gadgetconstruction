"use client";

import { useMemo, useRef, useState } from "react";
import { RotateCcw, Send } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { sendTestEmail } from "@/lib/actions/review-settings";
import {
  BODY_MAX,
  DEFAULT_TEMPLATES,
  MERGE_FIELDS,
  isDefaultTemplate,
  renderReviewEmail,
  sampleCustomer,
  unknownFields,
  type EmailTemplate,
} from "@/lib/reviews/emails";
import type { TouchNumber } from "@/lib/reviews/schedule";
import { cn } from "@/lib/utils";
import { errorFieldClass, fieldClass, FieldError } from "./controls";

type TestState = { status: "idle" } | { status: "sending" } | { status: "sent"; to: string } | { status: "error"; message: string };

export default function EmailEditor({
  n,
  template,
  onChange,
  error,
  inUse,
  today,
  testTo: initialTestTo,
}: {
  n: TouchNumber;
  template: EmailTemplate;
  onChange: (t: EmailTemplate) => void;
  error?: string;
  /** False when the schedule sends fewer emails than this one. */
  inUse: boolean;
  today: string;
  testTo: string;
}) {
  const subjectRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  // Field chips insert into whichever box was used last.
  const lastFocused = useRef<"subject" | "body">("body");
  const [testTo, setTestTo] = useState(initialTestTo);
  const [test, setTest] = useState<TestState>({ status: "idle" });

  const preview = useMemo(
    () => renderReviewEmail(sampleCustomer(today), n, today, template),
    [n, template, today],
  );
  const typos = unknownFields(`${template.subject}\n${template.body}`);
  const customized = !isDefaultTemplate(n, template);
  const errorId = `template${n}-error`;

  function insertField(key: string) {
    const token = `{${key}}`;
    const target = lastFocused.current;
    const el = target === "subject" ? subjectRef.current : bodyRef.current;
    const value = target === "subject" ? template.subject : template.body;
    const start = el?.selectionStart ?? value.length;
    const end = el?.selectionEnd ?? value.length;
    const next = value.slice(0, start) + token + value.slice(end);
    onChange({ ...template, [target]: next });

    // Put the cursor after the inserted field once React has re-rendered.
    requestAnimationFrame(() => {
      el?.focus();
      el?.setSelectionRange(start + token.length, start + token.length);
    });
  }

  async function onSendTest() {
    setTest({ status: "sending" });
    const result = await sendTestEmail({ touch: n, template, to: testTo });
    setTest(result.ok ? { status: "sent", to: testTo.trim() } : { status: "error", message: result.error });
  }

  return (
    <div className="space-y-5">
      {!inUse && (
        <p className="rounded-lg bg-neutral-50 px-4 py-3 text-sm text-neutral-500">
          Your schedule doesn&apos;t send this email right now. You can still edit it &mdash; it&apos;s used if
          you raise the number of emails.
        </p>
      )}

      <div>
        <label htmlFor={`subject-${n}`} className="block text-sm font-medium text-primary font-heading mb-1.5">
          Subject
        </label>
        <input
          ref={subjectRef}
          id={`subject-${n}`}
          type="text"
          value={template.subject}
          onFocus={() => (lastFocused.current = "subject")}
          onChange={(e) => onChange({ ...template, subject: e.target.value })}
          className={cn(fieldClass, error && errorFieldClass)}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
        />
      </div>

      <div>
        <div className="flex items-end justify-between gap-3 mb-1.5">
          <label htmlFor={`body-${n}`} className="block text-sm font-medium text-primary font-heading">
            Message
          </label>
          <span className="text-xs text-neutral-300 tabular-nums">
            {template.body.length} / {BODY_MAX}
          </span>
        </div>
        <textarea
          ref={bodyRef}
          id={`body-${n}`}
          rows={9}
          value={template.body}
          onFocus={() => (lastFocused.current = "body")}
          onChange={(e) => onChange({ ...template, body: e.target.value })}
          className={cn(fieldClass, "resize-y leading-relaxed", error && errorFieldClass)}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : `fields-${n}`}
        />
        {error && <FieldError id={errorId}>{error}</FieldError>}
        {!error && typos.length > 0 && (
          <p className="mt-1.5 text-sm text-amber-800">
            {`${typos.map((k) => `{${k}}`).join(", ")} isn't a field and would be sent as typed.`}
          </p>
        )}
      </div>

      <div id={`fields-${n}`}>
        <p className="text-xs text-neutral-400 mb-2">
          Tap a field to insert it where your cursor is. Each is filled in per customer. Leave a blank
          line between paragraphs. The link, your signature and the unsubscribe line are added
          automatically.
        </p>
        <ul className="space-y-1.5">
          {MERGE_FIELDS.map((f) => (
            <li key={f.key} className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-neutral-400">
              <button
                type="button"
                onClick={() => insertField(f.key)}
                aria-label={`Insert ${f.key.replace("_", " ")}`}
                className="rounded-md border border-neutral-200 bg-neutral-50 px-2.5 py-1.5 font-mono text-xs text-primary hover:border-accent-orange hover:text-accent-orange transition-colors cursor-pointer"
              >
                {`{${f.key}}`}
              </button>
              {f.label}
            </li>
          ))}
        </ul>
      </div>

      {customized && (
        <button
          type="button"
          onClick={() => onChange(DEFAULT_TEMPLATES[n])}
          className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-primary transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" /> Reset to the original wording
        </button>
      )}

      <div className="rounded-xl border border-neutral-200 overflow-hidden">
        <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-3 text-sm space-y-0.5">
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-300 mb-1">
            Preview &mdash; a sample customer, Jane, whose deck was finished a few days ago
          </p>
          <p className="text-neutral-500">
            <span className="text-neutral-300">From</span> {COMPANY.owner}
          </p>
          <p className="font-semibold text-primary break-words">{preview.subject || "(no subject)"}</p>
        </div>
        {/* renderReviewEmail escapes every piece of edited text, so this is safe to inject. */}
        <div className="px-4 py-5 overflow-x-auto" dangerouslySetInnerHTML={{ __html: preview.html }} />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end gap-3">
        <div className="flex-1">
          <label htmlFor={`test-to-${n}`} className="block text-sm font-medium text-primary font-heading mb-1.5">
            Send this email to yourself
          </label>
          <input
            id={`test-to-${n}`}
            type="email"
            value={testTo}
            onChange={(e) => {
              setTestTo(e.target.value);
              setTest({ status: "idle" });
            }}
            placeholder="you@example.com"
            className={fieldClass}
          />
        </div>
        <button
          type="button"
          onClick={onSendTest}
          disabled={test.status === "sending" || !testTo.trim()}
          className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-primary px-5 py-3 font-heading font-semibold text-primary hover:bg-primary hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <Send className="w-4 h-4" aria-hidden="true" />
          {test.status === "sending" ? "Sending…" : "Send test"}
        </button>
      </div>
      <p className="text-xs text-neutral-400 -mt-2" aria-live="polite">
        {test.status === "sent" && <span className="text-green-700">Sent to {test.to}. Check your inbox.</span>}
        {test.status === "error" && <span className="text-accent-red">{test.message}</span>}
        {(test.status === "idle" || test.status === "sending") &&
          "Sends what's typed above, even before you save, with “[Test]” in the subject."}
      </p>
    </div>
  );
}
