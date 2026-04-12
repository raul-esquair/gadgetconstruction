import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/lib/metadata";
import { SERVICE_AREAS, getCityBySlug, getNeighboringCities } from "@/lib/service-areas-data";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd, { faqSchema } from "@/components/seo/JsonLd";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import {
  CityIntro,
  CityInsight,
  CityServices,
} from "@/components/sections/CityPageContent";
import FAQSection from "@/components/sections/FAQSection";
import NeighboringCities from "@/components/sections/NeighboringCities";
import CTABlock from "@/components/sections/CTABlock";

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return SERVICE_AREAS.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};

  return generatePageMetadata({
    title: `General Contractor in ${city.name}, CA | Gadget Construction`,
    description: city.metaDescription,
    path: `/service-areas/${city.slug}`,
  });
}

export default async function CityPage({ params }: Props) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);

  if (!city) notFound();

  const neighbors = getNeighboringCities(city.neighboringCities);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "GeneralContractor",
          name: "Gadget Construction Inc.",
          description: city.metaDescription,
          telephone: "+16282333589",
          url: `https://gadgetconstructionsf.com/service-areas/${city.slug}`,
          areaServed: {
            "@type": "City",
            name: city.name,
            containedInPlace: {
              "@type": "AdministrativeArea",
              name: city.county,
            },
          },
        }}
      />
      {city.faqs.length > 0 && <JsonLd data={faqSchema(city.faqs)} />}

      <Hero
        headline={city.heroHeadline}
        subheadline={city.heroSubheadline}
        openModal
        compact
      />

      <TrustBar />

      <div className="bg-white border-b border-neutral-200">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Service Areas", href: "/service-areas" },
              { label: city.name, href: `/service-areas/${city.slug}` },
            ]}
          />
        </Container>
      </div>

      <CityIntro city={city} />
      <CityInsight city={city} />
      <CityServices city={city} />

      <FAQSection
        faqs={city.faqs}
        heading={`${city.name} Construction FAQ`}
        background="light"
      />

      <NeighboringCities cities={neighbors} currentCity={city.name} />

      <CTABlock
        heading={`Ready to Start Your ${city.name} Project?`}
        subtext={`Get a free estimate for your ${city.name} project. We respond in minutes — and we know ${city.county} construction inside out.`}
      />
    </>
  );
}
