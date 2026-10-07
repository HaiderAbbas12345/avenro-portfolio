import { cache } from "react";
import { FieldReader, readCollection } from "./collection";
import { serviceSlugs, type ServiceSlug } from "./service-slugs";
import { serviceGroupIds, type ServiceGroupId } from "./company";

export type ServiceItem = { title: string; description: string };
export type FaqItem = { question: string; answer: string };

export type Service = {
  slug: ServiceSlug;
  url: string;
  title: string;
  /** Search-engine title, e.g. "Business Website Design & Development Services". */
  seoTitle: string;
  group: ServiceGroupId;
  /** Hero photo for the service page. */
  image: string;
  imageAlt: string;
  /** Short label used in cards and navigation. */
  shortTitle: string;
  /** One-line card summary. */
  summary: string;
  /** Meta description. */
  description: string;
  headline: string;
  intro: string;
  audience: string[];
  deliverables: ServiceItem[];
  process: ServiceItem[];
  technologies: string[];
  faqs: FaqItem[];
  cta: { title: string; text: string };
  order: number;
  body: string;
};

export const getAllServices = cache((): Service[] => {
  return readCollection("services")
    .map((entry) => {
      const f = new FieldReader(entry);
      if (!serviceSlugs.includes(entry.slug as ServiceSlug)) {
        throw new Error(`${entry.file}: add "${entry.slug}" to serviceSlugs in service-slugs.ts first.`);
      }
      const service: Service = {
        slug: entry.slug as ServiceSlug,
        url: `/services/${entry.slug}`,
        title: f.string("title"),
        seoTitle: f.optionalString("seoTitle") ?? f.string("title"),
        group: f.oneOf("group", serviceGroupIds),
        image: f.string("image"),
        imageAlt: f.string("imageAlt"),
        shortTitle: f.string("shortTitle"),
        summary: f.string("summary"),
        description: f.string("description"),
        headline: f.string("headline"),
        intro: f.string("intro"),
        audience: f.stringList("audience", { required: true }),
        deliverables: f.objectList<ServiceItem>("deliverables", ["title", "description"]),
        process: f.objectList<ServiceItem>("process", ["title", "description"]),
        technologies: f.stringList("technologies"),
        faqs: f.objectList<FaqItem>("faqs", ["question", "answer"]),
        cta: f.optionalObject("cta", ["title", "text"]) ?? {
          title: "Have a project in mind?",
          text: "Tell us what you are working on and we will reply within two business days.",
        },
        order: f.optionalNumber("order") ?? 100,
        body: entry.body,
      };
      return service;
    })
    .sort((a, b) => a.order - b.order);
});

export function getService(slug: string) {
  return getAllServices().find((service) => service.slug === slug);
}
