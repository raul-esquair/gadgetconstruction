"use client";

import { EstimateButton } from "@/components/ui/EstimateModal";

interface SectionCTAProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export default function SectionCTA({
  children,
  variant = "primary",
  size = "lg",
}: SectionCTAProps) {
  return (
    <div className="text-center mt-10">
      <EstimateButton variant={variant} size={size}>
        {children}
      </EstimateButton>
    </div>
  );
}
