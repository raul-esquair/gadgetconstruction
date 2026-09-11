import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { getServiceGuides } from "@/lib/service-guides";
import { blurProps } from "@/lib/blur";

/**
 * "Guides" module for a service page — curated, commercial-intent-first blog
 * posts for that service (see lib/service-guides.ts for the ordering rationale).
 *
 * Beyond UX, this is a crawl path: it puts real contextual links from the
 * service pages into blog posts that Google has never fetched. Renders nothing
 * when a service has no curated guides, so retaining-walls stays
 * clean until it has content.
 */
export default function ServiceGuides({
  serviceSlug,
  heading = "Planning Guides",
  eyebrow = "Before you commit",
}: {
  serviceSlug: string;
  heading?: string;
  eyebrow?: string;
}) {
  const guides = getServiceGuides(serviceSlug);
  if (guides.length === 0) return null;

  return (
    <section className="bg-neutral-50 border-t border-neutral-200 py-16 md:py-20">
      <Container>
        <p className="text-xs font-heading font-semibold text-neutral-400 uppercase tracking-wider mb-2">
          {eyebrow}
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-primary mb-10">
          {heading}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/blog/${guide.slug}`}
              className="group block rounded-xl border border-neutral-200 overflow-hidden bg-white transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5"
            >
              <div className="aspect-[16/9] bg-neutral-100 relative overflow-hidden">
                {guide.featuredImage ? (
                  <Image
                    src={guide.featuredImage}
                    {...blurProps(guide.featuredImage)}
                    alt={guide.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-sm text-neutral-400 font-heading font-medium">
                      Featured Image
                    </p>
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-neutral-400 mb-2">
                  <span>{guide.readingTime}</span>
                </div>
                <h3 className="text-base font-bold font-heading text-primary group-hover:text-accent-orange transition-colors line-clamp-3">
                  {guide.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
