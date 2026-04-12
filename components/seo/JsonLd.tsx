interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: "Gadget Construction Inc.",
    description:
      "San Francisco's trusted general contractor for 12+ years. Concrete foundations, remodels, decks, roofing & ADU construction. 500+ projects completed.",
    telephone: "+16282333589",
    url: "https://gadgetconstruction.com",
    areaServed: [
      {
        "@type": "City",
        name: "San Francisco",
        "@id": "https://www.wikidata.org/wiki/Q62",
      },
      {
        "@type": "AdministrativeArea",
        name: "San Francisco Peninsula",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 37.7749,
      longitude: -122.4194,
    },
    priceRange: "$$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "3",
      bestRating: "5",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Construction Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Concrete Foundations & Slabs" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Retaining Walls" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Complete Home Remodeling" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Composite Decks" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Roofing" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "ADU Construction" } },
      ],
    },
    knowsAbout: [
      "Seismic retrofit",
      "SF DBI permits",
      "California Building Code",
      "Title 24 compliance",
    ],
    slogan: "Built Right. On Time. Guaranteed.",
    foundingDate: "2014",
    numberOfEmployees: { "@type": "QuantitativeValue", value: "10+" },
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function serviceSchema(
  serviceName: string,
  description: string,
  priceRange?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description,
    provider: {
      "@type": "GeneralContractor",
      name: "Gadget Construction Inc.",
      telephone: "+16282333589",
      url: "https://gadgetconstruction.com",
    },
    areaServed: {
      "@type": "City",
      name: "San Francisco",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: serviceName,
    },
    ...(priceRange && { priceRange }),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://gadgetconstruction.com${item.url}`,
    })),
  };
}

export function articleSchema(post: {
  title: string;
  description: string;
  date: string;
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "Gadget Construction Inc.",
    },
    publisher: {
      "@type": "Organization",
      name: "Gadget Construction Inc.",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://gadgetconstruction.com${post.url}`,
    },
    ...(post.image && {
      image: {
        "@type": "ImageObject",
        url: post.image,
      },
    }),
  };
}

export function howToSchema(
  steps: { title: string; description: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Start a Construction Project with Gadget Construction",
    description:
      "Our 5-step process from first call to final walkthrough. Free estimates, full permit handling, and a 5-year workmanship warranty.",
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.description,
    })),
  };
}
