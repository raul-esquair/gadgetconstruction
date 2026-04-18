"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Phone, ChevronDown } from "lucide-react";
import { COMPANY, NAV_LINKS, SERVICES } from "@/lib/constants";
import Button from "@/components/ui/Button";
import { EstimateButton } from "@/components/ui/EstimateModal";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [hasHero, setHasHero] = useState(false);
  const [pastHeroCTA, setPastHeroCTA] = useState(false);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  function openServices() {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setIsServicesOpen(true);
  }

  function closeServices() {
    closeTimerRef.current = setTimeout(() => setIsServicesOpen(false), 300);
  }

  useEffect(() => {
    const heroCTA = document.querySelector("[data-hero-cta]");
    const pageHeader = document.querySelector("[data-page-header]");
    const darkTop = heroCTA || pageHeader;
    setHasHero(!!darkTop);
    setPastHeroCTA(false);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      if (darkTop) {
        const rect = darkTop.getBoundingClientRect();
        setPastHeroCTA(rect.bottom < 0);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

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

  // Transparent only on hero pages, before scroll, and when menus are closed
  const isTransparent = hasHero && !isScrolled && !isMobileMenuOpen;
  // Mobile menu style: dark when at top of hero page, white when scrolled
  const menuIsDark = hasHero && !isScrolled;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
        isMobileMenuOpen && menuIsDark
          ? "bg-primary shadow-none"
          : isMobileMenuOpen && !menuIsDark
          ? "bg-white shadow-none"
          : isTransparent
          ? "bg-transparent shadow-none"
          : "bg-white shadow-header border-b border-neutral-200/50"
      )}
    >
      <Container>
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link href="/" className="relative shrink-0">
            <Image
              src={isTransparent || (isMobileMenuOpen && menuIsDark) ? "/images/logo-white.png" : "/images/logo.png"}
              alt={`${COMPANY.shortName} logo`}
              width={798}
              height={341}
              className="w-40 md:w-56"
              style={{ height: "auto" }}
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
                    className={cn(
                      "flex items-center gap-1 text-sm font-medium transition-colors duration-500 font-heading py-4",
                      isTransparent
                        ? "text-white/90 hover:text-white"
                        : "text-secondary hover:text-accent-orange"
                    )}
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
                  className={cn(
                    "text-sm font-medium transition-colors duration-500 font-heading",
                    isTransparent
                      ? "text-white/90 hover:text-white"
                      : "text-secondary hover:text-accent-orange"
                  )}
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
              className={cn(
                "flex items-center gap-2 text-sm font-semibold transition-colors duration-500 font-heading",
                isTransparent
                  ? "text-white/90 hover:text-white"
                  : "text-primary hover:text-accent-orange"
              )}
            >
              <Phone size={16} />
              {COMPANY.phone}
            </a>
            <div
              className={cn(
                "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                hasHero && !pastHeroCTA
                  ? "opacity-0 scale-95 translate-y-1 pointer-events-none"
                  : "opacity-100 scale-100 translate-y-0"
              )}
            >
              <EstimateButton size="sm">
                Get Free Estimate
              </EstimateButton>
            </div>
          </div>

          {/* Mobile Menu Toggle — animated hamburger ↔ X */}
          <button
            className={cn(
              "lg:hidden relative w-10 h-10 flex items-center justify-center transition-colors duration-500",
              isTransparent || (isMobileMenuOpen && menuIsDark) ? "text-white" : "text-primary"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={cn(
                  "block h-0.5 w-6 rounded-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center",
                  isTransparent || (isMobileMenuOpen && menuIsDark) ? "bg-white" : "bg-primary",
                  isMobileMenuOpen ? "rotate-45 translate-y-[9px]" : "rotate-0 translate-y-0"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-6 rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  isTransparent || (isMobileMenuOpen && menuIsDark) ? "bg-white" : "bg-primary",
                  isMobileMenuOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-6 rounded-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center",
                  isTransparent || (isMobileMenuOpen && menuIsDark) ? "bg-white" : "bg-primary",
                  isMobileMenuOpen ? "-rotate-45 -translate-y-[9px]" : "rotate-0 translate-y-0"
                )}
              />
            </div>
          </button>
        </div>
      </Container>

      {/* Desktop Services Panel — megamenu with thumbnails */}
      <div
        className={cn(
          "hidden lg:block overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isTransparent
            ? "border-t border-white/10 bg-primary/40 backdrop-blur-md"
            : "border-t border-neutral-100 bg-white shadow-lg",
          isServicesOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
        onMouseEnter={openServices}
        onMouseLeave={closeServices}
      >
        <Container>
          <div className="grid grid-cols-3 gap-2 py-5">
            {SERVICES.map((service, svcIdx) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className={cn(
                  "group flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform]",
                  isTransparent
                    ? "hover:bg-white/10"
                    : "hover:bg-neutral-50",
                  isServicesOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                )}
                style={{
                  transitionDelay: isServicesOpen ? `${svcIdx * 50 + 80}ms` : "0ms",
                }}
                onClick={() => setIsServicesOpen(false)}
              >
                <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-neutral-200">
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className={cn(
                      "absolute inset-0 transition-opacity duration-300",
                      "bg-gradient-to-t from-primary/50 to-transparent",
                      "group-hover:opacity-0"
                    )}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className={cn(
                      "text-sm font-bold font-heading leading-tight transition-colors duration-200",
                      isTransparent
                        ? "text-white"
                        : "text-primary group-hover:text-accent-orange"
                    )}
                  >
                    {service.name}
                  </div>
                  <div
                    className={cn(
                      "text-xs mt-1 leading-snug line-clamp-2",
                      isTransparent ? "text-white/70" : "text-secondary"
                    )}
                  >
                    {service.shortDescription}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </div>

      {/* Mobile Menu — full-screen takeover, dark at top / white when scrolled */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 top-20 z-40 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-y-auto",
          menuIsDark ? "bg-primary" : "bg-white",
          isMobileMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-4 pointer-events-none"
        )}
      >
        {/* Red carpet accent line */}
        <div
          className={cn(
            "h-[2px] bg-accent-orange transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]",
            isMobileMenuOpen ? "w-full" : "w-0"
          )}
        />

        <nav className="flex flex-col px-8 pt-8 pb-10" aria-label="Mobile navigation">
          <div className="space-y-1">
            {NAV_LINKS.map((link, linkIndex) =>
              link.children ? (
                <div
                  key={link.label}
                  className={cn(
                    "transition-all duration-700 will-change-[opacity,transform]",
                    isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  )}
                  style={{
                    transitionDelay: isMobileMenuOpen ? `${linkIndex * 80 + 200}ms` : "0ms",
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className="flex items-center justify-between w-full py-4 text-xl font-bold tracking-wide font-heading group"
                    style={{ color: menuIsDark ? "#ffffff" : "#222222" }}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={cn(
                          "inline-block w-0 h-[2px] bg-accent-orange transition-all duration-300",
                          "group-hover:w-6 group-active:w-6"
                        )}
                      />
                      {link.label}
                    </span>
                    <ChevronDown
                      size={20}
                      className={cn(
                        "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        menuIsDark ? "text-white/40" : "text-neutral-400",
                        isServicesOpen && "rotate-180 text-accent-orange"
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      isServicesOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="pl-9 pb-3 space-y-0.5 border-l-2 border-accent-orange/20 ml-[3px]">
                      {SERVICES.map((service, svcIndex) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          className={cn(
                            "block py-2.5 text-base hover:pl-2 transition-all duration-300 font-medium",
                            menuIsDark
                              ? "text-white/60 hover:text-white"
                              : "text-secondary hover:text-accent-orange",
                            isServicesOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                          )}
                          style={{
                            transitionDelay: isServicesOpen ? `${svcIndex * 50 + 100}ms` : "0ms",
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
                    "block py-4 text-xl font-bold tracking-wide font-heading transition-all duration-700 will-change-[opacity,transform] group",
                    isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  )}
                  style={{
                    transitionDelay: isMobileMenuOpen ? `${linkIndex * 80 + 200}ms` : "0ms",
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    color: menuIsDark ? "#ffffff" : "#222222",
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={cn(
                        "inline-block w-0 h-[2px] bg-accent-orange transition-all duration-300",
                        "group-hover:w-6 group-active:w-6"
                      )}
                    />
                    {link.label}
                  </span>
                </Link>
              )
            )}
          </div>

          {/* Bottom CTA area */}
          <div
            className={cn(
              "mt-10 pt-8 space-y-4 transition-all duration-700 will-change-[opacity,transform]",
              menuIsDark ? "border-t border-white/10" : "border-t border-neutral-200",
              isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
            style={{
              transitionDelay: isMobileMenuOpen ? "700ms" : "0ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <a
              href={COMPANY.phoneHref}
              className={cn(
                "flex items-center justify-center gap-2.5 py-3.5 text-lg font-semibold font-heading transition-colors",
                menuIsDark ? "text-white/80 hover:text-white" : "text-primary hover:text-accent-orange"
              )}
            >
              <Phone size={20} className="text-accent-orange" />
              {COMPANY.phone}
            </a>
            <EstimateButton fullWidth size="lg">
              Get Free Estimate
            </EstimateButton>
          </div>

          {/* License badge */}
          <div
            className={cn(
              "mt-8 text-center text-xs font-medium tracking-wider uppercase transition-all duration-700",
              menuIsDark ? "text-white/25" : "text-neutral-300",
              isMobileMenuOpen ? "opacity-100" : "opacity-0"
            )}
            style={{
              transitionDelay: isMobileMenuOpen ? "900ms" : "0ms",
            }}
          >
            CA License #{COMPANY.license} &middot; Bonded &amp; Insured
          </div>
        </nav>
      </div>
    </header>
  );
}
