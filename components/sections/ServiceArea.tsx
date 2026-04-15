"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { MapPin, ArrowRight, ChevronDown } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { getCitiesByCounty } from "@/lib/service-areas-data";

const COUNTIES = [
  { name: "Marin", full: "Marin County", color: "bg-emerald-600" },
  { name: "San Francisco", full: "San Francisco County", color: "bg-accent-orange" },
  { name: "Contra Costa", full: "Contra Costa County", color: "bg-sky-600" },
  { name: "Alameda", full: "Alameda County", color: "bg-violet-600" },
  { name: "San Mateo", full: "San Mateo County", color: "bg-amber-600" },
  { name: "Santa Clara", full: "Santa Clara County", color: "bg-rose-600" },
];

const citiesByCounty = getCitiesByCounty();

interface ServiceAreaProps {
  showCTA?: boolean;
}

export default function ServiceArea({ showCTA = true }: ServiceAreaProps) {
  const [activeCounty, setActiveCounty] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleCountyClick = (countyFull: string) => {
    setActiveCounty((prev) => (prev === countyFull ? null : countyFull));
  };

  // Scroll panel into view when opened
  useEffect(() => {
    if (activeCounty && panelRef.current) {
      const timer = setTimeout(() => {
        panelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [activeCounty]);

  const activeCities = activeCounty ? citiesByCounty[activeCounty] || [] : [];
  const activeColor = COUNTIES.find((c) => c.full === activeCounty)?.color || "bg-accent-orange";

  return (
    <SectionWrapper>
      <Container>
        <AnimateOnScroll className="text-center max-w-2xl mx-auto">
          <div className="w-14 h-14 rounded-full bg-accent-orange/10 flex items-center justify-center mx-auto mb-5">
            <MapPin size={28} className="text-accent-orange" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading">
            Serving 31 Cities Across the Bay Area
          </h2>
          <p className="mt-4 text-secondary text-lg leading-relaxed">
            From Marin to San Jose — 6 counties, one standard. Click a county to
            explore the cities we serve.
          </p>
        </AnimateOnScroll>

        {/* County Badges — Clickable */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          {COUNTIES.map((county) => {
            const isActive = activeCounty === county.full;
            return (
              <button
                key={county.full}
                onClick={() => handleCountyClick(county.full)}
                className={`
                  group relative px-4 py-2 rounded-full text-sm font-semibold font-heading
                  transition-all duration-300 cursor-pointer select-none
                  ${
                    isActive
                      ? `${county.color} text-white shadow-lg scale-105`
                      : "bg-neutral-100 text-secondary hover:bg-neutral-200 hover:scale-[1.02]"
                  }
                `}
              >
                <span className="flex items-center gap-1.5">
                  {county.name} County
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}
                  />
                </span>

                {/* Active indicator dot */}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </button>
            );
          })}
        </div>

        {/* Expandable County Panel */}
        <div
          ref={panelRef}
          className={`
            mt-6 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${activeCounty ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          {activeCounty && (
            <div className="rounded-2xl border border-neutral-200 bg-white shadow-lg p-6 md:p-8">
              {/* County header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-3 h-3 rounded-full ${activeColor}`} />
                <h3 className="text-xl font-bold font-heading text-primary">
                  {activeCounty}
                </h3>
                <span className="text-sm text-neutral-400 font-medium">
                  {activeCities.length} {activeCities.length === 1 ? "city" : "cities"} served
                </span>
              </div>

              {/* City Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {activeCities.map((city, index) => (
                  <Link
                    key={city.slug}
                    href={`/service-areas/${city.slug}`}
                    className="group flex items-center gap-2.5 p-3 rounded-xl bg-neutral-50 hover:bg-accent-orange/5 border border-transparent hover:border-accent-orange/20 transition-all duration-200"
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: "fade-in-up 400ms ease-out both",
                    }}
                  >
                    <MapPin size={14} className="text-accent-orange shrink-0" />
                    <span className="text-sm font-medium text-primary group-hover:text-accent-orange transition-colors">
                      {city.name}
                    </span>
                    <ArrowRight
                      size={12}
                      className="ml-auto text-neutral-300 group-hover:text-accent-orange group-hover:translate-x-0.5 transition-all shrink-0"
                    />
                  </Link>
                ))}
              </div>

              {/* County CTA */}
              <div className="mt-6 pt-5 border-t border-neutral-100 text-center">
                <Link
                  href="/service-areas"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-accent-orange hover:text-accent-orange-dark transition-colors font-heading"
                >
                  View all 31 cities
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {showCTA && !activeCounty && (
          <div className="mt-8 text-center">
            <Link
              href="/service-areas"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-heading font-semibold text-base hover:bg-neutral-700 transition-colors"
            >
              View All Service Areas
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </Container>
    </SectionWrapper>
  );
}
