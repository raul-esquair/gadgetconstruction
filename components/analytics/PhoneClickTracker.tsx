"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

/**
 * One delegated listener for every tel: link on the site — header, footer,
 * bottom bar, modal, body copy — instead of an onClick on each of them.
 * Capture phase, so a link that stops propagation is still counted.
 */
export default function PhoneClickTracker() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const link = (e.target as Element | null)?.closest?.('a[href^="tel:"]');
      if (!link) return;
      track("phone_click", {
        page: window.location.pathname,
        link_text: link.textContent?.trim().slice(0, 60),
      });
    }
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}
