"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionCTA from "@/components/sections/SectionCTA";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { PROCESS_STEPS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { blurProps } from "@/lib/blur";
import { subscribeToScroll } from "@/lib/scroll-driver";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { ProcessStep } from "@/lib/types";

/** Fraction of each scrolled pixel the background lags behind the section. */
const PARALLAX_SPEED = 0.25;

/**
 * Background that drifts slower than the page. Unlike the Hero's, this section
 * sits mid-page, so the shift is measured from the section's centre to the
 * viewport's centre rather than from scrollY. Desktop only, like the Hero:
 * main-thread parallax judders against iOS momentum scrolling.
 */
function ParallaxBackground({ src }: { src: string }) {
  const layerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const layer = layerRef.current;
    const section = layer?.parentElement;
    if (!layer || !section || reducedMotion) return;

    const desktop = window.matchMedia("(min-width: 768px)");
    let bleed = 0;
    let lastBleed = -1;
    let lastShift = NaN;

    const subscriber = {
      measure: () => {
        let shift = 0;
        bleed = 0;
        if (desktop.matches) {
          const rect = section.getBoundingClientRect();
          const vh = window.innerHeight;
          const offset = rect.top + rect.height / 2 - vh / 2;
          shift = -offset * PARALLAX_SPEED;
          // Extra image above and below to cover the largest shift reachable
          // while any part of the section is on screen, so no edge shows.
          bleed = Math.ceil(((vh + rect.height) / 2) * PARALLAX_SPEED);
        }
        if (Math.abs(shift - lastShift) < 0.5 && bleed === lastBleed) return null;
        return shift;
      },
      apply: (shift: number) => {
        lastShift = shift;
        if (bleed !== lastBleed) {
          lastBleed = bleed;
          layer.style.top = layer.style.bottom = bleed ? `${-bleed}px` : "";
        }
        layer.style.transform = shift ? `translate3d(0, ${shift.toFixed(1)}px, 0)` : "";
      },
    };

    // Only in the shared loop while the section is (nearly) on screen.
    let unsubscribe: (() => void) | null = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!unsubscribe) unsubscribe = subscribeToScroll(subscriber);
        } else {
          unsubscribe?.();
          unsubscribe = null;
        }
      },
      { rootMargin: "100px 0px" }
    );
    observer.observe(section);

    return () => {
      observer.disconnect();
      unsubscribe?.();
      layer.style.top = layer.style.bottom = layer.style.transform = "";
    };
  }, [reducedMotion]);

  return (
    <div ref={layerRef} className="absolute inset-0 will-change-transform">
      <Image
        src={src}
        {...blurProps(src)}
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        quality={70}
      />
    </div>
  );
}

interface ProcessStepsProps {
  steps?: ProcessStep[];
  heading?: string;
  showCTA?: boolean;
  /** Photo behind a dark scrim; the section switches to light-on-dark text. */
  backgroundImage?: string;
}

function StepItem({
  step,
  totalSteps,
  onDark,
}: {
  step: ProcessStep;
  totalSteps: number;
  onDark: boolean;
}) {
  // Inline style, not text-white: the global :where(h1-h6) colour wins over it.
  const titleStyle = onDark ? { color: "#ffffff" } : undefined;
  const bodyColor = onDark ? "text-white/80" : "text-secondary";
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
        <h3 className="mt-4 text-base font-bold font-heading text-primary" style={titleStyle}>{step.title}</h3>
        <p className={cn("mt-2 text-sm leading-relaxed", bodyColor)}>{step.description}</p>
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
            <div className={cn("w-0.5 flex-1 mt-2 overflow-hidden", onDark ? "bg-white/20" : "bg-neutral-200")}>
              <div
                className={cn("w-full bg-accent-orange transition-all duration-700", isVisible ? "h-full" : "h-0")}
                style={{ transitionDelay: "300ms" }}
              />
            </div>
          )}
        </div>
        <div className="pb-6">
          <h3 className="text-base font-bold font-heading text-primary" style={titleStyle}>{step.title}</h3>
          <p className={cn("mt-1 text-sm leading-relaxed", bodyColor)}>{step.description}</p>
        </div>
      </div>
    </div>
  );
}

export default function ProcessSteps({
  steps = PROCESS_STEPS,
  heading = "How It Works",
  showCTA = true,
  backgroundImage,
}: ProcessStepsProps) {
  const onDark = Boolean(backgroundImage);

  return (
    <SectionWrapper
      background={onDark ? "dark" : "light"}
      className={onDark ? "relative overflow-hidden" : undefined}
    >
      {backgroundImage && (
        <>
          <ParallaxBackground src={backgroundImage} />
          {/* Heavy scrim: the rebar is busy, and step copy is small text. */}
          <div className="absolute inset-0 bg-primary/85" />
        </>
      )}
      <Container className={onDark ? "relative z-10" : undefined}>
        <AnimateOnScroll className="text-center mb-12">
          {/* Brand red is under 3:1 on the scrim; the step circles carry the red. */}
          <p
            className={cn(
              "text-sm font-heading font-semibold uppercase tracking-wider mb-3",
              onDark ? "text-white/70" : "text-accent-orange"
            )}
          >
            Our Process
          </p>
          <h2
            className="text-3xl md:text-4xl font-extrabold font-heading"
            style={onDark ? { color: "#ffffff" } : undefined}
          >
            {heading}
          </h2>
        </AnimateOnScroll>

        {/* Desktop: Horizontal Timeline */}
        <div className="hidden md:block">
          <div className="relative">
            <div className={cn("absolute top-8 left-[10%] right-[10%] h-0.5", onDark ? "bg-white/20" : "bg-neutral-200")} />
            <div className="grid grid-cols-5 gap-4">
              {steps.map((step) => (
                <StepItem key={step.number} step={step} totalSteps={steps.length} onDark={onDark} />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Vertical Timeline */}
        <div className="md:hidden space-y-4">
          {steps.map((step) => (
            <StepItem key={step.number} step={step} totalSteps={steps.length} onDark={onDark} />
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
