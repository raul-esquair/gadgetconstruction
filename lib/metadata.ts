import type { Metadata } from "next";
import { COMPANY } from "./constants";

interface PageMetadataOptions {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  publishedTime?: string;
  noindex?: boolean;
  /**
   * Bypass the root layout's `%s | Gadget Construction Inc.` template so the
   * whole ~60-char SERP budget belongs to `title`. Only set this when `title`
   * is already written as a standalone SERP title.
   */
  titleAbsolute?: boolean;
}

export function generatePageMetadata({
  title,
  description,
  path = "",
  ogImage = "https://gadgetconstructionsf.com/opengraph-image",
  ogType = "website",
  publishedTime,
  noindex = false,
  titleAbsolute = false,
}: PageMetadataOptions): Metadata {
  const url = `${COMPANY.url}${path}`;

  return {
    // Only the <title> needs the {absolute} wrapper; the layout's title
    // template does not apply to OG/Twitter, so those take the plain string.
    // They receive the same (short) title, which suits social cards fine —
    // they truncate around the same length the SERP does.
    title: titleAbsolute ? { absolute: title } : title,
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
    ...(noindex && {
      robots: {
        index: false,
        follow: true,
      },
    }),
  };
}
