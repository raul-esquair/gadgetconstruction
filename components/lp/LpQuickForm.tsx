"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle, Phone, Plus, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import { COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface LpQuickFormProps {
  service: string;
  ctaText?: string;
  trustText?: string;
  onSuccess?: () => void;
  className?: string;
}

export default function LpQuickForm({
  service,
  ctaText = "Get My Free Quote",
  trustText = "100% free. No obligation. We respond in minutes.",
  onSuccess,
  className,
}: LpQuickFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [showMessage, setShowMessage] = useState(false);

  function updateField(field: "name" | "phone" | "email" | "message", value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name";
    if (!formData.phone.trim()) newErrors.phone = "Please enter your phone number";
    const emailTrimmed = formData.email.trim();
    if (emailTrimmed && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      newErrors.email = "Please enter a valid email";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const referrerPath = typeof window !== "undefined" ? window.location.pathname + window.location.hash : "";
    const userMessage = formData.message.trim();
    const combinedMessage = [
      userMessage,
      referrerPath ? `Landing page: ${referrerPath}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service,
          timeline: "",
          scope: "",
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          message: combinedMessage,
        }),
      });
    } catch {
      // fall through to success for UX
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
    onSuccess?.();
  }

  if (isSubmitted) {
    return (
      <div className={cn("text-center py-6", className)}>
        <CheckCircle size={52} className="text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold font-heading text-primary mb-2">
          We Got Your Request
        </h3>
        <p className="text-sm text-secondary mb-5">
          We&apos;ll call you within minutes — not hours.
        </p>
        <a
          href={COMPANY.phoneHref}
          className="inline-flex items-center justify-center gap-2 text-accent-orange font-heading font-semibold hover:underline"
        >
          <Phone size={16} />
          Or call us now: {COMPANY.phone}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-3", className)} noValidate>
      <div>
        <label className="sr-only" htmlFor="lp-name">Your name</label>
        <input
          id="lp-name"
          type="text"
          placeholder="Your name"
          autoComplete="name"
          value={formData.name}
          onChange={(e) => updateField("name", e.target.value)}
          className={cn(
            "w-full rounded-lg border bg-white px-4 py-3.5 text-base text-primary placeholder:text-neutral-300 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-accent-orange",
            errors.name ? "border-accent-red" : "border-neutral-200"
          )}
        />
        {errors.name && <p className="text-xs text-accent-red mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="sr-only" htmlFor="lp-phone">Phone number</label>
        <input
          id="lp-phone"
          type="tel"
          placeholder="Phone number"
          autoComplete="tel"
          inputMode="tel"
          value={formData.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          className={cn(
            "w-full rounded-lg border bg-white px-4 py-3.5 text-base text-primary placeholder:text-neutral-300 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-accent-orange",
            errors.phone ? "border-accent-red" : "border-neutral-200"
          )}
        />
        {errors.phone && <p className="text-xs text-accent-red mt-1">{errors.phone}</p>}
      </div>

      <div>
        <label className="sr-only" htmlFor="lp-email">Email (optional)</label>
        <input
          id="lp-email"
          type="email"
          placeholder="Email (optional)"
          autoComplete="email"
          inputMode="email"
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
          className={cn(
            "w-full rounded-lg border bg-white px-4 py-3.5 text-base text-primary placeholder:text-neutral-300 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-accent-orange",
            errors.email ? "border-accent-red" : "border-neutral-200"
          )}
        />
        {errors.email && <p className="text-xs text-accent-red mt-1">{errors.email}</p>}
      </div>

      {showMessage ? (
        <div>
          <label className="sr-only" htmlFor="lp-message">Project details (optional)</label>
          <textarea
            id="lp-message"
            placeholder="Tell us about your project (optional)"
            rows={3}
            value={formData.message}
            onChange={(e) => updateField("message", e.target.value)}
            autoFocus
            className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-base text-primary placeholder:text-neutral-300 resize-y transition-colors focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-accent-orange"
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowMessage(true)}
          className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-accent-orange transition-colors font-medium cursor-pointer"
        >
          <Plus size={14} />
          Add project details (optional)
        </button>
      )}

      <Button type="submit" fullWidth size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : ctaText}
      </Button>

      <div className="flex items-center justify-center gap-1.5 text-xs text-neutral-400 pt-1">
        <ShieldCheck size={12} />
        <span>{trustText}</span>
      </div>
    </form>
  );
}
