import type { Metadata } from "next";
import { getAllPosts } from "@/lib/content";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHeader, Section } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { BlogListing } from "@/components/blog/blog-listing";
import { Cta } from "@/components/sections/cta";

export const metadata: Metadata = pageMetadata({
  title: "Insights",
  description:
    "Practical articles on business websites, web applications and software development from the team at Avenro.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <>
      <PageHeader
        eyebrow="Avenro Insights"
        title="Practical thinking on websites and software."
        description="Clear answers to the questions businesses ask before they build, and notes from the work we do."
      >
        <Breadcrumbs items={[{ name: "Insights", path: "/blog" }]} />
      </PageHeader>
      <Section>
        <BlogListing posts={posts} />
      </Section>
      <Cta location="blog_index" />
    </>
  );
}
