import type { Metadata } from "next";
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
        <EstimateModalProvider>
          <JsonLd data={localBusinessSchema()} />
          <Header />
          <main className="flex-1 pt-20 md:pt-24">{children}</main>
          <Footer />
          <MobileBottomBar />
          {/* Bottom padding on mobile to account for sticky bottom bar */}
          <div className="h-16 md:hidden" aria-hidden="true" />
        </EstimateModalProvider>
      </body>
    </html>
  );
}
