import { getAllPosts, getPost } from "@/lib/content";
import { ogContentType, ogSize, renderOgImage } from "@/lib/seo/og-image";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Avenro Insights article";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return renderOgImage({
    eyebrow: post ? `Avenro Insights · ${post.category.name}` : "Avenro Insights",
    title: post?.title ?? "Avenro Insights",
    footer: post ? `${post.author.name} · ${post.readingTime} min read` : undefined,
  });
}
