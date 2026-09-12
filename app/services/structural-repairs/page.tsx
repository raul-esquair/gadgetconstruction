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
import { HEADER_REPLACEMENT } from "@/lib/gallery-data";
import ProcessSteps from "@/components/sections/ProcessSteps";

import FAQSection from "@/components/sections/FAQSection";
import CTABlock from "@/components/sections/CTABlock";
import ServiceGuides from "@/components/sections/ServiceGuides";

const service = SERVICES.find((s) => s.slug === "structural-repairs")!;
const data = SERVICE_PAGES["structural-repairs"];

// 4.3s loop, end crossfaded into the start so it has no seam. The poster
// (structural-repairs-hero.jpg) is its first frame. AV1 first for Chrome and
// Firefox; Safari without AV1 hardware falls through to the H.264 file.
const HERO_VIDEO = [
  { src: "/videos/structural-repairs-hero-1920.webm", type: 'video/webm; codecs="av01.0.08M.08"', media: "(min-width: 1024px)" },
  { src: "/videos/structural-repairs-hero-1920.mp4", type: "video/mp4", media: "(min-width: 1024px)" },
  { src: "/videos/structural-repairs-hero-1280.webm", type: 'video/webm; codecs="av01.0.05M.08"' },
  { src: "/videos/structural-repairs-hero-1280.mp4", type: "video/mp4" },
];

export const metadata: Metadata = generatePageMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: `/services/${service.slug}`,
});

export default function StructuralRepairsPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema(service.name, service.metaDescription, "$500–$75,000+")}
      />
      <Hero
        headline={data.hero.headline}
        subheadline={data.hero.subheadline}
        ctaText={data.hero.ctaText}
        backgroundImage="/images/structural-repairs-hero.jpg"
        backgroundVideo={HERO_VIDEO}
        imageAlt="Gadget crew member pulling rotted sheathing off a wall to expose the framing behind it"
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
      <PricingSection items={SERVICE_PRICING["structural-repairs"]} heading="Structural Repair Costs in the Bay Area" />
      <ProcessSteps steps={data.process} heading="Our Structural Repair Process" />
      <ServiceDifferentiators differentiators={data.differentiators} />
      <ServiceGallery
        serviceName="Structural Repair"
        categorySlug="structural-repairs"
        beforeAfter={HEADER_REPLACEMENT}
      />

      <ServiceGuides
        serviceSlug="structural-repairs"
        heading="Structural Repair Guides"
        eyebrow="Before you open a wall"
      />

      <FAQSection faqs={data.faqs} background="light" />
      <CTABlock
        heading="Floors Sagging? Pest Report Came Back Bad?"
        subtext="We'll get under the house, find what's actually carrying the load, and give you a fixed-price written estimate. We respond in minutes, not days."
      />
    </>
  );
}
