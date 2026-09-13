"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import { addReviewRequest } from "@/lib/actions/review-requests";
import { SERVICES } from "@/lib/constants";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  completedAt: string;
  notes: string;
}

const SERVICE_OPTIONS = SERVICES.map((s) => ({ value: s.slug, label: s.name }));

export default function AddRequestForm({ today }: { today: string }) {
  const empty: FormValues = { name: "", email: "", phone: "", projectType: "", completedAt: today, notes: "" };
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<FormValues>(empty);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Set when the error is a repeat-customer warning the owner may override.
  const [canOverride, setCanOverride] = useState(false);
  const [saved, setSaved] = useState<string | null>(null);

  const update =
    (field: keyof FormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setValues((v) => ({ ...v, [field]: e.target.value }));
      // A warning about one email address doesn't apply to another.
      if (field === "email") setCanOverride(false);
    };

  async function submit(allowRepeat: boolean) {
    setSubmitting(true);
    setError(null);
    setCanOverride(false);
    setSaved(null);

    const result = await addReviewRequest(
      {
        name: values.name,
        email: values.email,
        phone: values.phone || null,
        projectType: values.projectType || null,
        completedAt: values.completedAt || null,
        notes: values.notes || null,
      },
      { allowRepeat },
    );

    setSubmitting(false);

    if (result.ok) {
      setSaved(`${values.name.trim()} added.`);
      setValues(empty);
      return;
    }
    setError(result.error);
    setCanOverride(!!result.canOverride);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    submit(false);
  }

  if (!open) {
    return (
      <div className="flex items-center gap-4">
        <Button onClick={() => setOpen(true)} variant="secondary">
          <Plus className="w-4 h-4" aria-hidden="true" /> Add customer
        </Button>
        {saved && <p className="text-sm text-neutral-400">{saved}</p>}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-heading font-bold">Add customer</h2>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setError(null);
          }}
          className="text-sm text-neutral-400 hover:text-primary transition-colors cursor-pointer"
        >
          Close
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField type="text" name="ar-name" label="Name" required placeholder="Jane Doe" value={values.name} onChange={update("name")} />
          <FormField type="email" name="ar-email" label="Email" required placeholder="jane@example.com" value={values.email} onChange={update("email")} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormField type="tel" name="ar-phone" label="Phone" placeholder="(415) 555-0000" value={values.phone} onChange={update("phone")} />
          <FormField type="select" name="ar-project" label="Project" options={SERVICE_OPTIONS} value={values.projectType} onChange={update("projectType")} />
          <FormField type="date" name="ar-completed" label="Job completed" value={values.completedAt} onChange={update("completedAt")} />
        </div>

        <FormField type="text" name="ar-notes" label="Notes (internal only)" placeholder="Anything worth remembering" value={values.notes} onChange={update("notes")} />

        <p className="text-xs text-neutral-300">
          Finished today? The first email goes out at the next 10am send. Otherwise it&apos;s two days
          after completion &mdash; or tomorrow, for jobs more than two weeks old. At most 8 go out a
          day, so a batch of past customers spreads itself out.
        </p>

        {error && (
          <div role="alert" className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className={canOverride ? "text-sm text-amber-800" : "text-sm text-accent-red"}>{error}</p>
            {canOverride && (
              <button
                type="button"
                onClick={() => submit(true)}
                disabled={submitting}
                className="text-sm font-semibold text-primary underline underline-offset-2 hover:text-accent-orange disabled:opacity-50 cursor-pointer"
              >
                Add anyway
              </button>
            )}
          </div>
        )}

        <div className="flex items-center gap-3 pt-1">
          <Button type="submit" variant="secondary" disabled={submitting}>
            {submitting ? "Saving…" : "Add customer"}
          </Button>
          {saved && <p className="text-sm text-neutral-400">{saved}</p>}
        </div>
      </form>
    </div>
  );
}
