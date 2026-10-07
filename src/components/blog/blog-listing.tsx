import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/format";
import type { Post } from "@/lib/content";
import { getActiveCategories } from "@/lib/content";
import { ArticleCard } from "./article-card";

/** Shared listing for /blog and /blog/category/[category]. */
export function BlogListing({ posts, activeCategory }: { posts: Post[]; activeCategory?: string }) {
  const categories = getActiveCategories();

  return (
    <>
      {categories.length > 1 && (
        <nav aria-label="Article categories" className="mb-10">
          <ul className="flex flex-wrap gap-2">
            <li>
              <CategoryLink href="/blog" active={!activeCategory}>
                All
              </CategoryLink>
            </li>
            {categories.map((category) => (
              <li key={category.slug}>
                <CategoryLink href={`/blog/category/${category.slug}`} active={activeCategory === category.slug}>
                  {category.name}
                </CategoryLink>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {!activeCategory && posts.length > 3 && posts[0].image && <FeaturedArticle post={posts[0]} />}
      {posts.length ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {(!activeCategory && posts.length > 3 && posts[0].image ? posts.slice(1) : posts).map((post) => (
            <ArticleCard key={post.slug} post={post} headingLevel="h2" />
          ))}
        </div>
      ) : (
        <p className="text-ink-muted">No articles here yet.</p>
      )}
    </>
  );
}

function CategoryLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`inline-flex h-9 items-center rounded-full border px-4 text-sm transition-colors ${
        active ? "border-ink bg-ink text-white" : "border-line-strong bg-surface text-ink-muted hover:border-ink hover:text-ink"
      }`}
    >
      {children}
    </Link>
  );
}

function FeaturedArticle({ post }: { post: Post }) {
  return (
    <article className="group relative mb-10 grid overflow-hidden rounded-2xl border border-line bg-surface lg:grid-cols-[1.3fr_1fr]">
      <div className="overflow-hidden bg-sunken">
        <Image
          src={post.image!}
          alt={post.imageAlt ?? ""}
          width={1200}
          height={675}
          priority
          sizes="(min-width: 1024px) 620px, 100vw"
          className="aspect-[16/9] h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-col justify-center p-7 sm:p-10">
        <p className="font-mono text-xs tracking-[0.08em] text-accent uppercase">Featured · {post.category.name}</p>
        <h2 className="mt-4 text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-3xl">
          <Link href={post.url} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h2>
        <p className="mt-4 leading-relaxed text-ink-muted">{post.description}</p>
        <p className="mt-6 text-sm text-ink-subtle">
          {post.author.name} · <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingTime} min read
        </p>
      </div>
    </article>
  );
}
