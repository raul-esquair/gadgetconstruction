import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight, Users } from "lucide-react";
import { generatePageMetadata } from "@/lib/metadata";
import { SERVICE_AREAS, COUNTIES, getCitiesByCounty } from "@/lib/service-areas-data";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import CTABlock from "@/components/sections/CTABlock";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export const metadata: Metadata = generatePageMetadata({
  title: "Service Areas | Bay Area General Contractor",
  description:
    "Gadget Construction serves 31 cities across 6 Bay Area counties. San Francisco, Oakland, Palo Alto, Mill Valley & more. Licensed, insured, 5-year warranty.",
  path: "/service-areas",
});

export default function ServiceAreasPage() {
  const citiesByCounty = getCitiesByCounty();

  return (
    <>
      <SectionWrapper background="dark" className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight font-heading"
              style={{ color: "#ffffff" }}
            >
              31 Cities. 6 Counties. One Standard.
            </h1>
            <p className="mt-4 text-xl text-white/70">
              From Marin to San Jose, we bring the same quality, transparency,
              and 5-year warranty to every project across the Bay Area.
            </p>
          </div>
        </Container>
      </SectionWrapper>

      <div className="bg-white border-b border-neutral-200">
        <Container>
          <Breadcrumbs items={[{ label: "Service Areas", href: "/service-areas" }]} />
        </Container>
      </div>

      <SectionWrapper>
        <Container>
          <div className="space-y-16">
            {COUNTIES.map((county) => {
              const cities = citiesByCounty[county.name];
              if (!cities || cities.length === 0) return null;

              return (
                <div key={county.slug}>
                  <AnimateOnScroll>
                    <h2 className="text-2xl md:text-3xl font-extrabold font-heading mb-2">
                      {county.name}
                    </h2>
                    <p className="text-sm text-secondary mb-6">
                      {cities.length} {cities.length === 1 ? "city" : "cities"} served
                    </p>
                  </AnimateOnScroll>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cities.map((city) => (
                      <RevealOnScroll key={city.slug} animation="fade-up">
                        <Link
                          href={`/service-areas/${city.slug}`}
                          className="group flex items-start gap-4 p-5 rounded-xl border border-neutral-200 bg-white hover:border-accent-orange/30 hover:shadow-card-hover transition-all duration-300"
                        >
                          <div className="w-10 h-10 rounded-lg bg-accent-orange/10 flex items-center justify-center shrink-0 group-hover:bg-accent-orange/20 transition-colors">
                            <MapPin size={18} className="text-accent-orange" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-heading font-bold text-primary text-base group-hover:text-accent-orange transition-colors">
                              {city.name}
                            </h3>
                            <div className="flex items-center gap-3 mt-1 text-xs text-neutral-400">
                              <span className="flex items-center gap-1">
                                <Users size={10} />
                                {city.population}
                              </span>
                              <span>{city.medianHomeValue} median</span>
                            </div>
                            <span className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-accent-orange opacity-0 group-hover:opacity-100 transition-opacity font-heading">
                              View Details <ArrowRight size={10} />
                            </span>
                          </div>
                        </Link>
                      </RevealOnScroll>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </SectionWrapper>

      <CTABlock
        heading="Don't See Your City?"
        subtext="We may still serve your area. Tell us about your project and we'll let you know — no obligation."
      />
    </>
  );
}
