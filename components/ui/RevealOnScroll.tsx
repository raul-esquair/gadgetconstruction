"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { subscribeToScroll } from "@/lib/scroll-driver";

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

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      applyStyles(el, animation, 1, blur);
      return;
    }

    let locked = false;
    let lastProgress = -1;
    let unsubscribe: (() => void) | null = null;

    // Reads happen in measure, writes in apply — the driver runs every
    // subscriber's reads before any writes, so layout is computed once a frame.
    const subscriber = {
      measure: () => {
        // null means "no write needed this frame" — the subscription only ends
        // via unsubscribe, below.
        if (locked) return null;
        const rect = el.getBoundingClientRect();
        const travelZone = window.innerHeight * 0.65;
        const distanceFromBottom = window.innerHeight - rect.top;
        const progress = Math.min(1, Math.max(0, distanceFromBottom / travelZone));
        if (Math.abs(progress - lastProgress) < 0.005 && progress < 1) return null;
        lastProgress = progress;
        return progress;
      },
      apply: (progress: number) => {
        applyStyles(el, animation, progress, blur);
        if (progress >= 1) {
          locked = true;
          el.style.willChange = "auto";
          unsubscribe?.();
        }
      },
    };

    // Only pay for elements currently on screen; the IntersectionObserver
    // callback is cheap and keeps the shared loop's subscriber set small.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (locked) return;
        if (entry.isIntersecting) {
          if (!unsubscribe) unsubscribe = subscribeToScroll(subscriber);
        } else {
          unsubscribe?.();
          unsubscribe = null;
        }
      },
      { threshold: 0, rootMargin: "0px" }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      unsubscribe?.();
    };
  }, [animation, blur]);

  // Initial styles (progress 0) — rendered in SSR and first client paint.
  // The effect above then drives updates via direct DOM writes.
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
