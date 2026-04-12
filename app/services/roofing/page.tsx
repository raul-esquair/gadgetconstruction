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

const service = SERVICES.find((s) => s.slug === "roofing")!;
const data = SERVICE_PAGES["roofing"];

export const metadata: Metadata = generatePageMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: `/services/${service.slug}`,
});

export default function RoofingPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema(service.name, service.metaDescription, "$1,500–$35,000")}
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
      <PricingSection items={SERVICE_PRICING["roofing"]} heading="Roofing Costs in San Francisco" />
      <ProcessSteps steps={data.process} heading="Our Roofing Process" />
      <ServiceDifferentiators differentiators={data.differentiators} />
      <ServiceGallery serviceName="Roofing" />
      <TestimonialsSection heading="What Our Roofing Clients Say" />
      <FAQSection faqs={data.faqs} background="light" />
      <CTABlock
        heading="Need a Roof You Can Count On?"
        subtext="Get a free roof inspection and honest assessment. We'll tell you what needs fixing, what can wait, and what it will cost — no scare tactics."
      />
    </>
  );
}
