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
} from "@/components/sections/ServicePageContent";
import BeforeAfter from "@/components/ui/BeforeAfter";
import SectionWrapper from "@/components/ui/SectionWrapper";
import PricingSection from "@/components/sections/PricingSection";
import { SERVICE_PRICING } from "@/lib/pricing-data";
import ProcessSteps from "@/components/sections/ProcessSteps";

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
        backgroundImage="/images/roofing-hero.jpg"
        imageAlt="Newly installed architectural shingle roof with ridge vents on a Bay Area residential home by Gadget Construction"
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
      <PricingSection items={SERVICE_PRICING["roofing"]} heading="Roofing Costs in the Bay Area" />
      <ProcessSteps steps={data.process} heading="Our Roofing Process" />
      <ServiceDifferentiators differentiators={data.differentiators} />
      <SectionWrapper>
        <Container>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading">
              See the Difference
            </h2>
            <p className="mt-3 text-secondary text-lg">
              Drag the slider to compare before and after our roof replacement.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <BeforeAfter
              beforeImage="/images/roofing-before.jpg"
              afterImage="/images/roofing-after.jpg"
              beforeAlt="Damaged gazebo roof before replacement by Gadget Construction in the Bay Area"
              afterAlt="Newly installed shingle roof on gazebo after replacement by Gadget Construction in the Bay Area"
              caption="Gazebo Roof Replacement — Full tear-off and re-roof with architectural shingles"
            />
          </div>
        </Container>
      </SectionWrapper>

      <FAQSection faqs={data.faqs} background="light" />
      <CTABlock
        heading="Need a Roof You Can Count On?"
        subtext="Get a free roof inspection and honest assessment. We'll tell you what needs fixing, what can wait, and what it will cost — no scare tactics."
      />
    </>
  );
}
