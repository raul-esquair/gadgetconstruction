"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import { Phone, ChevronDown, Calendar, Check } from "lucide-react";
import Button from "@/components/ui/Button";
import HeroCTA from "@/components/sections/HeroCTA";
import Container from "@/components/ui/Container";
import { COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { blurProps } from "@/lib/blur";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface HeroProps {
  headline: string;
  /** Merged over the default size scale, e.g. a larger mobile size. */
  headlineClassName?: string;
  subheadline?: string;
  /** Scannable proof points rendered as checkmarks under the headline. */
  highlights?: string[];
  /**
   * Right-hand column on desktop (lg+), e.g. an inline form. The CTA button
   * then shows below lg only, where there is no room for the aside.
   */
  aside?: ReactNode;
  ctaText?: string;
  ctaHref?: string;
  openModal?: boolean;
  showPhone?: boolean;
  showScrollIndicator?: boolean;
  urgencyText?: string;
  backgroundImage?: string;
  imageAlt?: string;
  compact?: boolean;
  className?: string;
}

export default function Hero({
  headline,
  headlineClassName,
  subheadline,
  highlights,
  aside,
  ctaText = "Get Your Free Estimate",
  ctaHref = "/contact",
  openModal = false,
  showPhone = true,
  showScrollIndicator = false,
  urgencyText,
  backgroundImage,
  imageAlt = "",
  compact = false,
  className,
}: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Arm on the first painted frame, not on a timer. The h1 is the LCP element
  // and Chrome ignores it while opacity is 0 — every ms of arming delay is a
  // ms of LCP, so this is a double rAF rather than a setTimeout.
  useEffect(() => {
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setIsLoaded(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, []);

  // Parallax: background moves at 0.3x scroll speed (desktop only)
  useEffect(() => {
    const el = parallaxRef.current;
    if (!el) return;
    const isMobile = window.innerWidth < 768;
    if (reducedMotion || isMobile) return;

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
    return () => {
      window.removeEventListener("scroll", handleScroll);
      el.style.transform = "";
    };
  }, [reducedMotion]);

  const stagger = (delay: number) => ({
    className: cn(
      "transition-[opacity,transform,filter] duration-700 will-change-[opacity,transform]",
      isLoaded
        ? "opacity-100 translate-y-0 blur-0"
        : reducedMotion
        ? "opacity-0"
        : "opacity-0 translate-y-8 blur-[2px]"
    ),
    style: {
      transitionDelay: `${reducedMotion ? Math.min(delay, 120) : delay}ms`,
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
            {...blurProps(backgroundImage)}
            alt={imageAlt}
            fill
            className="object-cover animate-[ken-burns_20s_ease-in-out_infinite_alternate]"
            priority
            fetchPriority="high"
            decoding="sync"
            sizes="100vw"
            quality={80}
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
        {/* With an aside, the sentinel the header and mobile bar watch is the
            whole grid: on desktop the CTA is the aside, on mobile the button.
            (A display:none sentinel reports bottom 0 and never "passes".) */}
        <div
          className={cn(
            aside &&
              "lg:grid lg:grid-cols-[minmax(0,1fr)_24rem] xl:grid-cols-[minmax(0,1fr)_27rem] lg:gap-12 xl:gap-16 lg:items-center"
          )}
          {...(aside ? { "data-hero-cta": "" } : {})}
        >
          <div className="max-w-3xl">
            {/* Urgency badge — enters first */}
            {urgencyText && (
              <div {...stagger(0)}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-5 backdrop-blur-sm [@media(prefers-reduced-transparency:reduce)]:bg-white/25 [@media(prefers-contrast:more)]:bg-primary [@media(prefers-contrast:more)]:border-white">
                  <Calendar size={14} className="text-white" />
                  <span className="text-sm font-medium text-white">
                    {urgencyText}
                  </span>
                </div>
              </div>
            )}

            {/* Headline — enters at 150ms */}
            <div {...stagger(60)}>
              <h1
                className={cn(
                  "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight font-heading",
                  headlineClassName
                )}
                style={{ color: "#ffffff" }}
              >
                {headline}
              </h1>
            </div>

            {/* Subheadline and/or proof points */}
            {(subheadline || highlights) && (
              <div {...stagger(160)}>
                {subheadline && (
                  <p className="mt-5 md:mt-6 text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl">
                    {subheadline}
                  </p>
                )}
                {highlights && (
                  <ul className="mt-5 md:mt-6 flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-2.5 text-base font-medium text-white">
                    {highlights.map((item) => (
                      <li key={item} className="flex items-center gap-2.5">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-accent-orange shrink-0" aria-hidden="true">
                          <Check size={13} strokeWidth={3} className="text-white" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* CTAs — with an aside, mobile/tablet only */}
            <div {...stagger(260)} {...(aside ? {} : { "data-hero-cta": "" })}>
              <div
                className={cn(
                  "mt-8 md:mt-10 flex flex-col sm:flex-row items-start gap-4",
                  aside && "lg:hidden"
                )}
              >
                {openModal ? (
                  <HeroCTA text={ctaText} className={cn(aside && "w-full sm:w-auto")} />
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
          </div>

          {aside && (
            <div className="hidden lg:block">
              <div {...stagger(200)}>{aside}</div>
            </div>
          )}
        </div>
      </Container>

      {/* Scroll indicator */}
      {showScrollIndicator && (
        <div
          className={cn(
            "absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle transition-opacity duration-700",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          style={{ transitionDelay: "500ms" }}
        >
          <ChevronDown size={28} className="text-white/50" />
        </div>
      )}
    </section>
  );
}
