"use client";

import { cn } from "@/lib/utils";

/** Same field look as components/ui/FormField, for inputs FormField can't express. */
export const fieldClass =
  "w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-base text-primary placeholder:text-neutral-300 transition-colors focus:border-accent-orange focus:ring-1 focus:ring-accent-orange focus:outline-none";

export const errorFieldClass = "border-accent-red focus:border-accent-red focus:ring-accent-red";

/**
 * A settings row: what it is on the left at lg+, the controls on the right.
 * Stacks below lg.
 */
export function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[17rem_1fr] gap-4 lg:gap-10">
      <div>
        <h2 className="text-lg font-heading font-bold">{title}</h2>
        <div className="mt-1 text-sm text-neutral-400 space-y-2">{description}</div>
      </div>
      <div className="min-w-0 rounded-xl border border-neutral-200 bg-white p-5 sm:p-6">{children}</div>
    </section>
  );
}

export function Switch({
  checked,
  onChange,
  disabled,
  label,
  id,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
  /** Accessible name when there's no visible <label htmlFor>. */
  label?: string;
  id?: string;
}) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-orange disabled:cursor-not-allowed disabled:opacity-50",
        checked ? "bg-green-600" : "bg-neutral-300",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "inline-block h-5 w-5 rounded-full bg-white shadow transition-transform duration-200",
          checked ? "translate-x-6" : "translate-x-1",
        )}
      />
    </button>
  );
}

export function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-1.5 text-sm text-accent-red" role="alert">
      {children}
    </p>
  );
}
