import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { getActiveCategories, getAllPages, getAllPosts, getAllProjects, getAllServices } from "@/lib/content";

/** Regenerated on every build, so new content is listed automatically. */
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().filter((post) => !post.draft);
  const projects = getAllProjects();
  const latestPost = posts[0]?.updated ?? posts[0]?.date;
  const latestProject = projects.map((p) => p.updated ?? p.date).sort().at(-1);

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), priority: 1 },
    { url: absoluteUrl("/services"), priority: 0.9 },
    { url: absoluteUrl("/work"), lastModified: latestProject, priority: 0.8 },
    { url: absoluteUrl("/blog"), lastModified: latestPost, priority: 0.8 },
    { url: absoluteUrl("/about"), priority: 0.6 },
    { url: absoluteUrl("/contact"), priority: 0.7 },
  ];

  return [
    ...staticPages,
    ...getAllServices().map((service) => ({
      url: absoluteUrl(service.url),
      priority: 0.9,
      images: [absoluteUrl(service.image)],
    })),
    ...projects.map((project) => ({
      url: absoluteUrl(project.url),
      lastModified: project.updated ?? project.date,
      priority: 0.7,
      images: [project.screen, ...(project.mobile ? [project.mobile] : []), ...project.gallery.map((g) => g.src)]
        .filter((src, i, all) => all.indexOf(src) === i)
        .map((src) => absoluteUrl(src)),
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(post.url),
      lastModified: post.updated ?? post.date,
      priority: 0.7,
      ...(post.image && { images: [absoluteUrl(post.image)] }),
    })),
    ...getActiveCategories().map((category) => ({
      url: absoluteUrl(`/blog/category/${category.slug}`),
      priority: 0.4,
    })),
    ...getAllPages().map((page) => ({
      url: absoluteUrl(`/${page.slug}`),
      lastModified: page.updated,
      priority: 0.2,
    })),
  ];
}
