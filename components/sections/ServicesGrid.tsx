"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { SERVICES } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Bento layout: first 2 services are large (high-value), rest are compact
const BENTO_LAYOUT = [
  { large: true },   // Complete Remodel
  { large: true },   // ADU Construction
  { large: false },   // Concrete Foundations
  { large: false },   // Retaining Walls
  { large: false },   // Composite Decks
  { large: false },   // Roofing
];

// Descriptive alt text for SEO (falls back to service.name)
const SERVICE_IMAGE_ALT: Record<string, string> = {
  "concrete-foundations": "Construction workers pouring wet concrete into a rebar-reinforced foundation form on a Bay Area job site",
  "complete-remodel": "Complete home remodel project by Gadget Construction in the San Francisco Bay Area",
  "adu-construction": "ADU accessory dwelling unit construction by Gadget Construction in the Bay Area",
  "composite-decks": "Composite deck building and installation by Gadget Construction",
  "roofing": "Professional roof installation and repair by Gadget Construction",
  "retaining-walls": "Retaining wall construction by Gadget Construction in the Bay Area",
};

// Reorder services: lead with the two highest-value
const BENTO_ORDER = [
  SERVICES.find((s) => s.slug === "complete-remodel")!,
  SERVICES.find((s) => s.slug === "adu-construction")!,
  SERVICES.find((s) => s.slug === "concrete-foundations")!,
  SERVICES.find((s) => s.slug === "retaining-walls")!,
  SERVICES.find((s) => s.slug === "composite-decks")!,
  SERVICES.find((s) => s.slug === "roofing")!,
];

function StickyCard({
  stickyTop,
  index,
  children,
}: {
  stickyTop: number;
  index: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) { setVisible(true); return; }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "sticky pb-5 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform]",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{
        top: `${stickyTop}px`,
        zIndex: index + 1,
      }}
    >
      {children}
    </div>
  );
}

export default function ServicesGrid() {
  return (
    <SectionWrapper>
      <Container>
        <AnimateOnScroll className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading">
            What We Build
          </h2>
          <div className="mt-3 mx-auto w-16 h-1 bg-accent-orange rounded-full" />
        </AnimateOnScroll>

        {/* Mobile: Stacking cards */}
        <div className="sm:hidden">
          {BENTO_ORDER.map((service, index) => {
            const HEADER_H = 80;
            const PEEK = 48;
            const stickyTop = HEADER_H + index * PEEK;

            return (
              <StickyCard
                key={service.slug}
                stickyTop={stickyTop}
                index={index}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group block relative overflow-hidden rounded-2xl min-h-[340px] shadow-[0_-2px_20px_rgba(0,0,0,0.25)]"
                >
                  <div className="absolute inset-0 bg-neutral-200">
                    <Image
                      src={service.image}
                      alt={SERVICE_IMAGE_ALT[service.slug] || service.name}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-primary/30" />

                  {/* Top: service name — visible as peek when stacked */}
                  <div className="absolute top-0 left-0 right-0 z-10 px-5 pt-4">
                    <h3
                      className="text-lg font-extrabold font-heading"
                      style={{ color: "#ffffff" }}
                    >
                      {service.name}
                    </h3>
                  </div>

                  {/* Bottom: description + CTA */}
                  <div className="relative z-10 flex flex-col justify-end p-5 min-h-[340px]">
                    {index < 2 && (
                      <span className="inline-block self-start text-xs font-semibold text-white bg-accent-orange/90 px-2.5 py-1 rounded-full mb-2 font-heading">
                        Featured Service
                      </span>
                    )}
                    <p className="text-sm text-white/70 leading-relaxed mb-3">
                      {service.shortDescription}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-white font-heading">
                      Learn More
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </StickyCard>
            );
          })}
        </div>

        {/* Desktop: Bento grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {BENTO_ORDER.map((service, index) => {
            const layout = BENTO_LAYOUT[index];

            if (layout.large) {
              return (
                <RevealOnScroll
                  key={service.slug}
                  animation={index === 0 ? "slide-left" : "slide-right"}
                  className="lg:col-span-2"
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className="group relative overflow-hidden rounded-2xl min-h-[280px] md:min-h-[340px] block"
                  >
                    <div className="absolute inset-0 bg-neutral-200">
                      <Image
                        src={service.image}
                        alt={SERVICE_IMAGE_ALT[service.slug] || service.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 640px"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-primary/20 group-hover:from-primary/95 transition-colors duration-500" />
                    <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8 min-h-[280px] md:min-h-[340px]">
                      <span className="inline-block self-start text-xs font-semibold text-white bg-accent-orange/90 px-2.5 py-1 rounded-full mb-3 font-heading">
                        Featured Service
                      </span>
                      <h3 className="text-2xl md:text-3xl font-extrabold font-heading mb-2" style={{ color: "#ffffff" }}>
                        {service.name}
                      </h3>
                      <p className="text-sm text-white/70 leading-relaxed max-w-md mb-4">
                        {service.shortDescription}
                      </p>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:gap-3 transition-all duration-300 font-heading">
                        Explore This Service
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </Link>
                </RevealOnScroll>
              );
            }

            return (
              <RevealOnScroll
                key={service.slug}
                animation="scale-up"
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group relative overflow-hidden rounded-2xl min-h-[200px] block"
                >
                  <div className="absolute inset-0 bg-neutral-100">
                    <Image
                      src={service.image}
                      alt={SERVICE_IMAGE_ALT[service.slug] || service.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/40 to-transparent group-hover:from-primary/90 transition-colors duration-500" />
                  <div className="relative z-10 h-full flex flex-col justify-end p-5 md:p-6 min-h-[200px]">
                    <h3 className="text-lg font-bold font-heading mb-1.5" style={{ color: "#ffffff" }}>
                      {service.name}
                    </h3>
                    <p className="text-xs text-white/60 leading-relaxed mb-3">
                      {service.shortDescription}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 group-hover:text-white group-hover:gap-2.5 transition-all duration-300 font-heading">
                      Learn More
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </RevealOnScroll>
            );
          })}
        </div>
      </Container>
    </SectionWrapper>
  );
}
