import { getPage } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { PageHeader } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { MdxContent } from "@/components/blog/mdx-content";

/** Renders a standalone page from content/pages/[slug].mdx. */
export function ContentPageView({ slug, path }: { slug: string; path: string }) {
  const page = getPage(slug);
  return (
    <>
      <PageHeader title={page.title} description={`Last updated ${formatDate(page.updated)}`}>
        <Breadcrumbs items={[{ name: page.title, path }]} />
      </PageHeader>
      <div className="container-page py-12 sm:py-16">
        <MdxContent source={page.body} />
      </div>
    </>
  );
}
