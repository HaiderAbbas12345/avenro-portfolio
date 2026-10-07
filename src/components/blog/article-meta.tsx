import type { Post } from "@/lib/content";
import { formatDate } from "@/lib/format";

export function ArticleMeta({ post, tone = "light" }: { post: Post; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <dl className={`flex flex-wrap items-center gap-x-6 gap-y-2 text-sm ${dark ? "text-night-muted" : "text-ink-subtle"}`}>
      <div className="flex gap-1.5">
        <dt className="sr-only">Author</dt>
        <dd className={`font-medium ${dark ? "text-white" : "text-ink"}`}>{post.author.name}</dd>
      </div>
      <div className="flex gap-1.5">
        <dt className="sr-only">Published</dt>
        <dd>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </dd>
      </div>
      {post.updated && post.updated !== post.date && (
        <div className="flex gap-1.5">
          <dt>Updated</dt>
          <dd>
            <time dateTime={post.updated}>{formatDate(post.updated)}</time>
          </dd>
        </div>
      )}
      <div className="flex gap-1.5">
        <dt className="sr-only">Reading time</dt>
        <dd>{post.readingTime} min read</dd>
      </div>
    </dl>
  );
}

export function AuthorCard({ post }: { post: Post }) {
  const initials = post.author.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
  return (
    <aside aria-label="About the author" className="flex gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-6">
      <span
        aria-hidden="true"
        className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sunken text-sm font-semibold text-ink"
      >
        {initials}
      </span>
      <div>
        <p className="font-medium">{post.author.name}</p>
        <p className="text-sm text-ink-subtle">{post.author.role}</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{post.author.bio}</p>
      </div>
    </aside>
  );
}
