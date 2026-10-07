/**
 * Blog categories. Keep this list short — add a category only when there is
 * enough content to justify it. Articles reference categories by `slug`.
 */
export const categories = [
  {
    slug: "web-development",
    name: "Web Development",
    description: "How modern websites and web applications are planned, built and kept fast.",
  },
  {
    slug: "business-technology",
    name: "Business Technology",
    description: "Practical guidance for businesses making decisions about websites and software.",
  },
  {
    slug: "product-development",
    name: "Product Development",
    description: "Notes on designing and shipping software products, dashboards and SaaS tools.",
  },
  {
    slug: "avenro-updates",
    name: "Avenro Updates",
    description: "Company news, launches and behind-the-build notes from Avenro.",
  },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];
export type Category = (typeof categories)[number];

export const categorySlugs = categories.map((c) => c.slug) as CategorySlug[];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

/**
 * People who write for Avenro. Articles reference an author by `id`.
 */
export const authors = {
  "muhammad-haider-abbas": {
    id: "muhammad-haider-abbas",
    name: "Muhammad Haider Abbas",
    role: "Founder, Avenro",
    bio: "Muhammad founded Avenro to help growing businesses get websites and web applications that are fast, clear and built to last.",
  },
} as const;

export type AuthorId = keyof typeof authors;
export type Author = (typeof authors)[AuthorId];

export const authorIds = Object.keys(authors) as AuthorId[];
