import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin } from "lucide-react";
import { COMPANY, SERVICES } from "@/lib/constants";
import Container from "@/components/ui/Container";

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      {/* Main Footer */}
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/logo-white.png"
                alt={`${COMPANY.shortName} logo`}
                width={180}
                height={56}
                className="h-14 w-auto"
              />
            </Link>
            <p className="text-neutral-300 text-sm leading-relaxed max-w-xs">
              {COMPANY.tagline}
            </p>
            <p className="text-neutral-300 text-sm mt-3">
              The Bay Area&apos;s trusted general contractor for {currentYear - COMPANY.founded}+ years. Serving 31 cities across 6 counties.
            </p>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="font-heading font-bold text-base mb-4">Our Services</h3>
            <ul className="space-y-2.5">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-neutral-300 hover:text-accent-orange transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="font-heading font-bold text-base mb-4">Company</h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-300 hover:text-accent-orange transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="font-heading font-bold text-base mb-4">Contact Us</h3>
            <div className="space-y-3">
              <a
                href={COMPANY.phoneHref}
                className="flex items-center gap-2.5 text-sm text-neutral-300 hover:text-accent-orange transition-colors"
              >
                <Phone size={16} className="shrink-0" />
                {COMPANY.phone}
              </a>
              <div className="flex items-start gap-2.5 text-sm text-neutral-300">
                <MapPin size={16} className="shrink-0 mt-0.5" />
                <span>{COMPANY.serviceArea}</span>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <Container className="py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-neutral-400">
            <p>
              &copy; {currentYear} {COMPANY.name} All rights reserved.
            </p>
            <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
              <span>CA License #{COMPANY.license}</span>
              <span className="hidden md:inline">|</span>
              <span>Bonded &amp; Insured</span>
              <span className="hidden md:inline">|</span>
              <span>{COMPANY.warranty}</span>
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
