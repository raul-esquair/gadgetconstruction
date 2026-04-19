"use client";

import Link from "next/link";
import { ArrowRight, Building2, Users, DollarSign, FileCheck } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { SERVICES } from "@/lib/constants";
import type { CityData } from "@/lib/types";

interface CityIntroProps {
  city: CityData;
}

export function CityIntro({ city }: CityIntroProps) {
  return (
    <SectionWrapper>
      <Container narrow>
        <AnimateOnScroll>
          <div className="space-y-5 text-secondary text-lg leading-relaxed">
            {city.intro.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </AnimateOnScroll>

        {/* City stats strip */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Users, label: "Population", value: city.population },
            { icon: DollarSign, label: "Median Home Value", value: city.medianHomeValue },
            { icon: FileCheck, label: "Permits", value: city.permitAuthority },
            { icon: Building2, label: "Housing", value: city.housingStock.split(".")[0] },
          ].map((stat, index) => (
            <RevealOnScroll key={index} animation="fade-up">
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-center">
                <stat.icon size={20} className="text-accent-orange mx-auto mb-2" />
                <p className="text-xs font-heading font-semibold text-accent-orange uppercase tracking-wider mb-1">
                  {stat.label}
                </p>
                <p className="text-sm font-medium text-primary leading-tight">
                  {stat.value}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}

interface CityInsightProps {
  city: CityData;
}

export function CityInsight({ city }: CityInsightProps) {
  return (
    <SectionWrapper background="dark">
      <Container narrow>
        <AnimateOnScroll>
          <p className="text-sm font-heading font-semibold text-accent-orange uppercase tracking-wider mb-3">
            Local Insight
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold font-heading mb-4" style={{ color: "#ffffff" }}>
            {city.constructionInsight.heading}
          </h2>
          <p className="text-white/70 text-lg leading-relaxed">
            {city.constructionInsight.description}
          </p>
        </AnimateOnScroll>
      </Container>
    </SectionWrapper>
  );
}

interface CityServicesProps {
  city: CityData;
}

interface CityExteriorRepairsContextProps {
  city: CityData;
}

export function CityExteriorRepairsContext({
  city,
}: CityExteriorRepairsContextProps) {
  if (!city.exteriorRepairsContext) return null;

  const linkText =
    city.serviceAnchors?.["exterior-repairs"] ?? "See our exterior repair services";

  return (
    <SectionWrapper background="light">
      <Container narrow>
        <AnimateOnScroll>
          <p className="text-sm font-heading font-semibold text-accent-orange uppercase tracking-wider mb-3">
            Exterior Repairs in {city.name}
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-primary mb-5">
            What {city.name}&apos;s Weather Does to Your Home
          </h2>
          <p className="text-lg text-secondary leading-relaxed mb-6">
            {city.exteriorRepairsContext}
          </p>
          <Link
            href="/services/exterior-repairs"
            className="inline-flex items-center gap-2 text-base font-semibold text-accent-orange hover:text-accent-orange-dark transition-colors font-heading group"
          >
            {linkText}
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </AnimateOnScroll>
      </Container>
    </SectionWrapper>
  );
}

export function CityServices({ city }: CityServicesProps) {
  const relevantServices = city.topServices
    .map((slug) => SERVICES.find((s) => s.slug === slug))
    .filter(Boolean);

  return (
    <SectionWrapper>
      <Container>
        <AnimateOnScroll className="text-center mb-10">
          <p className="text-sm font-heading font-semibold text-accent-orange uppercase tracking-wider mb-3">
            Our Services in {city.name}
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold font-heading">
            What We Build in {city.name}
          </h2>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {relevantServices.map((service) => {
            const anchorText =
              city.serviceAnchors?.[service!.slug] ?? service!.name;
            return (
              <RevealOnScroll key={service!.slug} animation="fade-up">
                <Link
                  href={`/services/${service!.slug}`}
                  className="group flex items-start gap-4 p-5 rounded-xl border border-neutral-200 bg-white hover:border-accent-orange/30 hover:shadow-card-hover transition-all duration-300"
                >
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-primary text-sm mb-1 group-hover:text-accent-orange transition-colors">
                      {anchorText}
                    </h3>
                    <p className="text-xs text-secondary leading-relaxed">
                      {service!.shortDescription}
                    </p>
                  </div>
                  <ArrowRight size={16} className="text-neutral-300 group-hover:text-accent-orange shrink-0 mt-0.5 transition-colors" />
                </Link>
              </RevealOnScroll>
            );
          })}
        </div>
      </Container>
    </SectionWrapper>
  );
}
