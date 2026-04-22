"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

type AnimationType = "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale-up" | "scale-rotate" | "bubble";

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
  className,
  blur = false,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      applyStyles(el, animation, 1, blur);
      return;
    }

    let locked = false;
    let active = false;
    let ticking = false;
    let lastProgress = -1;

    const update = () => {
      ticking = false;
      if (locked) return;
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const distanceFromBottom = windowHeight - rect.top;
      const travelZone = windowHeight * 0.65;
      const progress = Math.min(1, Math.max(0, distanceFromBottom / travelZone));

      if (Math.abs(progress - lastProgress) < 0.005 && progress < 1) return;
      lastProgress = progress;

      applyStyles(el, animation, progress, blur);

      if (progress >= 1) {
        locked = true;
        active = false;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (locked) return;
        if (entry.isIntersecting) {
          active = true;
          if (!ticking) {
            ticking = true;
            requestAnimationFrame(update);
          }
        } else {
          active = false;
        }
      },
      { threshold: 0, rootMargin: "0px" }
    );

    const handleScroll = () => {
      if (!active || locked || ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    observer.observe(el);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [animation, blur]);

  // Initial styles (progress 0) — rendered in SSR and first client paint.
  // useEffect above then drives updates via direct DOM writes.
  const initialStyle = getProgressStyles(animation, 0, blur);

  return (
    <div
      ref={ref}
      className={cn("will-change-[opacity,transform]", className)}
      style={initialStyle}
    >
      {children}
    </div>
  );
}

function applyStyles(
  el: HTMLDivElement,
  animation: AnimationType,
  progress: number,
  blur: boolean
) {
  const s = getProgressStyles(animation, progress, blur);
  if (s.opacity !== undefined) el.style.opacity = String(s.opacity);
  if (typeof s.transform === "string") el.style.transform = s.transform;
  if (typeof s.borderRadius === "string") el.style.borderRadius = s.borderRadius;
  if (typeof s.filter === "string") {
    el.style.filter = s.filter;
  } else if (!blur) {
    el.style.filter = "";
  }
}

function getProgressStyles(
  animation: AnimationType,
  progress: number,
  blur: boolean,
): React.CSSProperties {
  if (animation === "bubble") {
    const elastic = easeOutElastic(progress);
    const scale = elastic;
    const opacity = Math.min(1, progress * 3);
    const radius = Math.max(0, (1 - progress) * 40);
    return {
      opacity,
      transform: `scale(${scale})`,
      borderRadius: `${12 + radius}px`,
      filter: blur ? `blur(${(1 - progress) * 3}px)` : undefined,
    };
  }

  const eased = easeOutExpo(progress);
  const transforms: Record<string, string> = {
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

function easeOutElastic(x: number): number {
  if (x === 0 || x === 1) return x;
  const c1 = 1.3;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}
