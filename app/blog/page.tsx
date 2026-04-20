import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { generatePageMetadata } from "@/lib/metadata";
import { getPublishedPosts } from "@/lib/blog-data";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import PageHeader from "@/components/sections/PageHeader";
import CTABlock from "@/components/sections/CTABlock";

export const metadata: Metadata = generatePageMetadata({
  title: "Blog | Insights & Guides for San Francisco Homeowners",
  description:
    "Expert construction guides, cost breakdowns, and home improvement tips for San Francisco homeowners. From Gadget Construction — 12+ years serving SF.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getPublishedPosts();
  return (
    <>
      <PageHeader
        title="Insights & Guides for San Francisco Homeowners"
        subtitle="Honest answers to the questions SF homeowners actually ask — costs, permits, timelines, and what to watch out for."
      />

      <div className="bg-white border-b border-neutral-200">
        <Container>
          <Breadcrumbs items={[{ label: "Blog", href: "/blog" }]} />
        </Container>
      </div>

      {/* Posts Grid */}
      <SectionWrapper>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block rounded-xl border border-neutral-200 overflow-hidden bg-white transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5"
              >
                {/* Featured image */}
                <div className="aspect-[16/9] bg-neutral-100 relative overflow-hidden">
                  {post.featuredImage ? (
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
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

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-neutral-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.readingTime}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold font-heading text-primary mb-2 group-hover:text-accent-orange transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-sm text-secondary leading-relaxed line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>

                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-orange group-hover:gap-2.5 transition-all font-heading">
                    Read More
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      <CTABlock
        heading="Have a Project in Mind?"
        subtext="Whether you're planning, researching, or ready to start — we're here to help with honest answers and free estimates."
      />
    </>
  );
}
