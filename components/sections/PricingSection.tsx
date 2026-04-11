import { DollarSign, Info } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";

interface PricingItem {
  service: string;
  range: string;
  note?: string;
}

interface PricingSectionProps {
  heading?: string;
  items: PricingItem[];
  disclaimer?: string;
}

export default function PricingSection({
  heading = "What to Expect — SF Pricing",
  items,
  disclaimer = "Prices reflect typical San Francisco market rates. Your exact cost depends on scope, site conditions, materials, and permits. We provide detailed, itemized estimates — no ballpark guesses.",
}: PricingSectionProps) {
  return (
    <SectionWrapper background="light">
      <Container narrow>
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading">
            {heading}
          </h2>
          <div className="mt-3 mx-auto w-16 h-1 bg-accent-orange rounded-full" />
        </div>

        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-white rounded-xl border border-neutral-200"
            >
              <div className="flex items-center gap-3">
                <DollarSign size={18} className="text-accent-orange shrink-0" />
                <div>
                  <p className="font-heading font-semibold text-sm text-primary">
                    {item.service}
                  </p>
                  {item.note && (
                    <p className="text-xs text-neutral-400 mt-0.5">{item.note}</p>
                  )}
                </div>
              </div>
              <span className="font-heading font-bold text-primary text-sm whitespace-nowrap ml-4">
                {item.range}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-start gap-2 text-xs text-neutral-400">
          <Info size={14} className="shrink-0 mt-0.5" />
          <p>{disclaimer}</p>
        </div>

        <div className="text-center mt-8">
          <Button href="/contact">
            Get Your Exact Price — Free Estimate
          </Button>
        </div>
      </Container>
    </SectionWrapper>
  );
}
