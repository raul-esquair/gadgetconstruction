"use client";

import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionCTA from "@/components/sections/SectionCTA";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { useInView } from "@/hooks/useInView";
import { PROCESS_STEPS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { ProcessStep } from "@/lib/types";

interface ProcessStepsProps {
  steps?: ProcessStep[];
  heading?: string;
}

export default function ProcessSteps({
  steps = PROCESS_STEPS,
  heading = "How It Works",
}: ProcessStepsProps) {
  const { ref, isInView } = useInView();

  return (
    <SectionWrapper background="light">
      <Container>
        <AnimateOnScroll className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading">
            {heading}
          </h2>
          <div className="mt-3 mx-auto w-16 h-1 bg-accent-orange rounded-full" />
        </AnimateOnScroll>

        {/* Scroll trigger — visible on all viewports */}
        <div ref={ref} />

        {/* Desktop: Horizontal Timeline */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Connecting line — draws on scroll */}
            <div className="absolute top-8 left-[10%] right-[10%] h-0.5 bg-neutral-200 overflow-hidden">
              <div
                className={cn(
                  "h-full bg-accent-orange transition-all duration-1000 ease-out",
                  isInView ? "w-full" : "w-0"
                )}
                style={{ transitionDelay: "200ms" }}
              />
            </div>

            <div className="grid grid-cols-5 gap-4">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className={cn(
                    "relative text-center will-change-[opacity,transform] transition-all duration-500",
                    isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  )}
                  style={{
                    transitionDelay: `${300 + index * 200}ms`,
                    transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  }}
                >
                  <div
                    className={cn(
                      "relative z-10 mx-auto w-16 h-16 rounded-full bg-accent-orange text-white flex items-center justify-center text-xl font-bold font-heading shadow-md transition-transform duration-500",
                      isInView ? "scale-100" : "scale-0"
                    )}
                    style={{
                      transitionDelay: `${200 + index * 200}ms`,
                      transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                    }}
                  >
                    {step.number}
                  </div>
                  <h3 className="mt-4 text-base font-bold font-heading text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Vertical Timeline */}
        <div className="md:hidden space-y-4">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={cn(
                "flex gap-4 will-change-[opacity,transform] transition-all duration-500",
                isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              )}
              style={{
                transitionDelay: `${index * 150}ms`,
                transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            >
              <div className="relative flex flex-col items-center">
                <div className="w-11 h-11 rounded-full bg-accent-orange text-white flex items-center justify-center text-base font-bold font-heading shrink-0">
                  {step.number}
                </div>
                {step.number < steps.length && (
                  <div className="w-0.5 flex-1 bg-neutral-200 mt-2 overflow-hidden">
                    <div
                      className={cn(
                        "w-full bg-accent-orange transition-all duration-700",
                        isInView ? "h-full" : "h-0"
                      )}
                      style={{ transitionDelay: `${index * 150 + 300}ms` }}
                    />
                  </div>
                )}
              </div>
              <div className="pb-6">
                <h3 className="text-base font-bold font-heading text-primary">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm text-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <SectionCTA>
          Start With Step 1 — It&apos;s Free
        </SectionCTA>
      </Container>
    </SectionWrapper>
  );
}
