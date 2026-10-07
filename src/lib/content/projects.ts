import { cache } from "react";
import { FieldReader, byDateDesc, readCollection } from "./collection";
import { serviceSlugs, type ServiceSlug } from "./service-slugs";

/** Every case study must contain these sections in its body. */
export const caseStudySections = ["Overview", "The Challenge", "Approach", "Solution", "Result"] as const;

export type GalleryItem = { src: string; alt: string; caption: string; kind: "desktop" | "mobile" };

export type Project = {
  slug: string;
  url: string;
  title: string;
  /** Client name, or a short description for concept work. */
  client: string;
  /** "client" = real client work. "concept" = self-initiated demonstration project. */
  type: "client" | "concept";
  category: string;
  service: ServiceSlug;
  summary: string;
  description: string;
  date: string;
  updated?: string;
  technologies: string[];
  /** Framed showcase image (1600×1000) used on cards. */
  image: string;
  imageAlt: string;
  /** Frameless desktop screen shown inside a browser frame. */
  screen: string;
  screenAlt: string;
  /** Frameless mobile screen (390×844) shown inside a phone frame. */
  mobile?: string;
  mobileAlt?: string;
  /** Brand color of the project, used for tinted backgrounds. */
  accent: string;
  industry: string;
  /** Services involved, shown as tags. */
  services: string[];
  /** Three short, factual highlights of what was built. */
  highlights: string[];
  gallery: GalleryItem[];
  featured: boolean;
  order: number;
  liveUrl?: string;
  body: string;
};

export const getAllProjects = cache((): Project[] => {
  return readCollection("projects")
    .map((entry) => {
      const f = new FieldReader(entry);
      f.requireHeadings(caseStudySections);
      const project: Project = {
        slug: entry.slug,
        url: `/work/${entry.slug}`,
        title: f.string("title"),
        client: f.string("client"),
        type: f.oneOf("type", ["client", "concept"] as const),
        category: f.string("category"),
        service: f.oneOf("service", serviceSlugs),
        summary: f.string("summary"),
        description: f.string("description"),
        date: f.date("date"),
        updated: f.optionalDate("updated"),
        technologies: f.stringList("technologies", { required: true }),
        image: f.string("image"),
        imageAlt: f.string("imageAlt"),
        screen: f.string("screen"),
        screenAlt: f.string("screenAlt"),
        mobile: f.optionalString("mobile"),
        mobileAlt: entry.frontmatter.mobile ? f.string("mobileAlt") : undefined,
        accent: f.string("accent"),
        industry: f.string("industry"),
        services: f.stringList("services", { required: true }),
        highlights: f.stringList("highlights"),
        gallery: f.objectList<GalleryItem>("gallery", ["src", "alt", "caption", "kind"]),
        featured: f.boolean("featured"),
        order: f.optionalNumber("order") ?? 100,
        liveUrl: f.optionalString("liveUrl"),
        body: entry.body,
      };
      return project;
    })
    .sort((a, b) => a.order - b.order || byDateDesc(a, b));
});

export function getProject(slug: string) {
  return getAllProjects().find((project) => project.slug === slug);
}

export function getFeaturedProjects(limit = 3) {
  const projects = getAllProjects();
  const featured = projects.filter((p) => p.featured);
  return (featured.length ? featured : projects).slice(0, limit);
}

export function getProjectsForService(service: ServiceSlug) {
  return getAllProjects().filter((p) => p.service === service);
}

export function getRelatedProjects(project: Project, limit = 2) {
  const others = getAllProjects().filter((p) => p.slug !== project.slug);
  return [
    ...others.filter((p) => p.service === project.service),
    ...others.filter((p) => p.service !== project.service),
  ].slice(0, limit);
}
