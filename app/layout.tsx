import type { Metadata, Viewport } from "next";
import { Montserrat, Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomBar from "@/components/layout/MobileBottomBar";
import { EstimateModalProvider } from "@/components/ui/EstimateModal";
import JsonLd, { localBusinessSchema } from "@/components/seo/JsonLd";
import { COMPANY } from "@/lib/constants";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.url),
  title: {
    default: `${COMPANY.shortName} | San Francisco General Contractor | Licensed & Insured`,
    template: `%s | ${COMPANY.shortName}`,
  },
  description: `San Francisco's trusted general contractor for 12+ years. Concrete foundations, remodels, decks, roofing & ADUs. 500+ projects completed. Free estimates. CA Lic #${COMPANY.license}.`,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: COMPANY.name,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: `if("scrollRestoration"in history)history.scrollRestoration="manual";window.scrollTo(0,0);` }} />
        <script
          type="text/javascript"
          id="sa-dynamic-optimization"
          src="data:text/javascript;base64,dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoInNjcmlwdCIpO3NjcmlwdC5zZXRBdHRyaWJ1dGUoIm5vd3Byb2NrZXQiLCAiIik7c2NyaXB0LnNldEF0dHJpYnV0ZSgibml0cm8tZXhjbHVkZSIsICIiKTtzY3JpcHQuc3JjID0gImh0dHBzOi8vZGFzaGJvYXJkLnNlYXJjaGF0bGFzLmNvbS9zY3JpcHRzL2R5bmFtaWNfb3B0aW1pemF0aW9uLmpzIjtzY3JpcHQuZGF0YXNldC51dWlkID0gIjlkNGI0MWU4LThkMzktNGExYy04NmM2LWQ0NGJhOWU5OWIzYyI7c2NyaXB0LmlkID0gInNhLWR5bmFtaWMtb3B0aW1pemF0aW9uLWxvYWRlciI7ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpOw=="
          data-uuid="9d4b41e8-8d39-4a1c-86c6-d44ba9e99b3c"
          {...({ nowprocket: "", "nitro-exclude": "" } as Record<string, string>)}
        />
        <EstimateModalProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent-orange focus:text-white focus:rounded-lg focus:font-heading focus:font-semibold focus:text-sm"
          >
            Skip to main content
          </a>
          <JsonLd data={localBusinessSchema()} />
          <Header />
          <main id="main-content" className="flex-1 pt-20 md:pt-24 overflow-x-clip">{children}</main>
          <Footer />
          <MobileBottomBar />
          {/* Bottom padding on mobile to account for sticky bottom bar */}
          <div className="h-16 md:hidden" aria-hidden="true" />
        </EstimateModalProvider>
      </body>
    </html>
  );
}
