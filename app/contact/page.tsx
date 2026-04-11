import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { CONTACT_COPY } from "@/lib/contact-data";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import ContactForm from "@/components/sections/ContactForm";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact Gadget Construction | Free Estimates in San Francisco",
  description:
    "Get a free, no-obligation estimate from Gadget Construction. Call (628) 233-3589 or fill out our form. We respond in minutes. CA Lic #1132983.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      {/* Page Header */}
      <SectionWrapper background="dark" className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white leading-tight">
              {CONTACT_COPY.heading}
            </h1>
            <p className="mt-4 text-xl text-white/70">
              {CONTACT_COPY.subheading}
            </p>
          </div>
        </Container>
      </SectionWrapper>

      <div className="bg-white border-b border-neutral-200">
        <Container>
          <Breadcrumbs
            items={[{ label: "Get a Free Estimate", href: "/contact" }]}
          />
        </Container>
      </div>

      <ContactForm />
    </>
  );
}
