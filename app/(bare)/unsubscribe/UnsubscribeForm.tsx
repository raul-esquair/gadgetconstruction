"use client";

import { useState } from "react";
import { COMPANY } from "@/lib/constants";
import Button from "@/components/ui/Button";
import { confirmUnsubscribe } from "@/lib/actions/unsubscribe";

export default function UnsubscribeForm({ token, email }: { token: string; email: string | null }) {
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (done) {
    return (
      <div>
        <h1 className="text-3xl font-heading font-extrabold mb-3">You&apos;re unsubscribed.</h1>
        <p className="text-neutral-400">
          We won&apos;t email you again. If you ever need us, you can still reach{" "}
          {COMPANY.ownerFirstName} at{" "}
          <a href={COMPANY.phoneHref} className="text-accent-orange font-semibold whitespace-nowrap">
            {COMPANY.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  if (!token || !email) {
    return (
      <div>
        <h1 className="text-3xl font-heading font-extrabold mb-3">Link not recognized</h1>
        <p className="text-neutral-400">
          This unsubscribe link is missing or no longer valid. Reply to any of our emails and
          we&apos;ll take you off the list by hand.
        </p>
      </div>
    );
  }

  async function onConfirm() {
    setSubmitting(true);
    setError(null);
    const result = await confirmUnsubscribe(token);
    setSubmitting(false);
    if (result.ok) setDone(true);
    else setError(result.error);
  }

  return (
    <div>
      <h1 className="text-3xl font-heading font-extrabold mb-3">Unsubscribe?</h1>
      <p className="text-neutral-400 mb-8">
        We&apos;ll stop emailing <span className="text-primary font-medium">{email}</span> about
        how your project went.
      </p>

      {error && (
        <p className="mb-4 text-sm text-accent-red" role="alert">
          {error}
        </p>
      )}

      <Button onClick={onConfirm} variant="secondary" disabled={submitting}>
        {submitting ? "Updating…" : "Yes, unsubscribe me"}
      </Button>
    </div>
  );
}
