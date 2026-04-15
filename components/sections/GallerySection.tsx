"use client";

import { useEffect, useRef } from "react";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import BeforeAfter from "@/components/ui/BeforeAfter";

function PixelReveal({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const compositeRef = useRef<SVGFECompositeElement>(null);
  const morphRef = useRef<SVGFEMorphologyElement>(null);
  const locked = useRef(false);
  const rafId = useRef<number>(0);
  const lastSize = useRef(20);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    const composite = compositeRef.current;
    const morph = morphRef.current;
    if (!wrapper || !content || !composite || !morph) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      content.style.filter = "none";
      locked.current = true;
      return;
    }

    const handleScroll = () => {
      if (locked.current) return;
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        if (!wrapper || !composite || !morph || !content) return;
        const rect = wrapper.getBoundingClientRect();
        const vh = window.innerHeight;
        const start = vh * 0.95;
        const end = vh * 0.15;
        const top = rect.top;

        let progress: number;
        if (top >= start) {
          progress = 0;
        } else if (top <= end) {
          progress = 1;
        } else {
          progress = 1 - (top - end) / (start - end);
        }

        // Ease out quart for a long smooth tail
        const eased = 1 - Math.pow(1 - progress, 4);

        // Pixel size: 20 → 0 (fractional for smoothness)
        const size = 20 * (1 - eased);

        // Only update DOM if the value actually changed enough to matter
        if (Math.abs(size - lastSize.current) < 0.3 && size > 0.5) return;
        lastSize.current = size;

        if (size < 0.5) {
          // Fully resolved — remove filter and lock
          content.style.filter = "none";
          locked.current = true;
          return;
        }

        // Update SVG filter attributes directly (no React re-render)
        const cellSize = Math.max(1, size * 2);
        composite.setAttribute("width", String(cellSize));
        composite.setAttribute("height", String(cellSize));
        morph.setAttribute("radius", String(size));
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div ref={wrapperRef}>
      {/* Persistent SVG filter — attributes mutated directly via refs */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="pixel-reveal">
            <feFlood x="4" y="4" height="2" width="2" />
            <feComposite ref={compositeRef} width="40" height="40" />
            <feTile result="a" />
            <feComposite in="SourceGraphic" in2="a" operator="in" />
            <feMorphology ref={morphRef} operator="dilate" radius="20" />
          </filter>
        </defs>
      </svg>
      <div
        ref={contentRef}
        className="will-change-[filter]"
        style={{ filter: "url(#pixel-reveal)" }}
      >
        {children}
      </div>
    </div>
  );
}

interface GallerySectionProps {
  showCTA?: boolean;
}

export default function GallerySection({ showCTA = true }: GallerySectionProps) {
  return (
    <SectionWrapper>
      <Container>
        <AnimateOnScroll className="mb-10">
          <p className="text-sm font-heading font-semibold text-accent-orange uppercase tracking-wider mb-3">
            Portfolio
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading">
            Every project tells a story
          </h2>
          <p className="mt-3 text-secondary text-lg max-w-xl">
            Drag the slider to see the transformation. Real work, real results.
          </p>
        </AnimateOnScroll>

        <PixelReveal>
          <div className="max-w-3xl mx-auto">
            <BeforeAfter
              beforeImage="/images/roofing-before.jpg"
              afterImage="/images/roofing-after.jpg"
              beforeAlt="Damaged gazebo roof before replacement by Gadget Construction in the Bay Area"
              afterAlt="Newly installed shingle roof on gazebo after replacement by Gadget Construction in the Bay Area"
              caption="Gazebo Roof Replacement — Full tear-off and re-roof with architectural shingles"
            />
          </div>
        </PixelReveal>

        {showCTA && (
          <div className="text-center mt-10">
            <a
              href="/gallery"
              className="inline-flex items-center justify-center gap-2 font-heading font-semibold rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 text-base"
            >
              View Full Portfolio
            </a>
          </div>
        )}
      </Container>
    </SectionWrapper>
  );
}
