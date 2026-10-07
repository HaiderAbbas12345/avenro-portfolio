import { cache } from "react";
import { FieldReader, byDateDesc, readCollection, readingTimeMinutes, showDrafts } from "./collection";
import { authorIds, authors, categorySlugs, getCategory, type Author, type Category } from "./taxonomy";
import { serviceSlugs, type ServiceSlug } from "./service-slugs";

export type Post = {
  slug: string;
  url: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: Author;
  category: Category;
  tags: string[];
  image?: string;
  imageAlt?: string;
  featured: boolean;
  draft: boolean;
  /** Service this article relates to — drives the contextual CTA. */
  service?: ServiceSlug;
  cta?: { title: string; text: string; label?: string; href?: string };
  readingTime: number;
  body: string;
};

export const getAllPosts = cache((): Post[] => {
  return readCollection("blog")
    .map((entry) => {
      const f = new FieldReader(entry);
      const image = f.optionalString("image");
      const post: Post = {
        slug: entry.slug,
        url: `/blog/${entry.slug}`,
        title: f.string("title"),
        description: f.string("description"),
        date: f.date("date"),
        updated: f.optionalDate("updated"),
        author: authors[f.oneOf("author", authorIds)],
        category: getCategory(f.oneOf("category", categorySlugs))!,
        tags: f.stringList("tags"),
        image,
        imageAlt: image ? f.string("imageAlt") : undefined,
        featured: f.boolean("featured"),
        draft: f.boolean("draft"),
        service: entry.frontmatter.service ? f.oneOf("service", serviceSlugs) : undefined,
        cta: f.optionalObject("cta", ["title", "text"]),
        readingTime: readingTimeMinutes(entry.body),
        body: entry.body,
      };
      return post;
    })
    .filter((post) => showDrafts || !post.draft)
    .sort(byDateDesc);
});

export function getPost(slug: string) {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getPostsByCategory(categorySlug: string) {
  return getAllPosts().filter((post) => post.category.slug === categorySlug);
}

/** Categories that currently have at least one published article. */
export function getActiveCategories() {
  const used = new Set(getAllPosts().map((post) => post.category.slug));
  return categorySlugs.filter((slug) => used.has(slug)).map((slug) => getCategory(slug)!);
}

/** Related articles: same category first, then shared tags, then newest. */
export function getRelatedPosts(post: Post, limit = 3) {
  return getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      post: p,
      score:
        (p.category.slug === post.category.slug ? 2 : 0) +
        p.tags.filter((t) => post.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score || byDateDesc(a.post, b.post))
    .slice(0, limit)
    .map(({ post }) => post);
}
