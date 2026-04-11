"use client";

import Image from "next/image";
import * as LucideIcons from "lucide-react";
import { CheckCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import type { ServicePageData } from "@/lib/services-data";

interface ServiceIntroProps {
  data: ServicePageData["intro"];
}

export function ServiceIntro({ data }: ServiceIntroProps) {
  return (
    <SectionWrapper>
      <Container narrow>
        <h2 className="text-3xl md:text-4xl font-extrabold font-heading mb-8">
          {data.heading}
        </h2>
        <div className="space-y-5 text-secondary text-lg leading-relaxed">
          {data.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}

interface ServiceScopeProps {
  data: ServicePageData["scope"];
}

export function ServiceScope({ data }: ServiceScopeProps) {
  return (
    <SectionWrapper background="light">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading">
            {data.heading}
          </h2>
          <div className="mt-3 mx-auto w-16 h-1 bg-accent-orange rounded-full" />
          <p className="mt-4 text-secondary text-lg max-w-2xl mx-auto">
            {data.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.items.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl border border-neutral-200 shadow-card"
            >
              <div className="flex items-start gap-3 mb-3">
                <CheckCircle
                  size={22}
                  className="text-accent-orange shrink-0 mt-0.5"
                />
                <h3 className="font-heading font-bold text-primary text-lg">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm text-secondary leading-relaxed pl-[34px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}

interface ServiceDifferentiatorsProps {
  differentiators: ServicePageData["differentiators"];
}

export function ServiceDifferentiators({ differentiators }: ServiceDifferentiatorsProps) {
  return (
    <SectionWrapper background="dark">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading" style={{ color: "#ffffff" }}>
            Why Choose Gadget Construction
          </h2>
          <div className="mt-3 mx-auto w-16 h-1 bg-accent-orange rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {differentiators.map((item, index) => {
            const Icon = LucideIcons[item.icon as keyof typeof LucideIcons] as React.ComponentType<{
              size?: number;
              className?: string;
            }>;
            return (
              <div
                key={index}
                className="p-6 rounded-xl border border-white/10 bg-white/5"
              >
                <div className="w-10 h-10 rounded-lg bg-accent-orange/20 flex items-center justify-center mb-4">
                  {Icon && <Icon size={20} className="text-accent-orange" />}
                </div>
                <h3 className="text-lg font-bold font-heading mb-2" style={{ color: "#ffffff" }}>
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </SectionWrapper>
  );
}

interface ServiceGalleryProps {
  serviceName: string;
}

export function ServiceGallery({ serviceName }: ServiceGalleryProps) {
  return (
    <SectionWrapper>
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading">
            Our {serviceName} Projects
          </h2>
          <div className="mt-3 mx-auto w-16 h-1 bg-accent-orange rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100"
            >
              <Image
                src="/images/logo.png"
                alt={`${serviceName} project ${i}`}
                fill
                className="object-contain p-16 opacity-10"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm text-neutral-400 font-heading font-medium">
                  Project Photo {i}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button href="/contact" variant="outline">
            See More of Our Work
          </Button>
        </div>
      </Container>
    </SectionWrapper>
  );
}
