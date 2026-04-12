import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { CONTACT_COPY } from "@/lib/contact-data";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import PageHeader from "@/components/sections/PageHeader";
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
      <PageHeader
        title={CONTACT_COPY.heading}
        subtitle={CONTACT_COPY.subheading}
      />

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
