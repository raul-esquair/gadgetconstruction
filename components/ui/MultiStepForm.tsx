"use client";

import { useState } from "react";
import {
  CheckCircle,
  Landmark,
  Layers,
  Hammer,
  Fence,
  Home,
  Building2,
  ArrowRight,
  ArrowLeft,
  Phone,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SERVICE_OPTIONS = [
  { value: "concrete-foundations", label: "Concrete Foundations & Slabs", icon: Landmark },
  { value: "retaining-walls", label: "Retaining Walls", icon: Layers },
  { value: "complete-remodel", label: "Complete Remodel", icon: Hammer },
  { value: "composite-decks", label: "Composite Decks", icon: Fence },
  { value: "roofing", label: "Roofing", icon: Home },
  { value: "adu-construction", label: "ADU Construction", icon: Building2 },
];

const TIMELINE_OPTIONS = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-3-months", label: "Within 1–3 months" },
  { value: "3-6-months", label: "3–6 months" },
  { value: "planning", label: "Just planning & researching" },
];

const SCOPE_OPTIONS = [
  { value: "small", label: "Small project (under $25K)" },
  { value: "medium", label: "Mid-size project ($25K–$75K)" },
  { value: "large", label: "Large project ($75K–$200K)" },
  { value: "major", label: "Major project ($200K+)" },
  { value: "unsure", label: "Not sure yet" },
];

interface MultiStepFormProps {
  variant?: "light" | "dark";
  onSuccess?: () => void;
  className?: string;
}

