import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { SERVICES } from "@/lib/constants";
import { SERVICE_PAGES } from "@/lib/services-data";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd, { serviceSchema } from "@/components/seo/JsonLd";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import {
  ServiceIntro,
  ServiceScope,
  ServiceDifferentiators,
  ServiceGallery,
} from "@/components/sections/ServicePageContent";
import PricingSection from "@/components/sections/PricingSection";
import { SERVICE_PRICING } from "@/lib/pricing-data";
import ProcessSteps from "@/components/sections/ProcessSteps";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import CTABlock from "@/components/sections/CTABlock";

const service = SERVICES.find((s) => s.slug === "retaining-walls")!;
const data = SERVICE_PAGES["retaining-walls"];

export const metadata: Metadata = generatePageMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: `/services/${service.slug}`,
});

export default function RetainingWallsPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema(service.name, service.metaDescription, "$5,000–$80,000+")}
      />
      <Hero
        headline={data.hero.headline}
        subheadline={data.hero.subheadline}
        ctaText={data.hero.ctaText}
        openModal
        compact
      />
      <TrustBar />
      <div className="bg-white border-b border-neutral-200">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Services", href: "/services" },
              { label: service.name, href: `/services/${service.slug}` },
            ]}
          />
        </Container>
      </div>
      <ServiceIntro data={data.intro} />
      <ServiceScope data={data.scope} />
      <PricingSection items={SERVICE_PRICING["retaining-walls"]} heading="Retaining Wall Costs in San Francisco" />
      <ProcessSteps steps={data.process} heading="Our Retaining Wall Process" />
      <ServiceDifferentiators differentiators={data.differentiators} />
      <ServiceGallery serviceName="Retaining Wall" />
      <TestimonialsSection heading="What Our Clients Say" />
      <FAQSection faqs={data.faqs} background="light" />
      <CTABlock
        heading="Need a Wall That Won't Quit?"
        subtext="Get a free site evaluation. We'll assess your slope, soil, and drainage — and design a retaining wall engineered for your specific lot."
      />
    </>
  );
}
