"use client";

import { EstimateButton } from "@/components/ui/EstimateModal";

interface HeroCTAProps {
  text: string;
  size?: "sm" | "md" | "lg";
}

export default function HeroCTA({ text, size = "lg" }: HeroCTAProps) {
  return (
    <EstimateButton size={size}>
      {text}
    </EstimateButton>
  );
}
