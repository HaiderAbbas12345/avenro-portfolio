import { cache } from "react";
import { FieldReader, readCollection } from "./collection";

/** Long-form standalone pages (legal pages, etc.) stored in content/pages. */
export type ContentPage = {
  slug: string;
  title: string;
  description: string;
  updated: string;
  body: string;
};

export const getAllPages = cache((): ContentPage[] =>
  readCollection("pages").map((entry) => {
    const f = new FieldReader(entry);
    return {
      slug: entry.slug,
      title: f.string("title"),
      description: f.string("description"),
      updated: f.date("updated"),
      body: entry.body,
    };
  }),
);

export function getPage(slug: string) {
  const page = getAllPages().find((p) => p.slug === slug);
  if (!page) throw new Error(`Missing content/pages/${slug}.mdx`);
  return page;
}
