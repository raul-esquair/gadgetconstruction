"use client";

import { X, Check } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

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
    solution: "Full permit handling in every city we serve — we file, track, and schedule inspections",
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
  return (
    <SectionWrapper>
      <Container>
        <AnimateOnScroll className="max-w-4xl mx-auto mb-10">
          <p className="text-sm font-heading font-semibold text-accent-orange uppercase tracking-wider mb-3">
            The Gadget Difference
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading">
            We Know Contractors Have a Bad Reputation.{" "}
            <span className="text-secondary">Here&apos;s what we do differently.</span>
          </h2>
        </AnimateOnScroll>

        <div className="max-w-4xl mx-auto space-y-4">
          {COMPARISONS.map((item, index) => (
            <RevealOnScroll key={index} animation="bubble">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4 rounded-xl border border-neutral-200 overflow-hidden">
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
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
