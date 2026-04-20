"use client";

import { Phone, FileText } from "lucide-react";
import { useEstimateModal } from "@/components/ui/EstimateModal";
import { COMPANY } from "@/lib/constants";

export default function LpStickyBar() {
  const { open } = useEstimateModal();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-neutral-200 shadow-[0_-4px_6px_-1px_rgb(0_0_0_/0.05)]">
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
          className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-white bg-accent-orange active:bg-accent-orange-dark font-heading cursor-pointer"
        >
          <FileText size={18} />
          Free Estimate
        </button>
      </div>
    </div>
  );
}
