import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import ServicesGrid from "@/components/sections/ServicesGrid";
import DifferentiationSection from "@/components/sections/DifferentiationSection";
import ProcessSteps from "@/components/sections/ProcessSteps";
import GallerySection from "@/components/sections/GallerySection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ServiceArea from "@/components/sections/ServiceArea";
import CTABlock from "@/components/sections/CTABlock";
import JsonLd, { howToSchema } from "@/components/seo/JsonLd";
import { PROCESS_STEPS } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      <JsonLd data={howToSchema(PROCESS_STEPS)} />
      <Hero
        headline="Get Rid of Contractor Nightmares Once and For All"
        subheadline="500+ Bay Area projects across 31 cities. Fixed-price contracts. Full permit handling. A 5-year warranty. And a crew that responds in minutes, not days."
        backgroundImage="/images/hero-bg.jpg"
        urgencyText="Limited availability — currently booking for Summer 2026"
        openModal
        showTrustPills
        showScrollIndicator
      />
      <TrustBar />
      <ServicesGrid />
      <DifferentiationSection />
      <ProcessSteps showCTA={false} />
      <GallerySection showCTA={false} />
      <TestimonialsSection />
      <ServiceArea showCTA={false} />
      <CTABlock />
    </>
  );
}
