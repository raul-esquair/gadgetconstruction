"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface StatsCounterProps {
  value: string;
  label: string;
  suffix?: string;
  className?: string;
}

export default function StatsCounter({ value, label, suffix, className }: StatsCounterProps) {
  const [displayValue, setDisplayValue] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateValue();
        }
      },
      { threshold: 0.3 }
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  });

  function animateValue() {
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) {
      setDisplayValue(value);
      return;
    }

    const isDecimal = value.includes(".");
    const duration = 1500;
    const steps = 40;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      const progress = current / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = numericValue * eased;

      setDisplayValue(
        isDecimal ? currentValue.toFixed(1) : Math.floor(currentValue).toString()
      );

      if (current >= steps) {
        clearInterval(timer);
        setDisplayValue(value);
      }
    }, stepDuration);
  }

  return (
    <div ref={ref} className={cn("text-center", className)}>
      <div className="font-heading font-extrabold text-4xl md:text-5xl">
        {displayValue}
        {suffix && <span className="text-accent-orange">{suffix}</span>}
      </div>
      <div className="mt-2 text-sm md:text-base font-medium opacity-80">
        {label}
      </div>
    </div>
  );
}
