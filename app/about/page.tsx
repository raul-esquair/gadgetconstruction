import type { Metadata } from "next";
import Image from "next/image";
import * as LucideIcons from "lucide-react";
import { ExternalLink } from "lucide-react";
import { generatePageMetadata } from "@/lib/metadata";
import { FOUNDER_STORY, VALUES, CREDENTIALS } from "@/lib/about-data";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import Button from "@/components/ui/Button";
import StatsSection from "@/components/sections/StatsSection";
import CTABlock from "@/components/sections/CTABlock";

export const metadata: Metadata = generatePageMetadata({
  title: "About Gadget Construction | San Francisco General Contractor Since 2014",
  description:
    "Meet the team behind 500+ San Francisco construction projects. 12+ years of experience, licensed & insured, 5-year workmanship warranty. Learn our story.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <SectionWrapper background="dark" className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white leading-tight">
              The People Behind Your Project
            </h1>
            <p className="mt-4 text-xl text-white/70">
              12 years. 500+ projects. One standard: yours.
            </p>
          </div>
        </Container>
      </SectionWrapper>

      <div className="bg-white border-b border-neutral-200">
        <Container>
          <Breadcrumbs items={[{ label: "About", href: "/about" }]} />
        </Container>
      </div>

      {/* Founder Story */}
      <SectionWrapper>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Photo placeholder */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 order-2 lg:order-1">
              <Image
                src="/images/logo.png"
                alt="Gadget Construction team on a job site"
                fill
                className="object-contain p-16 opacity-15"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm text-neutral-400 font-heading font-medium">
                  Founder / Team Photo
                </p>
              </div>
            </div>

            {/* Story */}
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-extrabold font-heading mb-8">
                {FOUNDER_STORY.heading}
              </h2>
              <div className="space-y-4 text-secondary leading-relaxed">
                {FOUNDER_STORY.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </SectionWrapper>

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

      {/* Mid-page CTA */}
      <div className="bg-white py-8">
        <Container>
          <div className="text-center">
            <p className="text-secondary mb-4 text-lg">
              Want to see these values in action?
            </p>
            <Button href="/contact" size="lg">
              Get Your Free Estimate
            </Button>
          </div>
        </Container>
      </div>

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
