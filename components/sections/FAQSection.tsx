"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";
import JsonLd, { faqSchema } from "@/components/seo/JsonLd";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import type { FAQ } from "@/lib/types";

interface FAQSectionProps {
  faqs: FAQ[];
  heading?: string;
  background?: "white" | "light";
}

export default function FAQSection({
  faqs,
  heading = "Frequently Asked Questions",
  background = "white",
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { ref, isInView } = useInView();

  return (
    <SectionWrapper background={background}>
      <JsonLd data={faqSchema(faqs)} />
      <Container narrow>
        <AnimateOnScroll className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading">
            {heading}
          </h2>
          <div className="mt-3 mx-auto w-16 h-1 bg-accent-orange rounded-full" />
        </AnimateOnScroll>

        <div ref={ref} className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={cn(
                "border border-neutral-200 rounded-xl overflow-hidden will-change-[opacity,transform] transition-all duration-500",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{
                transitionDelay: `${index * 80}ms`,
                transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex items-center justify-between w-full p-5 text-left hover:bg-neutral-50 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="font-heading font-semibold text-primary pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  size={20}
                  className={cn(
                    "shrink-0 text-neutral-400 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    openIndex === index && "rotate-180 text-accent-orange"
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="px-5 pb-5 text-secondary text-sm leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
