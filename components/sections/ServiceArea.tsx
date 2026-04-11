import { MapPin } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionCTA from "@/components/sections/SectionCTA";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { COMPANY } from "@/lib/constants";

export default function ServiceArea() {
  return (
    <SectionWrapper>
      <Container>
        <AnimateOnScroll className="text-center max-w-2xl mx-auto">
          <div className="w-14 h-14 rounded-full bg-accent-orange/10 flex items-center justify-center mx-auto mb-5">
            <MapPin size={28} className="text-accent-orange" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading">
            Proudly Serving {COMPANY.serviceArea}
          </h2>
          <p className="mt-4 text-secondary text-lg leading-relaxed">
            On-site consultations available throughout San Francisco neighborhoods
            and Peninsula cities. We know the terrain, the building codes, and the
            neighborhoods — because we live and work here too.
          </p>
          <SectionCTA>
            Schedule Your Free Site Visit
          </SectionCTA>
        </AnimateOnScroll>
      </Container>
    </SectionWrapper>
  );
}
