"use client";

import { useRef, useState, useEffect } from "react";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionCTA from "@/components/sections/SectionCTA";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { PROCESS_STEPS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { ProcessStep } from "@/lib/types";

interface ProcessStepsProps {
  steps?: ProcessStep[];
  heading?: string;
  showCTA?: boolean;
}

function StepItem({ step, totalSteps }: { step: ProcessStep; totalSteps: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) { setIsVisible(true); return; }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(el); }
      },
      { threshold: 0.3, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <div ref={ref}>
      {/* Desktop */}
      <div
        className={cn(
          "relative text-center will-change-[opacity,transform] transition-all duration-600 hidden md:block",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
        style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        <div
          className={cn(
            "relative z-10 mx-auto w-16 h-16 rounded-full bg-accent-orange text-white flex items-center justify-center text-xl font-bold font-heading transition-all duration-700",
            isVisible
              ? "scale-100 shadow-[0_0_20px_rgba(204,0,0,0.3)]"
              : "scale-0 shadow-none"
          )}
          style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
        >
          {step.number}
        </div>
        <h3 className="mt-4 text-base font-bold font-heading text-primary">{step.title}</h3>
        <p className="mt-2 text-sm text-secondary leading-relaxed">{step.description}</p>
      </div>

      {/* Mobile */}
      <div
        className={cn(
          "flex gap-4 will-change-[opacity,transform] transition-all duration-600 md:hidden",
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
        )}
        style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        <div className="relative flex flex-col items-center">
          <div
            className={cn(
              "w-11 h-11 rounded-full bg-accent-orange text-white flex items-center justify-center text-base font-bold font-heading shrink-0 transition-all duration-700",
              isVisible ? "scale-100" : "scale-0"
            )}
            style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
          >
            {step.number}
          </div>
          {step.number < totalSteps && (
            <div className="w-0.5 flex-1 bg-neutral-200 mt-2 overflow-hidden">
              <div
                className={cn("w-full bg-accent-orange transition-all duration-700", isVisible ? "h-full" : "h-0")}
                style={{ transitionDelay: "300ms" }}
              />
            </div>
          )}
        </div>
        <div className="pb-6">
          <h3 className="text-base font-bold font-heading text-primary">{step.title}</h3>
          <p className="mt-1 text-sm text-secondary leading-relaxed">{step.description}</p>
        </div>
      </div>
    </div>
  );
}

export default function ProcessSteps({
  steps = PROCESS_STEPS,
  heading = "How It Works",
  showCTA = true,
}: ProcessStepsProps) {
  return (
    <SectionWrapper background="light">
      <Container>
        <AnimateOnScroll className="text-center mb-12">
          <p className="text-sm font-heading font-semibold text-accent-orange uppercase tracking-wider mb-3">
            Our Process
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading">
            {heading}
          </h2>
        </AnimateOnScroll>

        {/* Desktop: Horizontal Timeline */}
        <div className="hidden md:block">
          <div className="relative">
            <div className="absolute top-8 left-[10%] right-[10%] h-0.5 bg-neutral-200" />
            <div className="grid grid-cols-5 gap-4">
              {steps.map((step) => (
                <StepItem key={step.number} step={step} totalSteps={steps.length} />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Vertical Timeline */}
        <div className="md:hidden space-y-4">
          {steps.map((step) => (
            <StepItem key={step.number} step={step} totalSteps={steps.length} />
          ))}
        </div>

        {showCTA && (
          <SectionCTA>
            Start With Step 1 — It&apos;s Free
          </SectionCTA>
        )}
      </Container>
    </SectionWrapper>
  );
}
