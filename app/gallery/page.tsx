"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ChevronRight } from "lucide-react";
import { GALLERY_PROJECTS, PROJECT_CATEGORIES } from "@/lib/gallery-data";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import PageHeader from "@/components/sections/PageHeader";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import CTABlock from "@/components/sections/CTABlock";
import { cn } from "@/lib/utils";

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects =
    activeFilter === "all"
      ? GALLERY_PROJECTS
      : GALLERY_PROJECTS.filter((p) => p.categorySlug === activeFilter);

  return (
    <>
      <PageHeader
        title="Our Work Speaks for Itself"
        subtitle="500+ projects across 31 Bay Area cities. Here are some of the stories behind the builds."
      />

      <div className="bg-white border-b border-neutral-200">
        <Container>
          <Breadcrumbs items={[{ label: "Gallery", href: "/gallery" }]} />
        </Container>
      </div>

      {/* Filters + Grid */}
      <SectionWrapper>
        <Container>
          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-2 mb-10">
            {PROJECT_CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveFilter(cat.slug)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-heading font-medium transition-all duration-200 cursor-pointer",
                  activeFilter === cat.slug
                    ? "bg-accent-orange text-white shadow-md"
                    : "bg-neutral-100 text-secondary hover:bg-neutral-200"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <RevealOnScroll key={project.slug} animation="fade-up">
                <div className="group rounded-2xl border border-neutral-200 bg-white overflow-hidden hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300">
                  {/* Image placeholder */}
                  <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
                    <Image
                      src="/images/logo.png"
                      alt={project.title}
                      fill
                      className="object-contain p-16 opacity-[0.06] group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Category badge */}
                    <span className="absolute top-3 left-3 text-xs font-semibold text-white bg-accent-orange/90 px-2.5 py-1 rounded-full font-heading z-10">
                      {project.category}
                    </span>

                    {/* Location */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs text-white/80 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <MapPin size={12} />
                      {project.location}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-heading font-bold text-primary text-lg mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-secondary leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Scope tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.scope.slice(0, 3).map((item, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-medium text-neutral-400 bg-neutral-50 px-2 py-0.5 rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                      {project.scope.length > 3 && (
                        <span className="text-[10px] font-medium text-accent-orange bg-accent-orange/5 px-2 py-0.5 rounded-full">
                          +{project.scope.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-secondary text-lg">
                No projects in this category yet. Check back soon.
              </p>
            </div>
          )}

          {/* Service page links */}
          <AnimateOnScroll className="mt-16">
            <div className="p-6 md:p-8 bg-neutral-50 rounded-2xl border border-neutral-200">
              <p className="text-sm font-heading font-semibold text-accent-orange uppercase tracking-wider mb-4">
                Explore by Service
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { label: "Concrete Foundations", href: "/services/concrete-foundations" },
                  { label: "Retaining Walls", href: "/services/retaining-walls" },
                  { label: "Complete Remodels", href: "/services/complete-remodel" },
                  { label: "Composite Decks", href: "/services/composite-decks" },
                  { label: "Roofing", href: "/services/roofing" },
                  { label: "ADU Construction", href: "/services/adu-construction" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex items-center justify-between p-3 rounded-lg bg-white border border-neutral-200 hover:border-accent-orange/30 transition-colors text-sm font-medium text-secondary hover:text-accent-orange"
                  >
                    {link.label}
                    <ChevronRight size={14} className="text-neutral-300 group-hover:text-accent-orange transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </Container>
      </SectionWrapper>

      <CTABlock
        heading="Like What You See?"
        subtext="Let's talk about your project. Free estimate, no obligation — we respond in minutes."
      />
    </>
  );
}
