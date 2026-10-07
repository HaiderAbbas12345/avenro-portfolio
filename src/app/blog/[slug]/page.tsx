import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost, getRelatedPosts, getService } from "@/lib/content";
import { pageMetadata } from "@/lib/seo/metadata";
import { articleSchema } from "@/lib/seo/structured-data";
import { JsonLd } from "@/components/seo/json-ld";
import { Section, SectionHeading } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { MdxContent } from "@/components/blog/mdx-content";
import { ArticleMeta, AuthorCard } from "@/components/blog/article-meta";
import { ArticleCard } from "@/components/blog/article-card";
import { Cta } from "@/components/sections/cta";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    ...pageMetadata({
      title: post.title,
      description: post.description,
      path: post.url,
      type: "article",
      image: post.image ?? null,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [post.author.name],
      tags: post.tags,
    }),
    ...(post.draft && { robots: { index: false, follow: false } }),
  };
}

export default async function ArticlePage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);
  const service = post.service ? getService(post.service) : undefined;
  const cta = {
    title: post.cta?.title ?? service?.cta.title,
    text: post.cta?.text ?? service?.cta.text,
    label: post.cta?.label ?? "Talk to Avenro",
    href: post.cta?.href ?? "/contact",
  };

  return (
    <>
      <article>
        <header className="relative overflow-hidden bg-night text-white">
          <div aria-hidden="true" className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
          <div className={`container-page relative pt-10 sm:pt-14 ${post.image ? "pb-40 sm:pb-56" : "pb-16 sm:pb-20"}`}>
            <div className="mx-auto max-w-3xl">
              <Breadcrumbs
                items={[
                  { name: "Insights", path: "/blog" },
                  { name: post.title, path: post.url },
                ]}
              />
              {post.draft && (
                <p className="mb-6 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-2 text-sm text-red-200">
                  Draft — only visible in development.
                </p>
              )}
              <Link
                href={`/blog/category/${post.category.slug}`}
                className="font-mono text-xs tracking-[0.08em] text-accent-bright uppercase hover:text-white"
              >
                {post.category.name}
              </Link>
              <h1 className="mt-4 text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.5rem]">
                {post.title}
              </h1>
              <p className="mt-6 text-xl leading-relaxed text-night-muted text-pretty">{post.description}</p>
              <div className="mt-8 border-t border-white/10 pt-5">
                <ArticleMeta post={post} tone="dark" />
              </div>
            </div>
          </div>
        </header>
        {post.image && (
          <div className="container-page relative -mt-32 sm:-mt-44">
            <Image
              src={post.image}
              alt={post.imageAlt ?? ""}
              width={1600}
              height={900}
              priority
              sizes="(min-width: 1152px) 1024px, 100vw"
              className="mx-auto aspect-[16/9] h-auto w-full max-w-5xl rounded-2xl object-cover shadow-[0_40px_80px_-40px_rgb(0_0_0/0.5)]"
            />
          </div>
        )}

        <div className="container-page py-12 sm:py-16">
          <MdxContent source={post.body} className="prose-avenro mx-auto" />

          <footer className="mx-auto mt-14 max-w-[42rem] space-y-8">
            {post.tags.length > 0 && (
              <ul aria-label="Tags" className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li key={tag} className="rounded-full bg-sunken px-3 py-1 text-xs text-ink-muted">
                    {tag}
                  </li>
                ))}
              </ul>
            )}
            <AuthorCard post={post} />
          </footer>
        </div>
      </article>

      <Cta location={`article_${post.slug}`} title={cta.title} text={cta.text} label={cta.label} href={cta.href} />

      {related.length > 0 && (
        <Section labelledBy="related-articles" className="border-t border-line">
          <SectionHeading id="related-articles" eyebrow="Keep reading" title="Related articles" />
          <div className="grid gap-4 md:grid-cols-3">
            {related.map((p) => (
              <ArticleCard key={p.slug} post={p} />
            ))}
          </div>
        </Section>
      )}

      <JsonLd data={articleSchema(post)} />
    </>
  );
}
