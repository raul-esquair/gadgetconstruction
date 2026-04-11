"use client";

import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { useInView } from "@/hooks/useInView";
import { SERVICES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function ServicesGrid() {
  const { ref, isInView } = useInView();

  return (
    <SectionWrapper>
      <Container>
        <AnimateOnScroll className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading">
            What We Build
          </h2>
          <div className="mt-3 mx-auto w-16 h-1 bg-accent-orange rounded-full" />
        </AnimateOnScroll>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((service, index) => {
            const Icon = LucideIcons[service.icon as keyof typeof LucideIcons] as React.ComponentType<{ size?: number; className?: string }>;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className={cn(
                  "group p-6 md:p-8 rounded-xl border border-neutral-200 bg-white hover:shadow-card-hover hover:-translate-y-0.5 hover:border-accent-orange/30 will-change-[opacity,transform]",
                  "transition-all duration-500",
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              >
                <div className="w-12 h-12 rounded-lg bg-accent-orange/10 flex items-center justify-center mb-4 group-hover:bg-accent-orange/20 group-hover:rotate-6 transition-all duration-300">
                  {Icon && <Icon size={24} className="text-accent-orange" />}
                </div>
                <h3 className="text-lg font-bold font-heading text-primary mb-2">
                  {service.name}
                </h3>
                <p className="text-sm text-secondary leading-relaxed mb-4">
                  {service.shortDescription}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-orange group-hover:gap-2.5 transition-all duration-300 font-heading">
                  Learn More
                  <ArrowRight size={14} />
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </SectionWrapper>
  );
}
