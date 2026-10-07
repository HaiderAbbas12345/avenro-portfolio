import Link from "next/link";
import { site } from "@/lib/site";
import { getAllServices, serviceGroups } from "@/lib/content";
import { Logo } from "@/components/ui/logo";
import { TrackedAnchor } from "@/components/ui/tracked-link";

export function SiteFooter() {
  const services = getAllServices();
  const year = new Date().getFullYear();
  const social = Object.entries(site.social).filter(([, url]) => url);
  const socialLabel: Record<string, string> = { linkedin: "LinkedIn", github: "GitHub", x: "X" };

  const columns = [
    ...serviceGroups.map((group) => ({
      title: group.name,
      links: services.filter((s) => s.group === group.id).map((s) => ({ label: s.shortTitle, href: s.url })),
    })),
    {
      title: "Company",
      links: [
        { label: "Work", href: "/work" },
        { label: "About", href: "/about" },
        { label: "Insights", href: "/blog" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-night text-white">
      <div className="container-page py-16 sm:py-20">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_2.4fr]">
          <div className="max-w-sm">
            <Link href="/" aria-label="Avenro — home" className="inline-block rounded-md">
              <Logo tone="dark" />
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-night-muted">{site.description}</p>
            <TrackedAnchor
              href={`mailto:${site.email}`}
              event="email_click"
              eventProps={{ location: "footer" }}
              className="mt-6 inline-block text-lg font-medium text-white underline decoration-white/25 underline-offset-4 hover:decoration-white"
            >
              {site.email}
            </TrackedAnchor>
            <p className="mt-3 text-sm text-night-muted">{site.serviceArea}</p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {columns.map((column) => (
              <div key={column.title}>
                <h2 className="font-mono text-xs tracking-[0.08em] text-night-muted uppercase">{column.title}</h2>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-white/75 hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-night-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {social.map(([name, url]) => (
              <li key={name}>
                <a href={url} rel="me noopener" target="_blank" className="hover:text-white">
                  {socialLabel[name] ?? name}
                </a>
              </li>
            ))}
            <li>
              <Link href="/privacy" className="hover:text-white">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white">
                Terms
              </Link>
            </li>
            <li>
              <a href="/rss.xml" className="hover:text-white">
                RSS
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
