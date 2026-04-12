"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionCTA from "@/components/sections/SectionCTA";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

const PLACEHOLDER_PROJECTS = [
  { title: "Kitchen Remodel", location: "Noe Valley, SF", category: "Remodel" },
  { title: "Concrete Foundation", location: "Sunset District, SF", category: "Foundation" },
  { title: "Composite Deck", location: "Bernal Heights, SF", category: "Deck" },
  { title: "Retaining Wall", location: "Twin Peaks, SF", category: "Retaining Wall" },
  { title: "Full Home Remodel", location: "Richmond District, SF", category: "Remodel" },
  { title: "New Roof Installation", location: "Pacific Heights, SF", category: "Roofing" },
];

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
        </AnimateOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {PLACEHOLDER_PROJECTS.map((project, index) => (
            <RevealOnScroll key={index} animation="scale-rotate">
              <div className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-200">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent z-10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="/images/logo.png"
                    alt={project.title}
                    width={120}
                    height={40}
                    className="opacity-10 group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block text-xs font-semibold text-accent-orange bg-white/90 px-2 py-0.5 rounded-full mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-white font-heading font-bold text-sm">
                    {project.title}
                  </h3>
                  <p className="text-white/70 text-xs mt-0.5">{project.location}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

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
