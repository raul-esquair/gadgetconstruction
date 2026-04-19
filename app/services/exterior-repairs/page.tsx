import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { SERVICES, COMPANY } from "@/lib/constants";
import { SERVICE_PAGES } from "@/lib/services-data";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd, {
  multiServiceGraphSchema,
  faqSchema,
} from "@/components/seo/JsonLd";
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
import FAQSection from "@/components/sections/FAQSection";
import CTABlock from "@/components/sections/CTABlock";

const service = SERVICES.find((s) => s.slug === "exterior-repairs")!;
const data = SERVICE_PAGES["exterior-repairs"];

export const metadata: Metadata = generatePageMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: `/services/${service.slug}`,
});

const pageUrl = `${COMPANY.url}/services/${service.slug}`;

export default function ExteriorRepairsPage() {
  return (
    <>
      <JsonLd
        data={multiServiceGraphSchema({
          pageUrl,
          services: [
            {
              id: "dry-rot-repair",
              name: "Dry Rot Repair",
              serviceType: "Dry Rot Repair",
              description:
                "Dry rot removal and framing replacement for Bay Area homes — window sills, fascia, trim, sheathing, and sister-framing. Licensed Class B contractor, 5-year warranty.",
              priceRange: "$800–$12,000",
            },
            {
              id: "stucco-repair",
              name: "Stucco Repair & Re-Stucco",
              serviceType: "Stucco Repair",
              description:
                "Stucco crack patching, color-coat matching, elevation re-coats, and full three-coat re-stucco across the San Francisco Bay Area. Permits handled.",
              priceRange: "$400–$35,000",
            },
            {
              id: "siding-installation",
              name: "Siding Installation & Replacement",
              serviceType: "Siding Installation",
              description:
                "Hardie board (fiber cement), wood, cedar, and composite siding installation and replacement for Bay Area homes. Full removal, flashing, and finish.",
              priceRange: "$10–$22/sq ft installed",
            },
          ],
        })}
      />
      <JsonLd data={faqSchema(data.faqs)} />
      <Hero
        headline={data.hero.headline}
        subheadline={data.hero.subheadline}
        ctaText={data.hero.ctaText}
        backgroundImage="/images/why-choose-us-bg.jpg"
        imageAlt="Finished residential exterior in the San Francisco Bay Area after dry rot repair and siding work by Gadget Construction"
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
      <PricingSection
        items={SERVICE_PRICING["exterior-repairs"]}
        heading="Exterior Repair Costs in the Bay Area"
      />
      <ProcessSteps steps={data.process} heading="Our Exterior Repair Process" />
      <ServiceDifferentiators differentiators={data.differentiators} />
      <ServiceGallery
        serviceName="Exterior Repair"
        categorySlug="exterior-repairs"
      />
      <FAQSection faqs={data.faqs} background="light" />
      <CTABlock
        heading="Water Damage Doesn't Wait. Neither Should You."
        subtext="Free exterior inspection, honest written report, fixed-price estimate. We respond in minutes — not days."
      />
    </>
  );
}
