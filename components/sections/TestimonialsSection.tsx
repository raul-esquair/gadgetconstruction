"use client";

import { Star, Quote } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionCTA from "@/components/sections/SectionCTA";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { useInView } from "@/hooks/useInView";
import { TESTIMONIALS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/lib/types";

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
  heading?: string;
}

export default function TestimonialsSection({
  testimonials = TESTIMONIALS,
  heading = "What Our Clients Say",
}: TestimonialsSectionProps) {
  const { ref, isInView } = useInView();

  return (
    <SectionWrapper background="light">
      <Container>
        <AnimateOnScroll className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading">
            {heading}
          </h2>
          <div className="mt-3 mx-auto w-16 h-1 bg-accent-orange rounded-full" />
        </AnimateOnScroll>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={cn(
                "relative p-6 md:p-8 rounded-xl bg-white border border-neutral-200 shadow-card will-change-[opacity,transform] transition-all duration-500",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
              style={{
                transitionDelay: `${index * 150}ms`,
                transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            >
              <Quote
                size={32}
                className="absolute top-4 right-4 text-accent-orange/10"
                fill="currentColor"
              />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="text-accent-orange fill-accent-orange"
                  />
                ))}
              </div>
              <blockquote className="text-sm text-secondary leading-relaxed mb-6 relative z-10">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="border-t border-neutral-100 pt-4">
                <p className="font-heading font-bold text-sm text-primary">
                  {testimonial.name}
                </p>
                <p className="text-xs text-neutral-400 mt-0.5">
                  {testimonial.projectType}
                  {testimonial.location && ` — ${testimonial.location}`}
                </p>
              </div>
            </div>
          ))}
        </div>

        <SectionCTA>
          Ready to Be Next? Get Your Free Estimate
        </SectionCTA>
      </Container>
    </SectionWrapper>
  );
}
