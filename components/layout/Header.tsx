"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, ChevronDown } from "lucide-react";
import { COMPANY, NAV_LINKS, SERVICES } from "@/lib/constants";
import Button from "@/components/ui/Button";
import { EstimateButton } from "@/components/ui/EstimateModal";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  function openServices() {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setIsServicesOpen(true);
  }

  function closeServices() {
    closeTimerRef.current = setTimeout(() => setIsServicesOpen(false), 300);
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when menu is open to prevent background scrolling
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white shadow-header border-b border-neutral-200/50"
          : "bg-white shadow-none"
      )}
    >
      <Container>
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link href="/" className="relative shrink-0">
            <Image
              src="/images/logo.png"
              alt={`${COMPANY.shortName} logo`}
              width={798}
              height={341}
              className="w-40 md:w-56 h-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative group"
                  onMouseEnter={openServices}
                  onMouseLeave={closeServices}
                >
                  <button
                    className="flex items-center gap-1 text-sm font-medium text-secondary hover:text-accent-orange transition-colors font-heading py-4"
                    aria-expanded={isServicesOpen}
                    aria-haspopup="true"
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={cn(
                        "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        isServicesOpen && "rotate-180"
                      )}
                    />
                  </button>
                  {/* Invisible bridge — extends hover zone down to the panel */}
                  {isServicesOpen && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-[100vw] h-4" />
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-secondary hover:text-accent-orange transition-colors font-heading"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={COMPANY.phoneHref}
              className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent-orange transition-colors font-heading"
            >
              <Phone size={16} />
              {COMPANY.phone}
            </a>
            <EstimateButton size="sm">
              Get Free Estimate
            </EstimateButton>
          </div>

          {/* Mobile Menu Toggle — animated hamburger ↔ X */}
          <button
            className="lg:hidden relative w-10 h-10 flex items-center justify-center text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={cn(
                  "block h-0.5 w-6 bg-primary rounded-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center",
                  isMobileMenuOpen ? "rotate-45 translate-y-[9px]" : "rotate-0 translate-y-0"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-6 bg-primary rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  isMobileMenuOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-6 bg-primary rounded-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center",
                  isMobileMenuOpen ? "-rotate-45 -translate-y-[9px]" : "rotate-0 translate-y-0"
                )}
              />
            </div>
          </button>
        </div>
      </Container>

      {/* Desktop Services Panel — slides down seamlessly from header */}
      <div
        className={cn(
          "hidden lg:block overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] border-t border-neutral-100",
          isServicesOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
        )}
        onMouseEnter={openServices}
        onMouseLeave={closeServices}
      >
        <Container>
          <div className="flex items-center justify-center gap-8 py-4">
            {SERVICES.map((service, svcIdx) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className={cn(
                  "text-sm text-secondary hover:text-accent-orange transition-all duration-300 font-medium",
                  isServicesOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                )}
                style={{
                  transitionDelay: isServicesOpen ? `${svcIdx * 40 + 50}ms` : "0ms",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onClick={() => setIsServicesOpen(false)}
              >
                {service.name}
              </Link>
            ))}
          </div>
        </Container>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 top-20 z-30 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden absolute left-0 right-0 top-20 bg-white z-40 shadow-xl border-b border-neutral-200 rounded-b-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isMobileMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-3 overflow-hidden max-h-0 pointer-events-none",
          isMobileMenuOpen && isServicesOpen
            ? "fixed bottom-0 rounded-b-none overflow-y-auto"
            : isMobileMenuOpen
            ? "overflow-hidden"
            : ""
        )}
      >
        <nav className="flex flex-col px-6 pt-4 pb-8 space-y-1" aria-label="Mobile navigation">
          {NAV_LINKS.map((link, linkIndex) =>
            link.children ? (
              <div
                key={link.label}
                className={cn(
                  "transition-all duration-500 will-change-[opacity,transform]",
                  isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                )}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${linkIndex * 60 + 100}ms` : "0ms",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="flex items-center justify-between w-full py-3 text-lg font-semibold text-primary font-heading"
                >
                  {link.label}
                  <ChevronDown
                    size={18}
                    className={cn(
                      "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      isServicesOpen && "rotate-180"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isServicesOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="pl-6 pb-2 space-y-1">
                    {SERVICES.map((service, svcIndex) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className={cn(
                          "block py-2 text-base text-secondary hover:text-accent-orange transition-all duration-400",
                          isServicesOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                        )}
                        style={{
                          transitionDelay: isServicesOpen ? `${svcIndex * 40 + 50}ms` : "0ms",
                        }}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "block py-3 text-lg font-semibold text-primary font-heading transition-all duration-500 will-change-[opacity,transform]",
                  isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                )}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${linkIndex * 60 + 100}ms` : "0ms",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}

          <div
            className={cn(
              "pt-6 space-y-3 border-t border-neutral-200 mt-4 transition-all duration-500 will-change-[opacity,transform]",
              isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{
              transitionDelay: isMobileMenuOpen ? "400ms" : "0ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <a
              href={COMPANY.phoneHref}
              className="flex items-center justify-center gap-2 py-3 text-lg font-semibold text-primary font-heading"
            >
              <Phone size={20} />
              {COMPANY.phone}
            </a>
            <EstimateButton fullWidth size="lg">
              Get Free Estimate
            </EstimateButton>
          </div>
        </nav>
      </div>
    </header>
  );
}
