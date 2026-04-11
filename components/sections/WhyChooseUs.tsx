"use client";

import Image from "next/image";
import * as LucideIcons from "lucide-react";
import Container from "@/components/ui/Container";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { useInView } from "@/hooks/useInView";
import { DIFFERENTIATORS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Differentiator } from "@/lib/types";

interface WhyChooseUsProps {
  items?: Differentiator[];
  heading?: string;
  backgroundImage?: string;
}

export default function WhyChooseUs({
  items = DIFFERENTIATORS,
  heading = "Why San Francisco Homeowners Choose Gadget Construction",
  backgroundImage = "/images/why-choose-us-bg.jpg",
}: WhyChooseUsProps) {
  const { ref, isInView } = useInView();

  return (
    <section className="relative py-12 md:py-20 overflow-hidden">
      {/* Background image */}
      <Image
        src={backgroundImage}
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        quality={80}
      />
      <div className="absolute inset-0 bg-primary/75" />

      <Container className="relative z-10">
        <AnimateOnScroll className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" style={{ color: "#ffffff" }}>
            {heading}
          </h2>
          <div className="mt-3 mx-auto w-16 h-1 bg-accent-orange rounded-full" />
        </AnimateOnScroll>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {items.map((item, index) => {
            const Icon = LucideIcons[item.icon as keyof typeof LucideIcons] as React.ComponentType<{ size?: number; className?: string }>;
            return (
              <div
                key={index}
                className={cn(
                  "p-6 rounded-xl border border-white/10 bg-primary/95 will-change-[opacity,transform] transition-all duration-500",
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
                style={{
                  transitionDelay: `${index * 120}ms`,
                  transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              >
                <div className="w-10 h-10 rounded-lg bg-accent-orange/20 flex items-center justify-center mb-4">
                  {Icon && <Icon size={20} className="text-accent-orange" />}
                </div>
                <h3 className="text-lg font-bold font-heading mb-2" style={{ color: "#ffffff" }}>
                  {item.title}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
