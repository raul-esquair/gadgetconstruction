"use client";

import { useSyncExternalStore } from "react";

/**
 * Tracks `prefers-reduced-motion` and keeps tracking it — the preference can be
 * toggled mid-session, and a one-shot check at mount silently ignores that.
 *
 * matchMedia is an external store, so it's subscribed to as one. The server
 * snapshot is false so markup matches; React corrects it on hydration, before
 * any entrance animation is armed.
 */
const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void): () => void {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot(): boolean {
  return false;
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
