import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getActiveCategories, getCategory, getPostsByCategory } from "@/lib/content";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHeader, Section } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { BlogListing } from "@/components/blog/blog-listing";
import { Cta } from "@/components/sections/cta";

export const dynamicParams = false;

/** Only categories with published articles get a page — no empty archives. */
export function generateStaticParams() {
  return getActiveCategories().map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/category/[category]">): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return pageMetadata({
    title: `${category.name} Articles`,
    description: category.description,
    path: `/blog/category/${category.slug}`,
  });
}

export default async function CategoryPage({ params }: PageProps<"/blog/category/[category]">) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  const posts = getPostsByCategory(slug);
  if (!category || !posts.length) notFound();

  return (
    <>
      <PageHeader eyebrow="Avenro Insights" title={category.name} description={category.description}>
        <Breadcrumbs
          items={[
            { name: "Insights", path: "/blog" },
            { name: category.name, path: `/blog/category/${category.slug}` },
          ]}
        />
      </PageHeader>
      <Section>
        <BlogListing posts={posts} activeCategory={category.slug} />
      </Section>
      <Cta location={`blog_category_${category.slug}`} />
    </>
  );
}
