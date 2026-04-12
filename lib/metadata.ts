import type { Metadata } from "next";
import { COMPANY } from "./constants";

interface PageMetadataOptions {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  publishedTime?: string;
}

export function generatePageMetadata({
  title,
  description,
  path = "",
  ogImage = "https://gadgetconstructionsf.com/opengraph-image",
  ogType = "website",
  publishedTime,
}: PageMetadataOptions): Metadata {
  const url = `${COMPANY.url}${path}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: COMPANY.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${COMPANY.shortName} — ${COMPANY.tagline}`,
        },
      ],
      locale: "en_US",
      type: ogType,
      ...(publishedTime && { publishedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}
