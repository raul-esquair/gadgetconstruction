"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle,
  Landmark,
  Layers,
  Hammer,
  Fence,
  HardHat,
  Wrench,
  ArrowRight,
  ArrowLeft,
  Phone,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { track } from "@/lib/track";

const SERVICE_OPTIONS = [
  { value: "exterior-repairs", label: "Exterior Repairs", icon: Wrench },
  { value: "retaining-walls", label: "Retaining Walls", icon: Layers },
  { value: "complete-remodel", label: "Complete Remodel", icon: Hammer },
  { value: "composite-decks", label: "Composite Decks", icon: Fence },
  { value: "structural-repairs", label: "Structural Repairs", icon: HardHat },
  { value: "concrete-foundations", label: "Concrete Foundations & Slabs", icon: Landmark },
];

type StepId = "service" | "project" | "contact";

const STEP_LABELS: Record<StepId, string> = {
  service: "Select your service",
  project: "Tell us about your project",
  contact: "Your contact info",
};

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
  /** Lead-attribution label, sent with the submission. */
  source?: string;
  /**
   * Service → contact, skipping timeline/budget. Picking a service advances
   * on its own, so the whole form is one tap plus the contact fields.
   */
  twoStep?: boolean;
}

export default function MultiStepForm({
  variant = "light",
  onSuccess,
  className,
  source = "Estimate form",
  twoStep = false,
}: MultiStepFormProps) {
  const steps: StepId[] = twoStep
    ? ["service", "contact"]
    : ["service", "project", "contact"];
  const [step, setStep] = useState(1);
  const current = steps[step - 1];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  // The step swaps on the same frame as the tap; `entering` only holds the
  // incoming panel at its offset for one frame so it can slide in from the
  // direction of travel. Nothing gates the step change itself.
  const [entering, setEntering] = useState(false);

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

    if (current === "service" && !formData.service) {
      newErrors.service = "Please select a service";
    }
    if (current === "contact") {
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

  function advance(service: string) {
    track("estimate_step", { step_completed: step, service, source });
    setDirection("forward");
    setStep((s) => Math.min(s + 1, steps.length));
    setEntering(true);
  }

  function nextStep() {
    if (!validateStep()) return;
    advance(formData.service);
  }

  function selectService(value: string) {
    updateField("service", value);
    if (twoStep) advance(value);
  }

  function prevStep() {
    setDirection("back");
    setStep((s) => Math.max(s - 1, 1));
    setEntering(true);
  }

  // Double rAF: let the browser paint the offset start state, then transition.
  useEffect(() => {
    if (!entering) return;
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setEntering(false));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [entering]);

  async function handleSubmit() {
    if (!validateStep()) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source, page: window.location.pathname }),
      });
    } catch {
      // Show success regardless for UX
    }
    track("generate_lead", { service: formData.service, source });
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

  const stepDot = (s: number) => (
    <div
      className={cn(
        "relative w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-heading shrink-0 transition-colors",
        s <= step
          ? "bg-accent-orange text-white"
          : isDark
          ? "bg-white/10 text-white/40"
          : "bg-neutral-200 text-neutral-400"
      )}
    >
      {s < step ? <CheckCircle size={14} /> : s}
    </div>
  );

  return (
    <div className={className}>
      {twoStep ? (
        <>
          {/* Compact, centred, and nudging forward: a glint runs toward
              step 2 and step 2 pings as it lands. Stops once step 2 is
              reached; the line fills from the left instead. */}
          <p className="sr-only" aria-live="polite">
            Step {step} of {steps.length}: {STEP_LABELS[current]}
          </p>
          <div className="flex items-center justify-center gap-2.5 mb-5" aria-hidden="true">
            {stepDot(1)}
            <div
              className={cn(
                "relative w-24 h-1 rounded-full overflow-hidden",
                isDark ? "bg-white/10" : "bg-neutral-200"
              )}
            >
              <span
                className={cn(
                  "absolute inset-0 origin-left bg-accent-orange transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                  step > 1 ? "scale-x-100" : "scale-x-0"
                )}
              />
              {step === 1 && (
                <span className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-transparent via-accent-orange to-transparent opacity-0 animate-[step-glint_3.2s_ease-in-out_infinite]" />
              )}
            </div>
            <div className="relative">
              {step === 1 && (
                <span className="absolute inset-0 rounded-full border-2 border-accent-orange opacity-0 animate-[step-ping_3.2s_ease-out_infinite]" />
              )}
              {stepDot(2)}
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center gap-2 mb-6">
          {steps.map((_, i) => i + 1).map((s) => (
            <div key={s} className="flex-1 flex items-center gap-2">
              {stepDot(s)}
              {s < steps.length && (
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
      )}
      {/* Two-step leaves the progress bar to say where you are — the form
          sits in the hero, where every line of height counts. */}
      {!twoStep && (
        <p className={cn("text-xs mb-5 font-medium", isDark ? "text-white/50" : "text-neutral-400")}>
          Step {step} of {steps.length} — {STEP_LABELS[current]} — Takes under 30 seconds
        </p>
      )}

      {/* Step content with transition */}
      <div
        className={cn(
          "transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform] motion-reduce:transition-opacity motion-reduce:duration-150",
          entering
            ? direction === "forward"
              ? "opacity-0 translate-x-4 motion-reduce:translate-x-0"
              : "opacity-0 -translate-x-4 motion-reduce:translate-x-0"
            : "opacity-100 translate-x-0"
        )}
      >
      {/* Service Selection */}
      {current === "service" && (
        <div className="space-y-3">
          <p className={cn("font-heading font-semibold text-sm mb-3", isDark ? "text-white" : "text-primary")}>
            What type of project are you planning?
          </p>
          <div className="grid grid-cols-2 gap-2">
            {SERVICE_OPTIONS.map((opt, idx) => {
              const Icon = opt.icon;
              const selected = formData.service === opt.value;
              const isLast = idx === SERVICE_OPTIONS.length - 1 && SERVICE_OPTIONS.length % 2 !== 0;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => selectService(opt.value)}
                  className={cn(
                    "flex items-center gap-2.5 p-3 rounded-lg border text-left text-sm font-medium transition-all cursor-pointer",
                    isLast && "col-span-2",
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
          {/* Two-step advances on tap; Continue only returns once the
              visitor has come Back with a service already chosen. */}
          {(!twoStep || formData.service) && (
            <Button type="button" fullWidth onClick={nextStep} className="mt-4">
              Continue <ArrowRight size={16} />
            </Button>
          )}
        </div>
      )}

      {/* Project Scope */}
      {current === "project" && (
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

      {/* Contact Info */}
      {current === "contact" && (
        <div className="space-y-3.5">
          <p className={cn("font-heading font-semibold text-sm mb-1", isDark ? "text-white" : "text-primary")}>
            Where should we send your free estimate?
          </p>
          {/* Two-step pairs name + phone from sm up — it lives in the hero,
              where the contact step's height is what the hero card grows to. */}
          <div className={cn(twoStep ? "grid sm:grid-cols-2 gap-3.5" : "space-y-3.5")}>
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
