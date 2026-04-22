"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Phone, FileText } from "lucide-react";
import { useEstimateModal } from "@/components/ui/EstimateModal";
import { COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function MobileBottomBar() {
  const pathname = usePathname();
  const { open } = useEstimateModal();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const heroCTAs = document.querySelector("[data-hero-cta]");
    if (!heroCTAs) {
      setIsVisible(true);
      return;
    }

    let ticking = false;
    let lastVisible = false;

    const measure = () => {
      ticking = false;
      const nextVisible = heroCTAs.getBoundingClientRect().bottom < 0;
      if (nextVisible !== lastVisible) {
        lastVisible = nextVisible;
        setIsVisible(nextVisible);
      }
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Hide on contact page and on PPC landing pages (they render their own sticky bar)
  if (pathname === "/contact" || pathname?.startsWith("/lp/")) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-neutral-200 shadow-[0_-4px_6px_-1px_rgb(0_0_0_/0.05)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0"
      )}
    >
      <div className="grid grid-cols-2 divide-x divide-neutral-200">
        <a
          href={COMPANY.phoneHref}
          className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-primary font-heading active:bg-neutral-50 transition-colors"
        >
          <Phone size={18} className="text-accent-orange" />
          Call Now
        </a>
        <button
          onClick={open}
          className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-primary btn-concrete font-heading cursor-pointer"
        >
          <FileText size={18} />
          Free Estimate
        </button>
      </div>
    </div>
  );
}
