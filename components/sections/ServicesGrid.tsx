"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { SERVICES } from "@/lib/constants";

// Bento layout: first 2 services are large (high-value), rest are compact
const BENTO_LAYOUT = [
  { large: true },   // Complete Remodel
  { large: true },   // ADU Construction
  { large: false },   // Concrete Foundations
  { large: false },   // Retaining Walls
  { large: false },   // Composite Decks
  { large: false },   // Roofing
];

// Service-specific images (real photos replace placeholders as available)
const SERVICE_IMAGES: Record<string, string> = {
  "complete-remodel": "/images/complete-remodel.jpg",
  "adu-construction": "/images/adu-construction.jpg",
  "composite-decks": "/images/composite-decks.jpg",
  "roofing": "/images/roofing.jpg",
  "retaining-walls": "/images/retaining-walls.jpg",
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
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
                      {SERVICE_IMAGES[service.slug] ? (
                        <Image
                          src={SERVICE_IMAGES[service.slug]}
                          alt={service.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <Image
                          src="/images/logo.png"
                          alt={service.name}
                          fill
                          className="object-contain p-20 opacity-[0.06] group-hover:scale-105 transition-transform duration-700"
                        />
                      )}
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
                    {SERVICE_IMAGES[service.slug] ? (
                      <Image
                        src={SERVICE_IMAGES[service.slug]}
                        alt={service.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <Image
                        src="/images/logo.png"
                        alt={service.name}
                        fill
                        className="object-contain p-12 opacity-[0.04] group-hover:scale-105 transition-transform duration-700"
                      />
                    )}
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
