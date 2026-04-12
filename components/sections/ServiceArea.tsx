import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const COUNTY_HIGHLIGHTS = [
  "San Francisco",
  "Marin",
  "San Mateo",
  "Santa Clara",
  "Alameda",
  "Contra Costa",
];

interface ServiceAreaProps {
  showCTA?: boolean;
}

export default function ServiceArea({ showCTA = true }: ServiceAreaProps) {
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
            From Marin to San Jose — 6 counties, one standard. We know the
            terrain, the building codes, and the permit process in every city we serve.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {COUNTY_HIGHLIGHTS.map((county) => (
              <span
                key={county}
                className="px-3 py-1.5 rounded-full bg-neutral-100 text-xs font-medium text-secondary"
              >
                {county} County
              </span>
            ))}
          </div>

          {showCTA && (
            <div className="mt-8">
              <Link
                href="/service-areas"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-heading font-semibold text-base hover:bg-neutral-700 transition-colors"
              >
                View All Service Areas
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </AnimateOnScroll>
      </Container>
    </SectionWrapper>
  );
}
