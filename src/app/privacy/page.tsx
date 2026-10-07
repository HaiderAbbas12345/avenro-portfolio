import type { Metadata } from "next";
import { getPage } from "@/lib/content";
import { pageMetadata } from "@/lib/seo/metadata";
import { ContentPageView } from "@/components/sections/legal-page";

export function generateMetadata(): Metadata {
  const page = getPage("privacy");
  return pageMetadata({ title: page.title, description: page.description, path: "/privacy" });
}

export default function PrivacyPage() {
  return <ContentPageView slug="privacy" path="/privacy" />;
}
