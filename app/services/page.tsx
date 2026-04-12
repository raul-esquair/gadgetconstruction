import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { generatePageMetadata } from "@/lib/metadata";
import { SERVICES } from "@/lib/constants";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import PageHeader from "@/components/sections/PageHeader";
import TrustBar from "@/components/sections/TrustBar";
import CTABlock from "@/components/sections/CTABlock";

export const metadata: Metadata = generatePageMetadata({
  title: "Our Services | San Francisco General Contractor",
  description:
    "Concrete foundations, retaining walls, home remodels, composite decks, roofing & ADU construction in San Francisco. Licensed, insured, 5-year warranty. Free estimates.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Construction Services for San Francisco Homeowners"
        subtitle="From foundations to full remodels — every service backed by 12+ years of experience, full permit handling, and a 5-year workmanship warranty."
      />

      <TrustBar />

      <div className="bg-white border-b border-neutral-200">
        <Container>
          <Breadcrumbs items={[{ label: "Services", href: "/services" }]} />
        </Container>
      </div>

      <SectionWrapper>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {SERVICES.map((service) => {
              const Icon = LucideIcons[service.icon as keyof typeof LucideIcons] as React.ComponentType<{
                size?: number;
                className?: string;
              }>;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group flex gap-5 p-6 md:p-8 rounded-xl border border-neutral-200 bg-white transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5 hover:border-accent-orange/30"
                >
                  <div className="w-14 h-14 rounded-xl bg-accent-orange/10 flex items-center justify-center shrink-0 group-hover:bg-accent-orange/20 transition-colors">
                    {Icon && <Icon size={28} className="text-accent-orange" />}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold font-heading text-primary mb-2 group-hover:text-accent-orange transition-colors">
                      {service.name}
                    </h2>
                    <p className="text-sm text-secondary leading-relaxed mb-3">
                      {service.shortDescription}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-orange group-hover:gap-2.5 transition-all font-heading">
                      View Service Details
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </SectionWrapper>

      <CTABlock
        heading="Not Sure Which Service You Need?"
        subtext="Tell us about your project and we'll recommend the right approach. Free consultation, no obligation."
      />
    </>
  );
}
