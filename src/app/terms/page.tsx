import type { Metadata } from "next";
import { getPage } from "@/lib/content";
import { pageMetadata } from "@/lib/seo/metadata";
import { ContentPageView } from "@/components/sections/legal-page";

export function generateMetadata(): Metadata {
  const page = getPage("terms");
  return pageMetadata({ title: page.title, description: page.description, path: "/terms" });
}

export default function TermsPage() {
  return <ContentPageView slug="terms" path="/terms" />;
}
