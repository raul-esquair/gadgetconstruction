/**
 * One scroll listener and one rAF for the whole page.
 *
 * Every RevealOnScroll used to register its own window scroll handler and call
 * getBoundingClientRect() inside it — so a page with 20 reveals did 20 layout
 * reads per frame, each one interleaved with a style write that invalidated
 * layout for the next read.
 *
 * This driver fixes both halves: a single listener, and a strict read phase
 * followed by a write phase, so layout is computed at most once per frame.
 */

export interface ScrollSubscriber {
  /** Read layout only. Return null to skip this frame's write (no change). */
  measure: () => number | null;
  /** Write styles only. Never read layout here or the batching is defeated. */
  apply: (value: number) => void;
}

const subscribers = new Set<ScrollSubscriber>();
const pending = new Map<ScrollSubscriber, number>();

let listening = false;
let ticking = false;

function frame() {
  ticking = false;
  pending.clear();

  // Phase 1 — read.
  for (const sub of subscribers) {
    const value = sub.measure();
    if (value !== null) pending.set(sub, value);
  }

  // Phase 2 — write. A subscriber may unsubscribe itself here (a reveal that
  // has finished does), which is why the writes iterate the snapshot map.
  for (const [sub, value] of pending) sub.apply(value);
  pending.clear();

  if (subscribers.size === 0) teardown();
}

function schedule() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(frame);
}

function teardown() {
  if (!listening) return;
  window.removeEventListener("scroll", schedule);
  window.removeEventListener("resize", schedule);
  listening = false;
}

export function subscribeToScroll(sub: ScrollSubscriber): () => void {
  subscribers.add(sub);

  if (!listening) {
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    listening = true;
  }
  schedule();

  return () => {
    subscribers.delete(sub);
    if (subscribers.size === 0) teardown();
  };
}
