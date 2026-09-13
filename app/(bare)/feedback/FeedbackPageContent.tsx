"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import BareLogo from "@/components/ui/BareLogo";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import { submitFeedback } from "@/lib/actions/submit-feedback";
import { recordFeedbackResponse, getFeedbackPrefill } from "@/lib/actions/feedback-response";
import { cn } from "@/lib/utils";

type Mode = "pick" | "review" | "form" | "done";
type FaceVariant = "sad" | "meh" | "happy" | "delighted";

interface FormValues {
  name: string;
  phone: string;
  email: string;
  details: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

// ⚠️ Colors, features and MOUTHS are duplicated as SVG data URIs in
// ./opengraph-image.tsx — change one, change both.
const OPTIONS: { rating: number; label: string; color: string; face: FaceVariant }[] = [
  { rating: 1, label: "Not happy", color: "#EF4444", face: "sad" },
  { rating: 2, label: "Could be better", color: "#FACC15", face: "meh" },
  { rating: 3, label: "Happy", color: "#4ADE80", face: "happy" },
  // Dark, but no darker: the features stay #1F2937, and they need contrast.
  { rating: 4, label: "Delighted", color: "#16A34A", face: "delighted" },
];

/** Eyes and mouth. Dark on every fill — including yellow, where white would vanish. */
const FEATURES = "#1F2937";

const MOUTHS: Record<FaceVariant, string> = {
  sad: "M15 34 Q24 25 33 34",
  meh: "M15 31.5 Q24 27.5 33 31.5",
  happy: "M15 28 Q24 34 33 28",
  delighted: "M14 27 Q24 38 34 27",
};

/**
 * Flat filled face. Hand-drawn rather than emoji, which render differently on
 * every device. The faint ring keeps the yellow face's edge from dissolving
 * into a white card.
 */
function Face({ variant, color, className }: { variant: FaceVariant; color: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke={FEATURES}
      strokeWidth={2.6}
      strokeLinecap="round"
      className={cn("w-16 h-16 md:w-[72px] md:h-[72px]", className)}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="22" fill={color} stroke="rgba(0,0,0,0.08)" strokeWidth={1} />
      {variant === "delighted" ? (
        <>
          <path d="M14 20 Q17.5 16.5 21 20" />
          <path d="M27 20 Q30.5 16.5 34 20" />
        </>
      ) : (
        <>
          <circle cx="17.5" cy="19.5" r="2.4" fill={FEATURES} stroke="none" />
          <circle cx="30.5" cy="19.5" r="2.4" fill={FEATURES} stroke="none" />
        </>
      )}
      <path d={MOUTHS[variant]} />
    </svg>
  );
}

/**
 * How long a happy customer waits for the kill switch before being sent to
 * Google anyway. The write normally takes a few hundred ms; this only caps a
 * slow or cold database.
 */
const KILL_SWITCH_WAIT_MS = 1500;

/** Each screen enters from below; the global reduced-motion rule removes it. */
const ENTER = "animate-[fade-in-up_400ms_cubic-bezier(0.16,1,0.3,1)_both]";
const EMPTY: FormValues = { name: "", phone: "", email: "", details: "" };

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Please tell us your name";
  if (!values.details.trim()) errors.details = "Please tell us what happened";
  else if (values.details.trim().length < 10) errors.details = "A little more detail helps us fix it";
  if (!values.phone.trim() && !values.email.trim()) {
    errors.phone = "Add a phone or an email so we can reach you";
  }
  return errors;
}

