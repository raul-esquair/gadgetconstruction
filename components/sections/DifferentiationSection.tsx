"use client";

import { X, Check } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

const COMPARISONS = [
  {
    problem: "Vague estimates that balloon after work starts",
    solution: "Fixed-price contracts with every line item explained upfront",
  },
  {
    problem: "Contractors who vanish mid-project",
    solution: "One team, start to finish — with weekly photo updates",
  },
  {
    problem: "Permit nightmares you have to figure out alone",
    solution: "Full SF DBI permit handling — we file, track, and schedule inspections",
  },
  {
    problem: "\"We'll be there Monday\" means maybe Thursday",
    solution: "We show up when we say we will. 94% on-time completion rate.",
  },
  {
    problem: "No warranty, no recourse if something goes wrong",
    solution: "5-year workmanship warranty — in writing, not just a handshake",
  },
  {
    problem: "Job sites that look like a disaster zone",
    solution: "We clean up every single day. Your home stays livable.",
  },
];

export default function DifferentiationSection() {
  const { ref, isInView } = useInView();

  return (
    <SectionWrapper>
      <Container>
        <AnimateOnScroll className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading">
            We Know Contractors Have a Bad Reputation
          </h2>
          <div className="mt-3 mx-auto w-16 h-1 bg-accent-orange rounded-full" />
          <p className="mt-4 text-secondary text-lg max-w-2xl mx-auto">
            Here&apos;s what we do differently.
          </p>
        </AnimateOnScroll>

        <div ref={ref} className="max-w-4xl mx-auto space-y-4">
          {COMPARISONS.map((item, index) => (
            <div
              key={index}
              className={cn(
                "grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4 rounded-xl border border-neutral-200 overflow-hidden will-change-[opacity,transform] transition-all duration-500",
                isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
              )}
              style={{
                transitionDelay: `${index * 100}ms`,
                transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            >
              <div className="flex items-center gap-3 p-4 bg-neutral-50">
                <div className="w-7 h-7 rounded-full bg-accent-red/10 flex items-center justify-center shrink-0">
                  <X size={14} className="text-accent-red" />
                </div>
                <p className="text-sm text-secondary">{item.problem}</p>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white">
                <div className="w-7 h-7 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                  <Check size={14} className="text-green-600" />
                </div>
                <p className="text-sm font-medium text-primary">{item.solution}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
