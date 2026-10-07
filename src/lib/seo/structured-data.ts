import { absoluteUrl, site, socialProfiles } from "@/lib/site";
import type { Post, Project, Service } from "@/lib/content";

/**
 * schema.org builders. Only mark up information that is visible on the page.
 */

const organizationId = `${site.url}/#organization`;

export function organizationSchema() {
  const sameAs = socialProfiles();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: site.name,
    url: site.url,
    logo: absoluteUrl("/logo.png"),
    description: site.positioning,
    slogan: site.tagline,
    email: site.email,
    founder: { "@type": "Person", name: site.founder.name, jobTitle: site.founder.role },
    areaServed: ["United States", "United Kingdom", "Europe"],
    knowsAbout: [
      "Website development",
      "Web application development",
      "SaaS product development",
      "UI/UX design",
      "Next.js",
      "React",
      "TypeScript",
      "Technical SEO",
      "Web accessibility",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.email,
      availableLanguage: ["English"],
    },
    ...(sameAs.length && { sameAs }),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    description: site.description,
    publisher: { "@id": organizationId },
    inLanguage: "en",
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function articleSchema(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: absoluteUrl(post.url),
    mainEntityOfPage: absoluteUrl(post.url),
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    image: absoluteUrl(post.image ?? `${post.url}/opengraph-image`),
    author: { "@type": "Person", name: post.author.name },
    publisher: { "@id": organizationId },
    articleSection: post.category.name,
    ...(post.tags.length && { keywords: post.tags.join(", ") }),
  };
}

export function caseStudySchema(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: absoluteUrl(project.url),
    dateCreated: project.date,
    image: [project.image, ...project.gallery.map((g) => g.src)].map((src) => absoluteUrl(src)),
    creator: { "@id": organizationId },
    keywords: project.technologies.join(", "),
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: absoluteUrl(service.url),
    serviceType: service.shortTitle,
    image: absoluteUrl(service.image),
    provider: { "@id": organizationId },
    areaServed: ["United States", "United Kingdom", "Europe"],
  };
}

export function itemListSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.url),
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
