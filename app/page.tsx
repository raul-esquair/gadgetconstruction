import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import ServicesGrid from "@/components/sections/ServicesGrid";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import DifferentiationSection from "@/components/sections/DifferentiationSection";
import ProcessSteps from "@/components/sections/ProcessSteps";
import GallerySection from "@/components/sections/GallerySection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ServiceArea from "@/components/sections/ServiceArea";
import CTABlock from "@/components/sections/CTABlock";

export default function HomePage() {
  return (
    <>
      <Hero
        headline="Get Rid of Contractor Nightmares Once and For All"
        subheadline="500+ San Francisco projects. Fixed-price contracts. Full permit handling. A 5-year warranty. And a crew that responds in minutes, not days."
        backgroundImage="/images/hero-bg.jpg"
        urgencyText="Limited availability — currently booking for Summer 2026"
        openModal
        showTrustPills
        showScrollIndicator
      />
      <TrustBar />
      <ServicesGrid />
      <WhyChooseUs />
      <DifferentiationSection />
      <ProcessSteps />
      <GallerySection />
      <TestimonialsSection />
      <ServiceArea />
      <CTABlock />
    </>
  );
}
