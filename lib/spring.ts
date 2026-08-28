/**
 * Apple-style springs — WWDC 2018 "Designing Fluid Interfaces".
 *
 * Two designer-facing parameters instead of mass/stiffness/damping:
 *   damping  — 1.0 is critically damped (no overshoot). < 1.0 bounces.
 *   response — roughly how long, in seconds, the value takes to reach the target.
 *              NOT a duration; a spring has no fixed duration.
 *
 * Springs are used instead of CSS transitions anywhere a user can touch the
 * thing, because they animate from the *current* value and carry velocity —
 * which is what makes an animation interruptible and reversible mid-flight.
 */

export const SPRING_MOVE = { damping: 1.0, response: 0.4 };
export const SPRING_SHEET = { damping: 0.8, response: 0.3 };
export const SPRING_FLICK = { damping: 0.85, response: 0.35 };

export interface SpringHandle {
  /** Cancels the animation and reports where it was, so a re-target can continue from it. */
  stop: () => { value: number; velocity: number };
}

interface SpringToOptions {
  from: number;
  to: number;
  /** Units per second. Hand the gesture's release velocity straight in. */
  velocity?: number;
  damping?: number;
  response?: number;
  onUpdate: (value: number) => void;
  onComplete?: () => void;
  /** Below this distance (and proportional speed) the spring is considered at rest. */
  restDelta?: number;
}

/**
 * Integrates a damped harmonic oscillator with rAF. Semi-implicit Euler at a
 * fixed 1/240s substep — stable even when the browser hands us a long frame.
 */
export function springTo({
  from,
  to,
  velocity = 0,
  damping = SPRING_MOVE.damping,
  response = SPRING_MOVE.response,
  onUpdate,
  onComplete,
  restDelta = 0.01,
}: SpringToOptions): SpringHandle {
  let value = from;
  let v = velocity;
  let raf = 0;
  let done = false;

  const omega = (2 * Math.PI) / response;
  const stiffness = omega * omega;
  const dampingCoef = 2 * damping * omega;

  const SUBSTEP = 1 / 240;
  const restSpeed = restDelta * omega;

  let last = performance.now();

  const frame = (now: number) => {
    // Clamp long frames (tab restore, jank) so the spring can't explode.
    let dt = Math.min((now - last) / 1000, 0.064);
    last = now;

    while (dt > 0) {
      const step = Math.min(dt, SUBSTEP);
      const a = -stiffness * (value - to) - dampingCoef * v;
      v += a * step;
      value += v * step;
      dt -= step;
    }

    if (Math.abs(value - to) < restDelta && Math.abs(v) < restSpeed) {
      value = to;
      v = 0;
      done = true;
      onUpdate(value);
      onComplete?.();
      return;
    }

    onUpdate(value);
    raf = requestAnimationFrame(frame);
  };

  raf = requestAnimationFrame(frame);

  return {
    stop() {
      if (!done) cancelAnimationFrame(raf);
      done = true;
      return { value, velocity: v };
    },
  };
}

/**
 * Where a flick comes to rest — iOS scroll deceleration, from the
 * "Designing Fluid Interfaces" sample code. Use it to pick the snap target
 * *before* animating, so a flick throws the element instead of snapping back
 * to whatever was nearest the release point.
 *
 * NOT the textbook v²/(2·decel); Apple ships the exponential-decay form.
 */
export function project(velocity: number, decelerationRate = 0.998): number {
  return ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);
}

/**
 * Progressive resistance past a boundary. The further past, the less the
 * element follows — real things slow before they stop.
 */
export function rubberband(
  overshoot: number,
  dimension: number,
  constant = 0.55
): number {
  return (
    (overshoot * dimension * constant) /
    (dimension + constant * Math.abs(overshoot))
  );
}

/** Tracks pointer velocity from a short position history (last ~100ms). */
export class VelocityTracker {
  private samples: { value: number; time: number }[] = [];

  add(value: number, time = performance.now()) {
    this.samples.push({ value, time });
    // Keep only the recent window — older samples make a flick read as a drag.
    while (this.samples.length > 2 && time - this.samples[0].time > 100) {
      this.samples.shift();
    }
  }

  /** Units per second. Zero if there isn't enough history to be meaningful. */
  get(): number {
    if (this.samples.length < 2) return 0;
    const first = this.samples[0];
    const last = this.samples[this.samples.length - 1];
    const dt = (last.time - first.time) / 1000;
    if (dt <= 0) return 0;
    return (last.value - first.value) / dt;
  }

  reset() {
    this.samples = [];
  }
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
