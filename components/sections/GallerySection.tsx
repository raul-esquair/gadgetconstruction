"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionCTA from "@/components/sections/SectionCTA";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

const PLACEHOLDER_PROJECTS = [
  { title: "Kitchen Remodel", location: "Noe Valley, SF", category: "Remodel" },
  { title: "Concrete Foundation", location: "Sunset District, SF", category: "Foundation" },
  { title: "Composite Deck", location: "Bernal Heights, SF", category: "Deck" },
  { title: "Retaining Wall", location: "Twin Peaks, SF", category: "Retaining Wall" },
  { title: "Full Home Remodel", location: "Richmond District, SF", category: "Remodel" },
  { title: "New Roof Installation", location: "Pacific Heights, SF", category: "Roofing" },
];

export default function GallerySection() {
  const { ref, isInView } = useInView();

  return (
    <SectionWrapper>
      <Container>
        <AnimateOnScroll className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading">
            Our Work
          </h2>
          <div className="mt-3 mx-auto w-16 h-1 bg-accent-orange rounded-full" />
          <p className="mt-4 text-secondary max-w-2xl mx-auto">
            Every project tells a story. Here are a few of ours.
          </p>
        </AnimateOnScroll>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {PLACEHOLDER_PROJECTS.map((project, index) => (
            <div
              key={index}
              className={cn(
                "group relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-200 will-change-[opacity,transform] transition-all duration-500",
                isInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
              )}
              style={{
                transitionDelay: `${index * 100}ms`,
                transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            >
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
          ))}
        </div>

        <SectionCTA variant="outline">
          Discuss Your Project With Us
        </SectionCTA>
      </Container>
    </SectionWrapper>
  );
}
