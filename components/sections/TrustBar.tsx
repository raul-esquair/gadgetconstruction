"use client";

import { useInView } from "@/hooks/useInView";
import { useEffect, useState } from "react";
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
];

function CountUp({
  target,
  suffix,
  decimals = 0,
  isActive,
}: {
  target: number;
  suffix: string;
  decimals?: number;
  isActive: boolean;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      const progress = current / steps;
      // Ease-out quart — fast start, satisfying deceleration
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(eased * target);

      if (current >= steps) {
        clearInterval(timer);
        setValue(target);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isActive, target]);

  const display = decimals > 0 ? value.toFixed(decimals) : Math.floor(value).toString();

  return (
    <span className="tabular-nums">
      {display}
      <span className="text-accent-orange">{suffix}</span>
    </span>
  );
}

export default function TrustBar() {
  const { ref, isInView } = useInView({ threshold: 0.5 });

  return (
    <section ref={ref} className="bg-neutral-50 border-y border-neutral-200 py-8 md:py-10">
      <Container>
        <div className="flex items-center justify-center gap-8 md:gap-16 lg:gap-24">
          {STATS.map((stat, index) => (
            <div
              key={index}
              className={cn(
                "text-center transition-all duration-700 will-change-[opacity,transform]",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{
                transitionDelay: `${index * 200}ms`,
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <div className="text-3xl md:text-5xl font-extrabold font-heading text-primary">
                <CountUp
                  target={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  isActive={isInView}
                />
              </div>
              <p className="mt-1.5 text-xs md:text-sm font-medium text-secondary uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
