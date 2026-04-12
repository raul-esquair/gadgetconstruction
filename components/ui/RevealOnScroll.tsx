"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

type AnimationType = "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale-up" | "scale-rotate";

interface RevealOnScrollProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  className?: string;
  blur?: boolean;
}

export default function RevealOnScroll({
  children,
  animation = "fade-up",
  delay = 0,
  className,
  blur = false,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const locked = useRef(false);
  const active = useRef(false);

  const updateProgress = useCallback(() => {
    const el = ref.current;
    if (!el || locked.current) return;

    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Element's top relative to bottom of viewport
    // 0 = element just entered at the bottom
    // 1 = element has traveled 40% of the viewport height upward
    const distanceFromBottom = windowHeight - rect.top;
    const travelZone = windowHeight * 0.65;
    const raw = distanceFromBottom / travelZone;
    const clamped = Math.min(1, Math.max(0, raw));

    setProgress(clamped);

    if (clamped >= 1) {
      locked.current = true;
      active.current = false;
    }
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      setProgress(1);
      return;
    }

    // Use IntersectionObserver to activate/deactivate scroll tracking
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (locked.current) return;

        if (entry.isIntersecting) {
          active.current = true;
          updateProgress();
        } else {
          active.current = false;
        }
      },
      { threshold: 0, rootMargin: "0px 0px 0px 0px" }
    );

    const handleScroll = () => {
      if (active.current && !locked.current) {
        requestAnimationFrame(updateProgress);
      }
    };

    observer.observe(el);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.unobserve(el);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [updateProgress]);

  const styles = getProgressStyles(animation, progress, blur);

  return (
    <div
      ref={ref}
      className={cn("will-change-[opacity,transform]", className)}
      style={styles}
    >
      {children}
    </div>
  );
}

function getProgressStyles(
  animation: AnimationType,
  progress: number,
  blur: boolean,
): React.CSSProperties {
  const eased = easeOutExpo(progress);

  const transforms: Record<AnimationType, string> = {
    "fade-up": `translateY(${(1 - eased) * 30}px)`,
    "fade-in": "",
    "slide-left": `translateX(${(1 - eased) * -40}px)`,
    "slide-right": `translateX(${(1 - eased) * 40}px)`,
    "scale-up": `scale(${0.9 + eased * 0.1})`,
    "scale-rotate": `scale(${0.8 + eased * 0.2}) rotate(${(1 - eased) * 3}deg)`,
  };

  return {
    opacity: eased,
    transform: transforms[animation],
    filter: blur ? `blur(${(1 - eased) * 3}px)` : undefined,
  };
}

function easeOutExpo(x: number): number {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}
