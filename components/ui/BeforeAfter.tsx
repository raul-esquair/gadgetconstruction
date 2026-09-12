"use client";

import { useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { blurProps } from "@/lib/blur";
import {
  springTo,
  project,
  VelocityTracker,
  prefersReducedMotion,
  SPRING_FLICK,
  type SpringHandle,
} from "@/lib/spring";

interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  caption?: string;
  /** 3:4 frame for phone-shot pairs; the default is 4:3. */
  portrait?: boolean;
  sizes?: string;
  className?: string;
}

const START = 50;

export default function BeforeAfter({
  beforeImage,
  afterImage,
  beforeAlt = "Before",
  afterAlt = "After",
  caption,
  portrait = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  className,
}: BeforeAfterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);

  // Position lives in a ref, not state — a drag writes to the DOM directly so
  // the pointer and the divider stay glued together without a re-render per frame.
  const position = useRef(START);
  const spring = useRef<SpringHandle | null>(null);
  const tracker = useRef(new VelocityTracker());
  const grabOffset = useRef(0);
  const dragging = useRef(false);

  const paint = useCallback((pct: number) => {
    position.current = pct;
    if (clipRef.current) {
      clipRef.current.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    }
    if (handleRef.current) {
      handleRef.current.style.left = `${pct}%`;
    }
    if (containerRef.current) {
      containerRef.current.setAttribute("aria-valuenow", String(Math.round(pct)));
    }
  }, []);

  const stopSpring = useCallback(() => {
    const s = spring.current;
    spring.current = null;
    return s ? s.stop() : { value: position.current, velocity: 0 };
  }, []);

  /** Animate to a target, continuing from wherever we are and at whatever speed. */
  const settle = useCallback(
    (to: number, velocity: number) => {
      const from = stopSpring().value;
      if (prefersReducedMotion()) {
        paint(to);
        return;
      }
      spring.current = springTo({
        from,
        to,
        velocity,
        ...SPRING_FLICK,
        restDelta: 0.05,
        onUpdate: paint,
        onComplete: () => {
          spring.current = null;
        },
      });
    },
    [paint, stopSpring]
  );

  const pctFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current!.getBoundingClientRect();
    return ((clientX - rect.left) / rect.width) * 100;
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      const container = containerRef.current;
      if (!container) return;

      // Grabbing a moving divider must catch it where it is, not restart it.
      const { value } = stopSpring();
      paint(value);

      const raw = pctFromClientX(e.clientX);
      const onKnob = knobRef.current?.contains(e.target as Node) ?? false;

      // Respect where they grabbed. Snapping the divider to the pointer's exact
      // x on a 40px knob would jump it ~20px the instant you touch it.
      grabOffset.current = onKnob ? value - raw : 0;
      if (!onKnob) paint(Math.max(0, Math.min(100, raw)));

      dragging.current = true;
      tracker.current.reset();
      tracker.current.add(position.current, e.timeStamp);

      container.setPointerCapture(e.pointerId);
      knobRef.current?.classList.add("scale-90");
    },
    [paint, pctFromClientX, stopSpring]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      const next = Math.max(
        0,
        Math.min(100, pctFromClientX(e.clientX) + grabOffset.current)
      );
      paint(next);
      tracker.current.add(next, e.timeStamp);
    },
    [paint, pctFromClientX]
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      dragging.current = false;
      containerRef.current?.releasePointerCapture(e.pointerId);
      knobRef.current?.classList.remove("scale-90");

      // Continue at the finger's exact speed, and land where the flick was
      // headed — not where the finger happened to leave the glass.
      const velocity = tracker.current.get();
      const target = Math.max(
        0,
        Math.min(100, position.current + project(velocity))
      );
      settle(target, velocity);
    },
    [settle]
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const step = e.shiftKey ? 10 : 2;
      let target: number | null = null;
      if (e.key === "ArrowLeft") target = position.current - step;
      else if (e.key === "ArrowRight") target = position.current + step;
      else if (e.key === "Home") target = 0;
      else if (e.key === "End") target = 100;
      if (target === null) return;
      e.preventDefault();
      settle(Math.max(0, Math.min(100, target)), 0);
    },
    [settle]
  );

  // Paint the starting position once mounted, and never leave a spring running.
  useEffect(() => {
    paint(START);
    return () => {
      spring.current?.stop();
    };
  }, [paint]);

  return (
    <div className={cn("space-y-3", className)}>
      <div
        ref={containerRef}
        className={cn(
          "relative w-full overflow-hidden rounded-xl cursor-col-resize select-none",
          portrait ? "aspect-[3/4]" : "aspect-[4/3]",
          // pan-y keeps vertical page scrolling working over the image while
          // horizontal drags come to us — without it a scroll hijacks the handle.
          "touch-pan-y"
        )}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        role="slider"
        aria-label="Before and after comparison slider"
        aria-orientation="horizontal"
        aria-valuenow={START}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={`${START}% revealed`}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        {/* After image (full background) */}
        <Image
          src={afterImage}
          {...blurProps(afterImage)}
          alt={afterAlt}
          fill
          className="object-cover pointer-events-none"
          sizes={sizes}
        />

        {/* Before image (clipped — image stays full-width so it aligns with after) */}
        <div
          ref={clipRef}
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - START}% 0 0)` }}
        >
          <Image
            src={beforeImage}
            {...blurProps(beforeImage)}
            alt={beforeAlt}
            fill
            className="object-cover"
            sizes={sizes}
          />
        </div>

        {/* Slider line */}
        <div
          ref={handleRef}
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10 will-change-transform"
          style={{ left: `${START}%` }}
        >
          <div
            ref={knobRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center transition-transform duration-100 ease-out"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="text-primary pointer-events-none"
            >
              <path
                d="M6 10L2 10M2 10L4.5 7.5M2 10L4.5 12.5M14 10L18 10M18 10L15.5 7.5M18 10L15.5 12.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <span className="absolute top-3 left-3 bg-primary/70 text-white text-xs font-heading font-semibold px-2.5 py-1 rounded-full z-10 pointer-events-none">
          Before
        </span>
        <span className="absolute top-3 right-3 bg-accent-orange/90 text-white text-xs font-heading font-semibold px-2.5 py-1 rounded-full z-10 pointer-events-none">
          After
        </span>
      </div>

      {caption && (
        <p className="text-sm text-neutral-400 text-center">{caption}</p>
      )}
    </div>
  );
}
