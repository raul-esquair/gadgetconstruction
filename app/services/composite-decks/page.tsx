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

const service = SERVICES.find((s) => s.slug === "composite-decks")!;
const data = SERVICE_PAGES["composite-decks"];

export const metadata: Metadata = generatePageMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: `/services/${service.slug}`,
});

export default function CompositeDecksPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema(service.name, service.metaDescription)}
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
      <PricingSection items={SERVICE_PRICING["composite-decks"]} heading="Composite Deck Costs in San Francisco" />
      <ProcessSteps steps={data.process} heading="Our Deck Building Process" />
      <ServiceDifferentiators differentiators={data.differentiators} />
      <ServiceGallery serviceName="Composite Deck" />
      <TestimonialsSection heading="What Our Deck Clients Say" />
      <FAQSection faqs={data.faqs} background="light" />
      <CTABlock
        heading="Ready for a Deck That Lasts?"
        subtext="Get a free design consultation. We'll visit your property, discuss materials and layout, and give you a fixed-price estimate — no surprises."
      />
    </>
  );
}
