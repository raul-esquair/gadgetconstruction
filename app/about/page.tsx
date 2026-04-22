import type { Metadata } from "next";
import * as LucideIcons from "lucide-react";
import { ExternalLink } from "lucide-react";
import { generatePageMetadata } from "@/lib/metadata";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import { VALUES, CREDENTIALS } from "@/lib/about-data";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import PageHeader from "@/components/sections/PageHeader";
import Button from "@/components/ui/Button";
import StatsSection from "@/components/sections/StatsSection";
import CTABlock from "@/components/sections/CTABlock";
import FounderStory from "@/components/sections/FounderStory";
import BBBSeal from "@/components/ui/BBBSeal";

export const metadata: Metadata = generatePageMetadata({
  title: "About Gadget Construction | San Francisco General Contractor Since 2014",
  description:
    "Meet the team behind 500+ San Francisco construction projects. 12+ years of experience, licensed & insured, 5-year workmanship warranty. Learn our story.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="The People Behind Your Project"
        subtitle="12 years. 500+ projects. One standard: yours."
      />

      <div className="bg-white border-b border-neutral-200">
        <Container>
          <Breadcrumbs items={[{ label: "About", href: "/about" }]} />
        </Container>
      </div>

      <FounderStory />

      {/* Values */}
      <SectionWrapper background="light">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading">
              How We Work
            </h2>
            <div className="mt-3 mx-auto w-16 h-1 bg-accent-orange rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {VALUES.map((value, index) => {
              const Icon = LucideIcons[value.icon as keyof typeof LucideIcons] as React.ComponentType<{
                size?: number;
                className?: string;
              }>;
              return (
                <div
                  key={index}
                  className="p-6 md:p-8 bg-white rounded-xl border border-neutral-200 shadow-card"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-accent-orange/10 flex items-center justify-center shrink-0">
                      {Icon && (
                        <Icon size={20} className="text-accent-orange" />
                      )}
                    </div>
                    <h3 className="font-heading font-bold text-lg text-primary">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-secondary text-sm leading-relaxed pl-[52px]">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </SectionWrapper>

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Stats */}
      <StatsSection />

      {/* Credentials */}
      <SectionWrapper>
        <Container narrow>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading">
              Licensed. Bonded. Insured.
            </h2>
            <div className="mt-3 mx-auto w-16 h-1 bg-accent-orange rounded-full" />
          </div>

          <div className="flex justify-center mb-10">
            <BBBSeal size="lg" />
          </div>

          <div className="space-y-4">
            {CREDENTIALS.map((credential, index) => (
              <div
                key={index}
                className="p-5 rounded-xl border border-neutral-200 bg-neutral-50"
              >
                <p className="text-sm font-heading font-semibold text-accent-orange mb-1">
                  {credential.label}
                </p>
                <p className="text-secondary text-sm leading-relaxed">
                  {credential.value}
                  {credential.href && (
                    <>
                      {" "}
                      <a
                        href={credential.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-accent-orange hover:underline"
                      >
                        Verify our license
                        <ExternalLink size={12} />
                      </a>
                    </>
                  )}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      <CTABlock
        heading="See What We Can Build for You"
        subtext="Ready to start a conversation about your project? We're here when you are — no pressure, no obligation."
      />
    </>
  );
}
