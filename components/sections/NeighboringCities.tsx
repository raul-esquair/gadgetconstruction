import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import type { CityData } from "@/lib/types";

interface NeighboringCitiesProps {
  cities: CityData[];
  currentCity: string;
}

export default function NeighboringCities({ cities, currentCity }: NeighboringCitiesProps) {
  if (cities.length === 0) return null;

  return (
    <SectionWrapper background="light">
      <Container>
        <AnimateOnScroll className="text-center mb-8">
          <p className="text-sm font-heading font-semibold text-accent-orange uppercase tracking-wider mb-2">
            Also Serving
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold font-heading">
            Nearby Cities We Serve
          </h2>
        </AnimateOnScroll>

        <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/service-areas/${city.slug}`}
              className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-neutral-200 bg-white hover:border-accent-orange/30 hover:shadow-card-hover transition-all duration-300 text-sm font-medium text-secondary hover:text-accent-orange"
            >
              <MapPin size={14} className="text-accent-orange/50 group-hover:text-accent-orange transition-colors" />
              {city.name}
              <ArrowRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
            </Link>
          ))}
          <Link
            href="/service-areas"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-accent-orange hover:underline font-heading"
          >
            View All Service Areas
            <ArrowRight size={14} />
          </Link>
        </div>
      </Container>
    </SectionWrapper>
  );
}
