/**
 * Company-wide settings. Update these as Avenro grows — the rest of the site
 * reads from here rather than hard-coding names, URLs or wording.
 */
export const site = {
  name: "Avenro",
  legalName: "Avenro",
  tagline: "Software & Digital Products",
  description:
    "We design and build modern websites, web applications, and digital products for growing businesses.",
  // Used on the About page and in structured data. Update as the company evolves.
  positioning:
    "Avenro is a software and digital product company. We design, build and support websites, web applications and SaaS products for growing businesses, startups and agencies.",
  // Where the company works — shown in the footer and contact page.
  serviceArea: "Remote-first · Serving clients in the US, UK & Europe",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://avenro.com").replace(/\/$/, ""),
  locale: "en_US",
  email: "hello@avenro.com",
  founder: {
    name: "Muhammad Haider Abbas",
    role: "Founder & CEO",
  },
  // Add profiles here once they exist; empty values are not rendered.
  social: {
    linkedin: "",
    github: "",
    x: "",
  },
} as const;

export const mainNav = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Insights", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export function absoluteUrl(path = "/") {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function socialProfiles(): string[] {
  return Object.values(site.social).filter(Boolean);
}
