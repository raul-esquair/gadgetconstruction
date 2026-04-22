import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { FOUNDER_STORY } from "@/lib/about-data";

export default function FounderStory() {
  return (
    <SectionWrapper>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden order-2 lg:order-1">
            <Image
              src={FOUNDER_STORY.image.src}
              alt={FOUNDER_STORY.image.alt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading mb-8">
              {FOUNDER_STORY.heading}
            </h2>
            <div className="space-y-4 text-secondary leading-relaxed">
              {FOUNDER_STORY.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
