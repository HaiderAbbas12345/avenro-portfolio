import type { Metadata } from "next";
import { site } from "@/lib/site";

type PageMetadataInput = {
  title: string;
  description: string;
  /** Path of the page, e.g. "/services/websites". Used for the canonical URL. */
  path: string;
  /**
   * Social image. Omit to use the site-wide Open Graph image. Pages with their
   * own `opengraph-image` file (articles, case studies) pass `null`.
   */
  image?: string | null;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  /** Use the title exactly as given instead of appending " | Avenro". */
  absoluteTitle?: boolean;
};

/**
 * Builds consistent metadata for every page: title, description, canonical
 * URL, Open Graph and X/Twitter cards.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = "/opengraph-image",
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  tags,
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const images = image ? [{ url: image, width: 1200, height: 630, alt: title }] : undefined;
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: site.name,
      locale: site.locale,
      title: fullTitle,
      description,
      ...(images && { images }),
      ...(type === "article" && { publishedTime, modifiedTime, authors, tags }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(images && { images: images.map((i) => i.url) }),
    },
  };
}
