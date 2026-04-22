import { Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import CTABlockForm from "@/components/sections/CTABlockForm";
import { COMPANY } from "@/lib/constants";

interface CTABlockProps {
  heading?: string;
  subtext?: string;
}

export default function CTABlock({
  heading = "Ready to Start Your Project?",
  subtext = "Get a free, no-obligation estimate. We respond in minutes — not hours.",
}: CTABlockProps) {
  return (
    <section className="bg-gradient-to-br from-primary via-primary/95 to-neutral-700 py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          {/* Left: Copy */}
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading" style={{ color: "#ffffff" }}>
              {heading}
            </h2>
            <p className="mt-4 text-lg text-white/70 leading-relaxed max-w-lg">
              {subtext}
            </p>
            <a
              href={COMPANY.phoneHref}
              className="inline-flex items-center gap-2 mt-6 text-lg font-semibold text-accent-orange hover:text-white transition-colors font-heading"
            >
              <Phone size={20} />
              Or call {COMPANY.phone} — talk to a real person, not a call center.
            </a>
          </div>

          {/* Right: Multi-step Form (lazy-loaded on scroll-in) */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl">
            <CTABlockForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
