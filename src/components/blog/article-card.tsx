import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/content";
import { formatDate } from "@/lib/format";

/** Article card with cover image; falls back to a typographic card without one. */
export function ArticleCard({ post, headingLevel = "h3" }: { post: Post; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className="group reveal relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-ink/30">
      {post.image && (
        <div className="overflow-hidden bg-sunken">
          <Image
            src={post.image}
            alt={post.imageAlt ?? ""}
            width={800}
            height={450}
            sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
            className="aspect-[16/9] h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="font-mono text-xs tracking-[0.08em] text-accent uppercase">{post.category.name}</p>
        <Heading className="mt-3 text-xl leading-snug font-semibold tracking-tight text-balance">
          <Link href={post.url} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </Heading>
        <p className="mt-3 line-clamp-3 text-[0.9375rem] leading-relaxed text-ink-muted">{post.description}</p>
        <p className="mt-auto flex items-center gap-2 pt-6 text-sm text-ink-subtle">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime} min read</span>
        </p>
      </div>
    </article>
  );
}
