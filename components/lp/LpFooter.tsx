import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, ShieldCheck } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import Container from "@/components/ui/Container";

export default function LpFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <Container className="py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/logo-white.png"
                alt={`${COMPANY.shortName} logo`}
                width={180}
                height={56}
                sizes="150px"
                className="h-12"
                style={{ width: "auto" }}
              />
            </Link>
            <p className="text-neutral-300 text-sm leading-relaxed max-w-xs">
              The Bay Area&apos;s trusted general contractor — serving {31} cities across Marin, San Francisco, Alameda, Contra Costa, San Mateo & Santa Clara counties.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-white/50">Contact</h3>
            <div className="space-y-3">
              <a
                href={COMPANY.phoneHref}
                className="flex items-center gap-2.5 text-base font-semibold hover:text-accent-orange transition-colors"
              >
                <Phone size={18} className="text-accent-orange shrink-0" />
                {COMPANY.phone}
              </a>
              <div className="flex items-start gap-2.5 text-sm text-neutral-300">
                <MapPin size={16} className="shrink-0 mt-0.5" />
                <span>{COMPANY.serviceArea}</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-neutral-300">
                <ShieldCheck size={16} className="shrink-0 mt-0.5" />
                <span>CA License #{COMPANY.license} · Bonded & Insured</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-white/50">Our Promise</h3>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>— Free on-site inspection</li>
              <li>— Fixed-price written estimate</li>
              <li>— Full permit handling</li>
              <li>— {COMPANY.warranty}</li>
              <li>— We respond in minutes</li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-neutral-400">
            <p>&copy; {currentYear} {COMPANY.name} All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/" className="hover:text-white transition-colors">Main Site</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
