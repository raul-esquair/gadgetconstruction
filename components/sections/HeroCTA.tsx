"use client";

import { EstimateButton } from "@/components/ui/EstimateModal";

interface HeroCTAProps {
  text: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function HeroCTA({ text, size = "lg", className }: HeroCTAProps) {
  return (
    <EstimateButton size={size} source="Hero button" className={className}>
      {text}
    </EstimateButton>
  );
}
