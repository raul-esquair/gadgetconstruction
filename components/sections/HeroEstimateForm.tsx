"use client";

import MultiStepForm from "@/components/ui/MultiStepForm";

/**
 * The homepage hero's desktop CTA: the two-step form, inline, no modal.
 * Imported statically rather than via next/dynamic like the other form
 * mounts — it is above the fold, so it has to server-render or it would pop
 * in after hydration and shove the hero around.
 */
export default function HeroEstimateForm() {
  return (
    <div className="bg-white rounded-2xl p-6 xl:p-7 shadow-2xl shadow-black/30">
      <h2 className="text-xl xl:text-2xl font-extrabold font-heading text-primary mb-5">
        Get Your Free Quote
      </h2>
      <MultiStepForm variant="light" twoStep source="Homepage hero form" />
    </div>
  );
}
