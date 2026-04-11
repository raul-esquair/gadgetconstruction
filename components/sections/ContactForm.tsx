"use client";

import * as LucideIcons from "lucide-react";
import { Phone, CheckCircle, Shield } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { CONTACT_COPY } from "@/lib/contact-data";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";
import MultiStepForm from "@/components/ui/MultiStepForm";

export default function ContactForm() {
  return (
    <SectionWrapper>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-10 lg:gap-16">
          {/* Left: Form (3 cols) */}
          <div className="md:col-span-3">
            <div className="p-6 md:p-8 bg-neutral-50 rounded-2xl border border-neutral-200">
              <h2 className="text-xl font-bold font-heading text-primary mb-1">
                Tell Us About Your Project
              </h2>
              <p className="text-sm text-secondary mb-6">
                Three quick steps — takes under 30 seconds.
              </p>
              <MultiStepForm variant="light" />
            </div>
          </div>

          {/* Right: Sidebar (2 cols) */}
          <div className="md:col-span-2 space-y-6 md:space-y-8">
            {/* Phone CTA */}
            <div className="p-6 bg-neutral-50 rounded-xl border border-neutral-200">
              <h3 className="font-heading font-bold text-lg text-primary mb-2">
                {CONTACT_COPY.phoneCtaHeading}
              </h3>
              <p className="text-sm text-secondary mb-4">
                {CONTACT_COPY.phoneCtaSubtext}
              </p>
              <a
                href={COMPANY.phoneHref}
                className="flex items-center gap-3 p-4 bg-white rounded-lg border border-neutral-200 hover:border-accent-orange transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-accent-orange/10 flex items-center justify-center shrink-0 group-hover:bg-accent-orange/20 transition-colors">
                  <Phone size={20} className="text-accent-orange" />
                </div>
                <div>
                  <p className="font-heading font-bold text-primary">
                    {COMPANY.phone}
                  </p>
                  <p className="text-xs text-neutral-400">Mon–Fri, 7am–6pm</p>
                </div>
              </a>
            </div>

            {/* What to Expect */}
            <div className="p-6 bg-neutral-50 rounded-xl border border-neutral-200">
              <h3 className="font-heading font-bold text-lg text-primary mb-5">
                {CONTACT_COPY.expectationsHeading}
              </h3>
              <div className="space-y-5">
                {CONTACT_COPY.expectations.map((step, index) => {
                  const Icon = LucideIcons[
                    step.icon as keyof typeof LucideIcons
                  ] as React.ComponentType<{
                    size?: number;
                    className?: string;
                  }>;
                  return (
                    <div key={index} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent-orange/10 flex items-center justify-center shrink-0 mt-0.5">
                        {Icon && (
                          <Icon size={16} className="text-accent-orange" />
                        )}
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-sm text-primary">
                          {step.title}
                        </p>
                        <p className="text-xs text-secondary leading-relaxed mt-0.5">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="p-6 bg-primary rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <Shield size={20} className="text-accent-orange" />
                <h3 className="font-heading font-bold text-sm text-white">
                  Your Project Is in Good Hands
                </h3>
              </div>
              <ul className="space-y-2">
                {CONTACT_COPY.trustItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-sm text-neutral-300"
                  >
                    <CheckCircle
                      size={14}
                      className="text-accent-orange shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
