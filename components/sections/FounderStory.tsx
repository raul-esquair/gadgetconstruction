import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function FounderStory() {
  return (
    <SectionWrapper>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Photo placeholder */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100">
            <Image
              src="/images/logo.png"
              alt="Gadget Construction team on a job site"
              fill
              className="object-contain p-12 opacity-20"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-sm text-neutral-400 font-heading font-medium">
                Founder / Team Photo
              </p>
            </div>
          </div>

          {/* Story */}
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading mb-6">
              How We Got Here
            </h2>
            <div className="space-y-4 text-secondary leading-relaxed">
              <p>
                Gadget Construction didn&apos;t start with a business plan. It started with
                frustration. After years working for other contractors, watching
                homeowners get vague bids, missed deadlines, and radio silence once
                the check cleared — something had to change.
              </p>
              <p>
                In 2014, Gadget Construction was founded with a straightforward idea:
                treat every project like it&apos;s your own home. Show up when you say you
                will. Charge what you quoted. And leave the job site cleaner than you
                found it.
              </p>
              <p>
                Twelve years and 500+ projects later, that idea hasn&apos;t changed. We&apos;ve
                grown from a one-truck operation to a full team of skilled tradespeople
                — but the standard is the same. Every foundation we pour, every wall we
                frame, every roof we install gets the same attention to detail. Because
                your home deserves it.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
