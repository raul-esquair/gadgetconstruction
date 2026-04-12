"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface AnimatedStat {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}

const STATS: AnimatedStat[] = [
  { value: 12, suffix: "+", label: "Years in Business" },
  { value: 500, suffix: "+", label: "Projects Completed" },
  { value: 5.0, suffix: "★", label: "Star Rated", decimals: 1 },
  { value: 0, suffix: "", label: "Surprise Bills" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
];

// Double the array for seamless loop
const LOOPED_STATS = [...STATS, ...STATS];

function CountUpStat({ stat, shouldAnimate }: { stat: AnimatedStat; shouldAnimate: boolean }) {
  const [displayValue, setDisplayValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!shouldAnimate || hasAnimated.current) return;
    hasAnimated.current = true;

    if (stat.value === 0) {
      setDisplayValue(0);
      return;
    }

    const duration = 1800;
    const steps = 50;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      const progress = current / steps;
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(eased * stat.value);
      if (current >= steps) {
        clearInterval(timer);
        setDisplayValue(stat.value);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [shouldAnimate, stat.value]);

  const display = stat.decimals
    ? displayValue.toFixed(stat.decimals)
    : Math.floor(displayValue).toString();

  return (
    <div className="flex-shrink-0 flex items-center gap-3 px-8 md:px-12">
      <span className="text-2xl md:text-4xl font-extrabold font-heading text-primary tabular-nums whitespace-nowrap">
        {display}
        <span className="text-accent-orange">{stat.suffix}</span>
      </span>
      <span className="text-xs md:text-sm font-medium text-secondary uppercase tracking-wider whitespace-nowrap">
        {stat.label}
      </span>
    </div>
  );
}

export default function TrustBar() {
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
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <section
      ref={ref}
      className={cn(
        "bg-neutral-50 border-y border-neutral-200 py-5 md:py-6 overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-neutral-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-neutral-50 to-transparent z-10 pointer-events-none" />

        {/* Conveyor belt */}
        <div className="flex animate-[marquee_8s_linear_infinite] md:animate-[marquee_15s_linear_infinite] hover:[animation-play-state:paused]">
          {LOOPED_STATS.map((stat, index) => (
            <div key={index} className="flex items-center">
              <CountUpStat stat={stat} shouldAnimate={isVisible} />
              <div className="w-px h-8 bg-neutral-200 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
