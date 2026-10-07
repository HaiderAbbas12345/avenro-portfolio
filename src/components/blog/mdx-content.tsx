import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { MDXRemote, type MDXComponents } from "next-mdx-remote-client/rsc";
import remarkGfm from "remark-gfm";

function slugify(children: ReactNode) {
  return String(Array.isArray(children) ? children.join("") : children)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function Callout({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <aside className="not-prose rounded-[var(--radius-card)] border border-line bg-surface p-5 text-[0.9375rem] leading-relaxed text-ink-muted">
      {title && <p className="mb-1 font-medium text-ink">{title}</p>}
      {children}
    </aside>
  );
}

/** Components available to every MDX document. Add new ones here. */
const components: MDXComponents = {
  h2: ({ children }) => <h2 id={slugify(children)}>{children}</h2>,
  h3: ({ children }) => <h3 id={slugify(children)}>{children}</h3>,
  a: ({ href = "", children, ...props }: ComponentProps<"a">) =>
    href.startsWith("/") || href.startsWith("#") ? (
      <Link href={href} {...props}>
        {children}
      </Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    ),
  img: ({ src, alt = "" }: ComponentProps<"img">) => (
    <Image src={String(src)} alt={alt} width={1600} height={900} sizes="(min-width: 768px) 672px, 100vw" className="h-auto w-full" />
  ),
  table: (props: ComponentProps<"table">) => (
    <div className="overflow-x-auto">
      <table {...props} />
    </div>
  ),
  Callout,
};

export function MdxContent({ source, className = "prose-avenro" }: { source: string; className?: string }) {
  return (
    <div className={className}>
      <MDXRemote source={source} components={components} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
    </div>
  );
}
