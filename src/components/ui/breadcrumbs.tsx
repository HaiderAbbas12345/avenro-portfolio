import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, type Crumb } from "@/lib/seo/structured-data";

/** Visible breadcrumbs plus matching BreadcrumbList structured data. */
export function Breadcrumbs({ items, tone = "dark" }: { items: Crumb[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const crumbs = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-sm ${dark ? "text-white/50" : "text-ink-subtle"}`}>
          {crumbs.map((crumb, i) => {
            const last = i === crumbs.length - 1;
            return (
              <li key={crumb.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className={`line-clamp-1 ${dark ? "text-white/80" : "text-ink-muted"}`}>
                    {crumb.name}
                  </span>
                ) : (
                  <>
                    <Link href={crumb.path} className={dark ? "hover:text-white" : "hover:text-ink"}>
                      {crumb.name}
                    </Link>
                    <span aria-hidden="true">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
