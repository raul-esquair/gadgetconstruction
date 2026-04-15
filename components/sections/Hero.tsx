"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Phone, ChevronDown, Calendar } from "lucide-react";
import Button from "@/components/ui/Button";
import HeroCTA from "@/components/sections/HeroCTA";
import Container from "@/components/ui/Container";
import { COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface HeroProps {
  headline: string;
  subheadline: string;
  ctaText?: string;
  ctaHref?: string;
  openModal?: boolean;
  showPhone?: boolean;
  showScrollIndicator?: boolean;
  showTrustPills?: boolean;
  urgencyText?: string;
  backgroundImage?: string;
  imageAlt?: string;
  compact?: boolean;
  className?: string;
}

export default function Hero({
  headline,
  subheadline,
  ctaText = "Get Your Free Estimate",
  ctaHref = "/contact",
  openModal = false,
  showPhone = true,
  showScrollIndicator = false,
  showTrustPills = false,
  urgencyText,
  backgroundImage,
  imageAlt = "",
  compact = false,
  className,
}: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Small delay to ensure DOM is ready, then trigger entrance
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Parallax: background moves at 0.3x scroll speed (desktop only)
  useEffect(() => {
    const el = parallaxRef.current;
    if (!el) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    if (prefersReducedMotion || isMobile) return;

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        el.style.transform = `translateY(${y * 0.3}px) scale(1.1)`;
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stagger = (delay: number) => ({
    className: cn(
      "transition-all duration-1000 will-change-[opacity,transform]",
      isLoaded
        ? "opacity-100 translate-y-0 blur-0"
        : "opacity-0 translate-y-8 blur-[2px]"
    ),
    style: {
      transitionDelay: `${delay}ms`,
      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    },
  });

  return (
    <section
      className={cn(
        "relative flex items-center bg-primary overflow-hidden -mt-20 md:-mt-24",
        compact ? "min-h-[50vh] pt-28 md:pt-36 pb-16 md:pb-20" : "min-h-[85vh] md:min-h-[80vh] pt-28 md:pt-36 pb-16 md:pb-20",
        className
      )}
    >
      {/* Background image or gradient fallback — with parallax */}
      {backgroundImage ? (
        <div ref={parallaxRef} className="absolute inset-0 will-change-transform md:scale-110">
          <Image
            src={backgroundImage}
            alt={imageAlt}
            fill
            className="object-cover animate-[ken-burns_20s_ease-in-out_infinite_alternate]"
            priority
            sizes="100vw"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/75 to-primary/50" />
        </div>
      ) : (
        <div ref={parallaxRef} className="absolute inset-0 will-change-transform">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-neutral-700" />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
      )}

      <Container className="relative z-10">
        <div className="max-w-3xl">
          {/* Urgency badge — enters first */}
          {urgencyText && (
            <div {...stagger(0)}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-5 backdrop-blur-sm">
                <Calendar size={14} className="text-white" />
                <span className="text-sm font-medium text-white">
                  {urgencyText}
                </span>
              </div>
            </div>
          )}

          {/* Headline — enters at 150ms */}
          <div {...stagger(150)}>
            <h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight font-heading"
              style={{ color: "#ffffff" }}
            >
              {headline}
            </h1>
          </div>

          {/* Subheadline — enters at 350ms */}
          <div {...stagger(350)}>
            <p className="mt-5 md:mt-6 text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl">
              {subheadline}
            </p>
          </div>

          {/* CTAs — enter at 550ms */}
          <div {...stagger(550)} data-hero-cta>
            <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-start gap-4">
              {openModal ? (
                <HeroCTA text={ctaText} />
              ) : (
                <Button href={ctaHref} size="lg">
                  {ctaText}
                </Button>
              )}
              {showPhone && (
                <a
                  href={COMPANY.phoneHref}
                  className="flex items-center gap-2 text-white/90 hover:text-accent-orange transition-colors font-heading font-semibold text-lg"
                >
                  <Phone size={20} />
                  Or call {COMPANY.phone}
                </a>
              )}
            </div>
          </div>

          {/* Trust line — enters last at 700ms */}
          {showTrustPills && (
            <div {...stagger(700)}>
              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs md:text-sm text-white/50 font-medium">
                <span>Class B General Contractor</span>
                <span className="hidden sm:inline">·</span>
                <span>Licensed &amp; Insured</span>
                <span className="hidden sm:inline">·</span>
                <span>CA Lic #{COMPANY.license}</span>
              </div>
            </div>
          )}
        </div>
      </Container>

      {/* Scroll indicator */}
      {showScrollIndicator && (
        <div
          className={cn(
            "absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle transition-opacity duration-1000",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          style={{ transitionDelay: "1000ms" }}
        >
          <ChevronDown size={28} className="text-white/50" />
        </div>
      )}
    </section>
  );
}
