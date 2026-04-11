import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { generatePageMetadata } from "@/lib/metadata";
import { BLOG_POSTS } from "@/lib/blog-data";
import { SERVICES } from "@/lib/constants";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import Button from "@/components/ui/Button";
import JsonLd, { articleSchema } from "@/components/seo/JsonLd";
import CTABlock from "@/components/sections/CTABlock";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};

  return generatePageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) notFound();

  const relatedService = post.relatedService
    ? SERVICES.find((s) => s.slug === post.relatedService)
    : null;

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.excerpt,
          date: post.date,
          url: `/blog/${post.slug}`,
        })}
      />

      {/* Article Header */}
      <SectionWrapper background="dark" className="py-16 md:py-24">
        <Container narrow>
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 text-sm text-white/50 mb-4">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {post.readingTime}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white leading-tight">
              {post.title}
            </h1>
          </div>
        </Container>
      </SectionWrapper>

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
                  __html: post.content
                    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
                    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/^\- (.*$)/gm, '<li>$1</li>')
                    .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
                    .replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
                    .replace(/\|(.*)\|/g, (match) => {
                      if (match.includes('---')) return '';
                      const cells = match.split('|').filter(c => c.trim());
                      const isHeader = BLOG_POSTS.indexOf(post) >= 0 && match === match;
                      const tag = isHeader ? 'td' : 'td';
                      return `<tr>${cells.map(c => `<${tag}>${c.trim()}</${tag}>`).join('')}</tr>`;
                    })
                    .replace(/\n\n/g, '</p><p>')
                    .replace(/^(?!<[hultbp])/gm, (match) => match ? `<p>${match}` : match)
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

      <CTABlock
        heading="Ready to Move From Research to Action?"
        subtext="You've done the reading. Now let's talk about your specific project — free estimate, no obligation, we respond in minutes."
      />
    </>
  );
}
