import { getAllPosts } from "./posts";
import { getAllProjects } from "./projects";

export type ActivityItem = {
  kind: "Article" | "Case study" | "Concept project" | "Update";
  title: string;
  url: string;
  date: string;
};

/**
 * The newest published content across collections, using real publication
 * dates only. Powers "Latest from Avenro".
 */
export function getLatestActivity(limit = 4): ActivityItem[] {
  const posts: ActivityItem[] = getAllPosts().map((post) => ({
    kind: post.category.slug === "avenro-updates" ? "Update" : "Article",
    title: post.title,
    url: post.url,
    date: post.date,
  }));
  const projects: ActivityItem[] = getAllProjects().map((project) => ({
    kind: project.type === "concept" ? "Concept project" : "Case study",
    title: project.title,
    url: project.url,
    date: project.date,
  }));
  return [...posts, ...projects].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
}
