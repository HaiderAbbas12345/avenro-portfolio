import { site } from "@/lib/site";
import { ogContentType, ogSize, renderOgImage } from "@/lib/seo/og-image";

export const alt = `${site.name} — ${site.tagline}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: site.tagline,
    title: "We build modern websites, web applications, and digital products for growing businesses.",
  });
}
