"use client";

import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

type AnimationType = "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale-up";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
}

const animationStyles: Record<AnimationType, { hidden: string; visible: string }> = {
  "fade-up": {
    hidden: "opacity-0 translate-y-6",
    visible: "opacity-100 translate-y-0",
  },
  "fade-in": {
    hidden: "opacity-0",
    visible: "opacity-100",
  },
  "slide-left": {
    hidden: "opacity-0 -translate-x-8",
    visible: "opacity-100 translate-x-0",
  },
  "slide-right": {
    hidden: "opacity-0 translate-x-8",
    visible: "opacity-100 translate-x-0",
  },
  "scale-up": {
    hidden: "opacity-0 scale-95",
    visible: "opacity-100 scale-100",
  },
};

export default function AnimateOnScroll({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 600,
  className,
}: AnimateOnScrollProps) {
  const { ref, isInView } = useInView();
  const styles = animationStyles[animation];

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all will-change-[opacity,transform]",
        isInView ? styles.visible : styles.hidden,
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      {children}
    </div>
  );
}

// Stagger wrapper — applies increasing delays to children
interface StaggerProps {
  children: React.ReactNode[];
  animation?: AnimationType;
  staggerDelay?: number;
  duration?: number;
  className?: string;
}

export function Stagger({
  children,
  animation = "fade-up",
  staggerDelay = 100,
  duration = 600,
  className,
}: StaggerProps) {
  const { ref, isInView } = useInView();
  const styles = animationStyles[animation];

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className={cn(
            "transition-all will-change-[opacity,transform]",
            isInView ? styles.visible : styles.hidden
          )}
          style={{
            transitionDuration: `${duration}ms`,
            transitionDelay: `${index * staggerDelay}ms`,
            transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
