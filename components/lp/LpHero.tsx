import Image from "next/image";
import { CheckCircle2, Phone, Star } from "lucide-react";
import Container from "@/components/ui/Container";
import LpQuickForm from "@/components/lp/LpQuickForm";
import { COMPANY } from "@/lib/constants";

interface LpHeroProps {
  eyebrow: string;
  headline: string;
  subheadline: string;
  trustPoints: string[];
  backgroundImage: string;
  imageAlt: string;
  service: string;
  formHeading?: string;
  formSubtext?: string;
  formCtaText?: string;
}

export default function LpHero({
  eyebrow,
  headline,
  subheadline,
  trustPoints,
  backgroundImage,
  imageAlt,
  service,
  formHeading = "Get Your Free Estimate",
  formSubtext = "Takes under 20 seconds. We respond in minutes.",
  formCtaText = "Get My Free Quote",
}: LpHeroProps) {
  return (
    <section className="relative overflow-hidden bg-primary">
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt={imageAlt}
          fill
          className="object-cover opacity-40"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-primary/90" />
      </div>

      <Container className="relative py-10 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-center">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-orange/20 border border-accent-orange/40 text-accent-orange text-xs font-heading font-semibold uppercase tracking-wider mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-pulse" />
              {eyebrow}
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold font-heading leading-[1.1] tracking-tight"
              style={{ color: "#ffffff" }}
            >
              {headline}
            </h1>

            <p className="mt-5 text-lg md:text-xl text-white/80 leading-relaxed max-w-xl">
              {subheadline}
            </p>

            <ul className="mt-6 space-y-2.5">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-white/90 text-base">
                  <CheckCircle2 size={20} className="text-accent-orange shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href={COMPANY.phoneHref}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-white text-primary font-heading font-bold text-base hover:scale-[1.02] transition-all shadow-lg"
              >
                <Phone size={20} className="text-accent-orange" />
                Call {COMPANY.phone}
              </a>
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <div className="flex text-accent-orange">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={14} className="fill-current" />
                  ))}
                </div>
                <span className="font-medium">5.0 · 500+ Projects</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-5 md:p-7 border border-white/20">
            <h2 className="text-xl md:text-2xl font-extrabold font-heading text-primary">
              {formHeading}
            </h2>
            <p className="text-sm text-secondary mt-1 mb-5">{formSubtext}</p>
            <LpQuickForm service={service} ctaText={formCtaText} />
          </div>
        </div>
      </Container>
    </section>
  );
}
