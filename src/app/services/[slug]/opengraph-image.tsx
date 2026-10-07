import { getAllServices, getService } from "@/lib/content";
import { ogContentType, ogSize, renderOgImage } from "@/lib/seo/og-image";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Avenro service";

export function generateStaticParams() {
  return getAllServices().map((service) => ({ slug: service.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  return renderOgImage({
    eyebrow: service ? `Services · ${service.shortTitle}` : "Services",
    title: service?.headline ?? "Avenro",
    footer: service?.title,
  });
}