export default function MultiStepForm({
  variant = "light",
  onSuccess,
  className,
}: MultiStepFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [formData, setFormData] = useState({
    service: "",
    timeline: "",
    scope: "",
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  function updateField(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function validateStep(): boolean {
    const newErrors: Record<string, string> = {};

    if (step === 1 && !formData.service) {
      newErrors.service = "Please select a service";
    }
    if (step === 3) {
      if (!formData.name.trim()) newErrors.name = "Please enter your name";
      if (!formData.phone.trim()) newErrors.phone = "Please enter your phone number";
      if (!formData.email.trim()) {
        newErrors.email = "Please enter your email";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function nextStep() {
    if (validateStep()) {
      setDirection("forward");
      setIsTransitioning(true);
      setTimeout(() => {
        setStep((s) => Math.min(s + 1, 3));
        setIsTransitioning(false);
      }, 150);
    }
  }

  function prevStep() {
    setDirection("back");
    setIsTransitioning(true);
    setTimeout(() => {
      setStep((s) => Math.max(s - 1, 1));
      setIsTransitioning(false);
    }, 150);
  }

  async function handleSubmit() {
    if (!validateStep()) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch {
      // Show success regardless for UX
    }
    setIsSubmitting(false);
    setIsSubmitted(true);
    onSuccess?.();
  }

  const isDark = variant === "dark";

  if (isSubmitted) {
    return (
      <div className={cn("text-center py-10", className)}>
        <CheckCircle size={52} className="text-green-500 mx-auto mb-4" />
        <h3 className={cn("text-xl font-bold font-heading mb-2", isDark ? "text-white" : "text-primary")}>
          We Got Your Request
        </h3>
        <p className={cn("mb-4", isDark ? "text-white/70" : "text-secondary")}>
          We&apos;ll get back to you within minutes — not hours. Talk soon.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
          <a
            href={COMPANY.phoneHref}
            className="inline-flex items-center justify-center gap-2 text-accent-orange font-heading font-semibold hover:underline"
          >
            <Phone size={16} />
            Call us now: {COMPANY.phone}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Progress Bar */}
      <div className="flex items-center gap-2 mb-6">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex-1 flex items-center gap-2">
            <div
              className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-heading shrink-0 transition-colors",
                s <= step
                  ? "bg-accent-orange text-white"
                  : isDark
                  ? "bg-white/10 text-white/40"
                  : "bg-neutral-200 text-neutral-400"
              )}
            >
              {s < step ? <CheckCircle size={14} /> : s}
            </div>
            {s < 3 && (
              <div
                className={cn(
                  "flex-1 h-1 rounded-full transition-colors",
                  s < step
                    ? "bg-accent-orange"
                    : isDark
                    ? "bg-white/10"
                    : "bg-neutral-200"
                )}
              />
            )}
          </div>
        ))}
      </div>
      <p className={cn("text-xs mb-5 font-medium", isDark ? "text-white/50" : "text-neutral-400")}>
        Step {step} of 3 — {step === 1 ? "Select your service" : step === 2 ? "Tell us about your project" : "Your contact info"} — Takes under 30 seconds
      </p>

      {/* Step content with transition */}
      <div
        className={cn(
          "transition-all duration-200",
          isTransitioning
            ? direction === "forward"
              ? "opacity-0 translate-x-4"
              : "opacity-0 -translate-x-4"
            : "opacity-100 translate-x-0"
        )}
      >
      {/* Step 1: Service Selection */}
      {step === 1 && (
        <div className="space-y-3">
          <p className={cn("font-heading font-semibold text-sm mb-3", isDark ? "text-white" : "text-primary")}>
            What type of project are you planning?
          </p>
          <div className="grid grid-cols-2 gap-2">
            {SERVICE_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const selected = formData.service === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateField("service", opt.value)}
                  className={cn(
                    "flex items-center gap-2.5 p-3 rounded-lg border text-left text-sm font-medium transition-all cursor-pointer",
                    selected
                      ? "border-accent-orange bg-accent-orange/10 text-accent-orange"
                      : isDark
                      ? "border-white/10 text-white/70 hover:border-white/30"
                      : "border-neutral-200 text-secondary hover:border-neutral-300"
                  )}
                >
                  <Icon size={18} className={selected ? "text-accent-orange" : ""} />
                  <span className="leading-tight">{opt.label}</span>
                </button>
              );
            })}
          </div>
          {errors.service && (
            <p className="text-sm text-accent-red">{errors.service}</p>
          )}
          <Button type="button" fullWidth onClick={nextStep} className="mt-4">
            Continue <ArrowRight size={16} />
          </Button>
        </div>
      )}

      {/* Step 2: Project Scope */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <p className={cn("font-heading font-semibold text-sm mb-2.5", isDark ? "text-white" : "text-primary")}>
              What&apos;s your timeline?
            </p>
            <div className="grid grid-cols-2 gap-2">
              {TIMELINE_OPTIONS.map((opt) => {
                const selected = formData.timeline === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => updateField("timeline", opt.value)}
                    className={cn(
                      "p-2.5 rounded-lg border text-sm font-medium transition-all cursor-pointer text-center",
                      selected
                        ? "border-accent-orange bg-accent-orange/10 text-accent-orange"
                        : isDark
                        ? "border-white/10 text-white/70 hover:border-white/30"
                        : "border-neutral-200 text-secondary hover:border-neutral-300"
                    )}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className={cn("font-heading font-semibold text-sm mb-2.5", isDark ? "text-white" : "text-primary")}>
              Estimated budget range?
            </p>
            <div className="grid grid-cols-1 gap-2">
              {SCOPE_OPTIONS.map((opt) => {
                const selected = formData.scope === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => updateField("scope", opt.value)}
                    className={cn(
                      "p-2.5 rounded-lg border text-sm font-medium transition-all cursor-pointer text-left",
                      selected
                        ? "border-accent-orange bg-accent-orange/10 text-accent-orange"
                        : isDark
                        ? "border-white/10 text-white/70 hover:border-white/30"
                        : "border-neutral-200 text-secondary hover:border-neutral-300"
                    )}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={prevStep}
              className={cn(
                "flex items-center gap-1 px-4 py-3 rounded-lg text-sm font-semibold font-heading transition-colors cursor-pointer",
                isDark ? "text-white/70 hover:text-white" : "text-secondary hover:text-primary"
              )}
            >
              <ArrowLeft size={14} /> Back
            </button>
            <Button type="button" fullWidth onClick={nextStep}>
              Almost Done <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Contact Info */}
      {step === 3 && (
        <div className="space-y-3.5">
          <p className={cn("font-heading font-semibold text-sm mb-1", isDark ? "text-white" : "text-primary")}>
            Where should we send your free estimate?
          </p>
          <div>
            <input
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              className={cn(
                "w-full rounded-lg border px-4 py-3 text-sm transition-colors focus:border-accent-orange focus:ring-1 focus:ring-accent-orange focus:outline-none",
                isDark
                  ? "bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  : "bg-white border-neutral-200 text-primary placeholder:text-neutral-300"
              )}
            />
            {errors.name && <p className="text-xs text-accent-red mt-1">{errors.name}</p>}
          </div>
          <div>
            <input
              type="tel"
              placeholder="Phone number"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className={cn(
                "w-full rounded-lg border px-4 py-3 text-sm transition-colors focus:border-accent-orange focus:ring-1 focus:ring-accent-orange focus:outline-none",
                isDark
                  ? "bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  : "bg-white border-neutral-200 text-primary placeholder:text-neutral-300"
              )}
            />
            {errors.phone && <p className="text-xs text-accent-red mt-1">{errors.phone}</p>}
          </div>
          <div>
            <input
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              className={cn(
                "w-full rounded-lg border px-4 py-3 text-sm transition-colors focus:border-accent-orange focus:ring-1 focus:ring-accent-orange focus:outline-none",
                isDark
                  ? "bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  : "bg-white border-neutral-200 text-primary placeholder:text-neutral-300"
              )}
            />
            {errors.email && <p className="text-xs text-accent-red mt-1">{errors.email}</p>}
          </div>
          <textarea
            placeholder="Anything else we should know? (optional)"
            value={formData.message}
            onChange={(e) => updateField("message", e.target.value)}
            rows={2}
            className={cn(
              "w-full rounded-lg border px-4 py-3 text-sm transition-colors focus:border-accent-orange focus:ring-1 focus:ring-accent-orange focus:outline-none resize-y",
              isDark
                ? "bg-white/5 border-white/10 text-white placeholder:text-white/30"
                : "bg-white border-neutral-200 text-primary placeholder:text-neutral-300"
            )}
          />

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={prevStep}
              className={cn(
                "flex items-center gap-1 px-4 py-3 rounded-lg text-sm font-semibold font-heading transition-colors cursor-pointer",
                isDark ? "text-white/70 hover:text-white" : "text-secondary hover:text-primary"
              )}
            >
              <ArrowLeft size={14} /> Back
            </button>
            <Button
              type="button"
              fullWidth
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Get My Free Estimate"}
            </Button>
          </div>
          <p className={cn("text-center text-xs", isDark ? "text-white/40" : "text-neutral-400")}>
            No obligation. 100% free. We respond in minutes.
          </p>
        </div>
      )}
      </div>
    </div>
  );
}