export default function FeedbackPageContent() {
  const [mode, setMode] = useState<Mode>("pick");
  const [rating, setRating] = useState<number | null>(null);
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  // True while a happy customer is being sent on to Google.
  const [redirecting, setRedirecting] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const hasChangedMode = useRef(false);

  /**
   * Present when the customer arrived from a tracked review-request email.
   * Read client-side so the page itself stays static.
   */
  const token = useSearchParams().get("t");

  // Prefill name and email when we already know who this is — fewer fields to
  // retype on a phone means more completed forms. Non-blocking: the form isn't
  // shown until a face is picked, and a failed lookup costs nothing. Fields
  // the customer has already typed into are left alone.
  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    getFeedbackPrefill(token).then((prefill) => {
      if (cancelled || !prefill) return;
      setValues((v) => ({ ...v, name: v.name || prefill.name, email: v.email || prefill.email }));
    });
    return () => {
      cancelled = true;
    };
  }, [token]);

  // Coming back from Google with the Back button can restore this page from
  // the back/forward cache mid-"Taking you to Google…". Show the button again.
  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) setRedirecting(false);
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  // Each screen replaces the last in place, so move focus to its heading —
  // otherwise a screen reader is left on a button that no longer exists.
  useEffect(() => {
    if (!hasChangedMode.current) return;
    headingRef.current?.focus();
  }, [mode]);

  const go = (next: Mode) => {
    hasChangedMode.current = true;
    setMode(next);
  };

  const choose = (value: number) => {
    setRating(value);
    // ⚠️ REVIEW GATING — a business decision, not an oversight. Only the two
    // positive faces are sent to Google; the negative ones go straight to a
    // private form. That breaks Google's review policy and falls under the
    // FTC consumer-reviews rule (16 CFR 465), and enforcement would land on
    // the Business Profile. Chosen deliberately (2026-09-12), matching the
    // Lamorinda Pavers site. The compliant flow: send every face to the
    // review screen, which offers both Google and the private channel — i.e.
    // `go("review")` here, with the 1–2 faces NOT auto-redirected (see
    // sendToGoogle). Don't change it in either direction without asking.
    if (value >= 3) {
      go("review");
      void sendToGoogle(value);
      return;
    }
    go("form");

    // Fire and forget. Deliberately not awaited — the customer's next screen
    // must never wait on a database write, and the action swallows its own
    // errors. Worst case they receive one more email than they should.
    if (token) void recordFeedbackResponse(token, value);
  };

  /**
   * Happy and Delighted go straight to the Google review box — no second
   * screen to tap through (Raul, 2026-09-13). Every extra tap loses reviews.
   *
   * Same tab, not a new one: a tab opened after an await is no longer a direct
   * response to the tap, and phone browsers block it as a popup. And the kill
   * switch is awaited first (up to KILL_SWITCH_WAIT_MS), because leaving the
   * page can cancel an in-flight request — the customer would then get the
   * rest of the emails after already reviewing. The review screen renders
   * underneath as the fallback, with its button, if the redirect is blocked
   * or they come back.
   */
  const sendToGoogle = async (value: number) => {
    setRedirecting(true);
    if (token) {
      await Promise.race([
        recordFeedbackResponse(token, value),
        new Promise((resolve) => setTimeout(resolve, KILL_SWITCH_WAIT_MS)),
      ]);
    }
    window.location.assign(COMPANY.googleReviewUrl);
  };

  const restart = () => {
    setRating(null);
    setSubmitError(null);
    setErrors({});
    go("pick");
  };

  const update =
    (field: keyof FormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === null) return;

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);
    const result = await submitFeedback({ ...values, rating, token });
    setSubmitting(false);
    if (result.ok) go("done");
    else setSubmitError(result.error);
  };

  const headingProps = { ref: headingRef, tabIndex: -1 };

  return (
    <section className="min-h-dvh flex flex-col items-center justify-center py-14 md:py-20">
      <div className="w-full max-w-2xl mx-auto px-5 sm:px-6">
        <BareLogo className="mb-12 md:mb-14" />

        {mode === "pick" && (
          <div key="pick" className={cn("text-center", ENTER)}>
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.18em] text-accent-orange">
              Your Project
            </p>
            <h1 {...headingProps} className="text-4xl md:text-5xl font-heading font-extrabold mt-3 mb-4 outline-none">
              How did we do?
            </h1>
            <p className="text-lg text-neutral-400 max-w-lg mx-auto mb-10 md:mb-12">
              {COMPANY.ownerFirstName} reads every one of these personally. It takes about thirty
              seconds.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {OPTIONS.map((option, index) => (
                <button
                  key={option.rating}
                  type="button"
                  onClick={() => choose(option.rating)}
                  className={cn(
                    "group flex flex-col items-center gap-3 rounded-2xl bg-white border border-neutral-200 px-4 py-7 cursor-pointer",
                    "transition-[transform,box-shadow,border-color] duration-200 ease-out",
                    "hover:-translate-y-1.5 hover:border-[var(--face)] hover:shadow-lg active:scale-[0.96]",
                    "motion-reduce:hover:translate-y-0",
                    "focus:outline-none focus-visible:border-[var(--face)] focus-visible:ring-2 focus-visible:ring-[var(--face)]/40",
                    ENTER,
                  )}
                  style={{ ["--face" as string]: option.color, animationDelay: `${80 + index * 60}ms` }}
                >
                  <Face
                    variant={option.face}
                    color={option.color}
                    className="transition-transform duration-200 ease-out group-hover:scale-110 motion-reduce:group-hover:scale-100"
                  />
                  <span className="text-sm font-medium text-neutral-500 transition-colors duration-200 group-hover:text-primary">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {mode === "review" && (
          <div key="review" className={cn("text-center", ENTER)}>
            <span className="inline-flex mb-6">
              <Face
                variant={rating === 4 ? "delighted" : "happy"}
                color={OPTIONS.find((o) => o.rating === rating)?.color ?? OPTIONS[3].color}
                className="w-16 h-16 md:w-20 md:h-20"
              />
            </span>
            <h1 {...headingProps} className="text-4xl md:text-5xl font-heading font-extrabold mb-4 outline-none">
              That means a lot.
            </h1>
            <p className="text-lg text-neutral-400 max-w-lg mx-auto mb-9" aria-live="polite">
              {redirecting ? (
                <>
                  <Loader2
                    className="inline-block w-5 h-5 mr-2 -mt-0.5 animate-spin motion-reduce:hidden"
                    aria-hidden="true"
                  />
                  Taking you to Google so you can leave a review&hellip;
                </>
              ) : (
                <>
                  Would you take a minute to say it on Google? It&apos;s how the next Bay Area
                  homeowner decides who to trust with their house.
                </>
              )}
            </p>

            <Button href={COMPANY.googleReviewUrl} variant="secondary" size="lg" className="w-full sm:w-auto">
              Leave a Google Review
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Button>

            <p className="mx-auto mt-6 max-w-md text-sm text-neutral-400">
              If you can mention what we built and which city it&apos;s in &mdash; and add a photo
              &mdash; it helps the next homeowner find us.
            </p>

            <div className="mt-10 pt-8 border-t border-neutral-200">
              <p className="text-sm text-neutral-400">
                Something we could have done better?{" "}
                <button
                  type="button"
                  onClick={() => go("form")}
                  className="text-accent-orange font-medium hover:underline cursor-pointer"
                >
                  We&apos;d love your feedback.
                </button>
              </p>
            </div>
          </div>
        )}

        {mode === "form" && (
          <div key="form" className={ENTER}>
            <div className="text-center">
              <h1 {...headingProps} className="text-3xl md:text-4xl font-heading font-extrabold mb-4 outline-none">
                Tell us what went wrong.
              </h1>
              <p className="text-lg text-neutral-400 mb-9">
                Your feedback helps {COMPANY.shortName} improve the experience for every customer
                and do our best work.
              </p>
            </div>

            <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-2xl bg-white border border-neutral-200 p-5 sm:p-7">
              <FormField
                type="text"
                name="name"
                label="Your Name"
                required
                placeholder="Your name"
                autoComplete="name"
                value={values.name}
                onChange={update("name")}
                error={errors.name}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField
                  type="tel"
                  name="phone"
                  label="Phone"
                  placeholder="(415) 555-0000"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={update("phone")}
                  error={errors.phone}
                />
                <FormField
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="you@email.com"
                  autoComplete="email"
                  value={values.email}
                  onChange={update("email")}
                />
              </div>
              {!errors.phone && (
                <p className="text-xs text-neutral-300 -mt-3">
                  Add at least one so we can reach you.
                </p>
              )}

              <FormField
                type="textarea"
                name="details"
                label="What happened?"
                required
                rows={6}
                placeholder="Tell us as much as you'd like — what you expected, what actually happened, and what would make it right."
                value={values.details}
                onChange={update("details")}
                error={errors.details}
              />

              {submitError && (
                <p className="text-sm text-accent-red" role="alert">
                  {submitError}
                </p>
              )}

              <div className="flex items-center justify-between gap-4 pt-1">
                <Button onClick={restart} variant="ghost" disabled={submitting}>
                  Back
                </Button>
                <Button type="submit" variant="secondary" disabled={submitting}>
                  {submitting ? "Sending…" : "Submit"}
                </Button>
              </div>
            </form>
          </div>
        )}

        {mode === "done" && (
          <div key="done" className={cn("text-center", ENTER)}>
            <div className="w-20 h-20 rounded-full bg-accent-orange/10 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-accent-orange" strokeWidth={2.5} aria-hidden="true" />
            </div>
            <h1 {...headingProps} className="text-4xl md:text-5xl font-heading font-extrabold mb-4 outline-none">
              Thank you &mdash; we got it.
            </h1>
            <p className="text-lg text-neutral-400 mb-8">
              We&apos;ll use it to make things right, and to do better for the next homeowner. If
              you&apos;d rather talk now, call{" "}
              <a href={COMPANY.phoneHref} className="text-accent-orange font-semibold whitespace-nowrap">
                {COMPANY.phone}
              </a>
              .
            </p>
          </div>
        )}

        <p className="mt-14 md:mt-16 text-center text-xs text-neutral-300">
          {COMPANY.name} &middot; CA Lic. #{COMPANY.license} &middot;{" "}
          <a href={COMPANY.phoneHref} className="hover:text-accent-orange transition-colors whitespace-nowrap">
            {COMPANY.phone}
          </a>
        </p>
      </div>
    </section>
  );
}
