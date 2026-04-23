"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import Container from "@/components/ui/Container";

export default function LpHeader() {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white border-b border-neutral-200 shadow-sm">
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" aria-label={`${COMPANY.shortName} — go to home`} className="shrink-0">
            <Image
              src="/images/logo.png"
              alt={`${COMPANY.shortName} logo`}
              width={798}
              height={341}
              sizes="(max-width: 768px) 144px, 192px"
              className="w-36 md:w-48"
              style={{ height: "auto" }}
              priority
            />
          </Link>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-secondary">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Licensed & Insured
              </span>
              <span className="text-neutral-300">|</span>
              <span>CA Lic #{COMPANY.license}</span>
            </div>
            <a
              href={COMPANY.phoneHref}
              className="inline-flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-lg bg-accent-orange text-white font-heading font-semibold text-sm md:text-base hover:bg-accent-orange-dark transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Phone size={16} />
              <span className="hidden md:inline">{COMPANY.phone}</span>
              <span className="md:hidden">Call Now</span>
            </a>
          </div>
        </div>
      </Container>
    </header>
  );
}
