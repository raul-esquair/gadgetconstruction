import { Phone, CheckCircle2 } from "lucide-react";
import Container from "@/components/ui/Container";
import LpQuickForm from "@/components/lp/LpQuickForm";
import { COMPANY } from "@/lib/constants";

interface LpFinalCTAProps {
  heading: string;
  subtext: string;
  bullets?: string[];
  service: string;
  formCtaText?: string;
}

export default function LpFinalCTA({
  heading,
  subtext,
  bullets,
  service,
  formCtaText = "Get My Free Quote",
}: LpFinalCTAProps) {
  return (
    <section className="bg-gradient-to-br from-primary via-primary/95 to-neutral-700 py-14 md:py-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div>
            <h2
              className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold font-heading leading-tight"
              style={{ color: "#ffffff" }}
            >
              {heading}
            </h2>
            <p className="mt-4 text-lg text-white/80 leading-relaxed max-w-lg">
              {subtext}
            </p>

            {bullets && bullets.length > 0 && (
              <ul className="mt-6 space-y-2.5">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-white/90">
                    <CheckCircle2 size={20} className="text-accent-orange shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}

            <a
              href={COMPANY.phoneHref}
              className="inline-flex items-center gap-2.5 mt-7 px-6 py-3.5 rounded-lg bg-accent-orange text-white font-heading font-bold text-base hover:bg-accent-orange-dark hover:scale-[1.02] transition-all"
            >
              <Phone size={20} />
              Call {COMPANY.phone}
            </a>
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl">
            <h3 className="text-xl font-extrabold font-heading text-primary mb-1">
              Get Your Free Quote
            </h3>
            <p className="text-sm text-secondary mb-5">
              Takes under 20 seconds. No obligation. We respond in minutes.
            </p>
            <LpQuickForm service={service} ctaText={formCtaText} />
          </div>
        </div>
      </Container>
    </section>
  );
}
