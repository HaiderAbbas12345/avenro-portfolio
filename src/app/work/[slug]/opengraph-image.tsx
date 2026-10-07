import { getAllProjects, getProject } from "@/lib/content";
import { ogContentType, ogSize, renderOgImage } from "@/lib/seo/og-image";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Avenro case study";

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return renderOgImage({
    eyebrow: project?.type === "concept" ? "Concept project" : "Case study",
    title: project?.title ?? "Avenro",
    footer: project?.category,
  });
}
