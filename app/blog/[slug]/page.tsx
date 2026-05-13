import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { marked } from "marked";
import { generatePageMetadata } from "@/lib/metadata";
import { BLOG_POSTS, isPublished, getPublishedPosts, getRelatedPosts } from "@/lib/blog-data";
import { SERVICES } from "@/lib/constants";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import Button from "@/components/ui/Button";
import JsonLd, { articleSchema, faqSchema } from "@/components/seo/JsonLd";
import CTABlock from "@/components/sections/CTABlock";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post || !isPublished(post)) return {};

  return generatePageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    ogType: "article",
    publishedTime: post.date,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post || !isPublished(post)) notFound();

  const relatedService = post.relatedService
    ? SERVICES.find((s) => s.slug === post.relatedService)
    : null;

  const relatedPosts = getRelatedPosts(post.slug, post.relatedService, 3);

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.excerpt,
          date: post.date,
          dateModified: post.dateModified,
          url: `/blog/${post.slug}`,
        })}
      />
      {post.faqs && post.faqs.length > 0 && (
        <JsonLd data={faqSchema(post.faqs)} />
      )}

      {/* Blog post hero — centered editorial layout */}
      <section
        data-page-header
        className="relative overflow-hidden bg-primary text-white -mt-20 md:-mt-24 pt-28 md:pt-32 pb-12 md:pb-16"
      >
        {/* Drifting blueprint grid */}
        <div
          className="absolute inset-0 blueprint-grid pointer-events-none"
          aria-hidden="true"
        />
        {/* Breathing red brand glow behind title */}
        <div
          className="absolute left-1/2 top-32 md:top-40 w-[min(900px,90vw)] h-[320px] hero-red-glow pointer-events-none"
          aria-hidden="true"
        />

        <Container className="relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Category · Date · Reading time */}
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm mb-6">
              {relatedService && (
                <Link
                  href={`/services/${relatedService.slug}`}
                  className="text-accent-orange font-semibold hover:text-accent-orange-dark transition-colors font-heading"
                >
                  {relatedService.name}
                </Link>
              )}
              {relatedService && <span className="text-white/30">·</span>}
              <Link
                href="/about"
                className="text-white/60 hover:text-white transition-colors"
              >
                By the Gadget Construction team
              </Link>
              <span className="text-white/30">·</span>
              <time className="text-white/60" dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              <span className="text-white/30">·</span>
              <span className="text-white/60">{post.readingTime}</span>
            </div>

            {/* Title */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] font-heading"
              style={{ color: "#ffffff" }}
            >
              {post.title}
            </h1>
          </div>
        </Container>

        {/* Featured image — same dark canvas, no card chrome */}
        {post.featuredImage && (
          <Container narrow className="relative mt-10 md:mt-14">
            <div className="relative aspect-[3/2] overflow-hidden rounded-2xl">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority
                className="object-cover"
              />
            </div>
          </Container>
        )}
      </section>

      <div className="bg-white border-b border-neutral-200">
        <Container narrow>
          <Breadcrumbs
            items={[
              { label: "Blog", href: "/blog" },
              { label: post.title, href: `/blog/${post.slug}` },
            ]}
          />
        </Container>
      </div>

      {/* Article Content */}
      <SectionWrapper>
        <Container narrow>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-12">
            {/* Main Content */}
            <article className="lg:col-span-3 prose prose-lg max-w-none">
              <div
                className="
                  text-secondary leading-relaxed
                  [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:font-heading [&_h2]:text-primary [&_h2]:mt-10 [&_h2]:mb-4
                  [&_h3]:text-xl [&_h3]:font-bold [&_h3]:font-heading [&_h3]:text-primary [&_h3]:mt-8 [&_h3]:mb-3
                  [&_p]:mb-4
                  [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-1
                  [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:space-y-1
                  [&_li]:text-secondary
                  [&_strong]:text-primary [&_strong]:font-semibold
                  [&_a]:text-accent-orange [&_a]:underline [&_a]:hover:text-accent-orange-dark
                  [&_table]:w-full [&_table]:border-collapse [&_table]:mb-6
                  [&_th]:bg-neutral-50 [&_th]:border [&_th]:border-neutral-200 [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:font-heading [&_th]:font-semibold [&_th]:text-primary [&_th]:text-sm
                  [&_td]:border [&_td]:border-neutral-200 [&_td]:px-4 [&_td]:py-2 [&_td]:text-sm
                  [&_blockquote]:border-l-4 [&_blockquote]:border-accent-orange [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-neutral-500
                  [&_hr]:border-neutral-200 [&_hr]:my-8
                "
                dangerouslySetInnerHTML={{
                  __html: marked.parse(post.content, { gfm: true, async: false }) as string,
                }}
              />
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                {/* CTA Card */}
                <div className="p-5 bg-accent-orange rounded-xl text-white">
                  <h3 className="font-heading font-bold text-base mb-2">
                    Need Help With Your Project?
                  </h3>
                  <p className="text-sm text-white/80 mb-4">
                    Free estimates, honest answers, no pressure.
                  </p>
                  <Button
                    href="/contact"
                    variant="secondary"
                    size="sm"
                    fullWidth
                  >
                    Get a Free Estimate
                  </Button>
                </div>

                {/* Related Service */}
                {relatedService && (
                  <div className="p-5 bg-neutral-50 rounded-xl border border-neutral-200">
                    <p className="text-xs font-heading font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                      Related Service
                    </p>
                    <Link
                      href={`/services/${relatedService.slug}`}
                      className="text-sm font-semibold text-primary hover:text-accent-orange transition-colors font-heading"
                    >
                      {relatedService.name} →
                    </Link>
                  </div>
                )}
              </div>
            </aside>
          </div>

          {/* Back to blog */}
          <div className="mt-12 pt-8 border-t border-neutral-200">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent-orange hover:gap-3 transition-all font-heading"
            >
              <ArrowLeft size={14} />
              Back to All Articles
            </Link>
          </div>
        </Container>
      </SectionWrapper>

      {relatedPosts.length > 0 && (
        <section className="bg-neutral-50 border-t border-neutral-200 py-16 md:py-20">
          <Container>
            <div className="max-w-5xl mx-auto">
              <p className="text-xs font-heading font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                Continue reading
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-primary mb-10">
                Related articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group block rounded-xl border border-neutral-200 overflow-hidden bg-white transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5"
                  >
                    <div className="aspect-[16/9] bg-neutral-100 relative overflow-hidden">
                      {related.featuredImage ? (
                        <Image
                          src={related.featuredImage}
                          alt={related.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
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
                        <span>
                          {new Date(related.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span>·</span>
                        <span>{related.readingTime}</span>
                      </div>
                      <h3 className="text-base font-bold font-heading text-primary group-hover:text-accent-orange transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      <CTABlock
        heading="Ready to Move From Research to Action?"
        subtext="You've done the reading. Now let's talk about your specific project — free estimate, no obligation, we respond in minutes."
      />
    </>
  );
}
