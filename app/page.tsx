import Hero from "@/components/sections/Hero";
import HeroEstimateForm from "@/components/sections/HeroEstimateForm";
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
import { getBookingUrgency } from "@/lib/utils";

export default function HomePage() {
  return (
    <>
      <JsonLd data={howToSchema(PROCESS_STEPS)} />
      <Hero
        // No-break space keeps the dash on the end of a line, never the start
        headline={"Bay Area Foundations, Remodels & Repairs — Without the Contractor Nightmares"}
        headlineClassName="text-[1.625rem] lg:text-[2.5rem] xl:text-5xl text-balance"
        highlights={[
          "Fixed-price contracts",
          "We handle every permit",
          "5-year workmanship warranty",
        ]}
        backgroundImage="/images/hero-foundation-crew.jpg"
        imageAlt="Gadget Construction crew tying rebar in a trenched concrete foundation footing in a Bay Area backyard"
        urgencyText={getBookingUrgency()}
        openModal
        ctaText="Get Free Quote"
        showPhone={false}
        aside={<HeroEstimateForm />}
      />
      <TrustBar />
      <ServicesGrid />
      <DifferentiationSection />
      <ProcessSteps showCTA={false} backgroundImage="/images/process-rebar-bg.jpg" />
      <GallerySection showCTA={false} />
      <TestimonialsSection />
      <ServiceArea showCTA={false} />
      <CTABlock twoStep />
    </>
  );
}
