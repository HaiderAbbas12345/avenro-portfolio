import Link from "next/link";
import { mainNav } from "@/lib/site";
import { getAllServices, serviceGroups } from "@/lib/content";
import { Logo } from "@/components/ui/logo";
import { ArrowRight, ButtonLink } from "@/components/ui/button";
import { NavLink } from "./nav-link";
import { MobileMenu } from "./mobile-menu";
import { ServiceIcon } from "@/components/services/service-icon";

export function SiteHeader() {
  const services = getAllServices();
  const menuServices = services.map((s) => ({ label: s.shortTitle, href: s.url }));

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-night/[0.97] text-white">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link href="/" aria-label="Avenro — home" className="-m-1 rounded-md p-1">
          <Logo tone="dark" />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) =>
              item.href === "/services" ? (
                <li key={item.href} className="group relative">
                  <NavLink href={item.href} hasMenu>
                    {item.label}
                  </NavLink>
                  {/* CSS-only dropdown: opens on hover and on keyboard focus. */}
                  <div className="invisible absolute top-full left-1/2 w-[46rem] -translate-x-1/2 pt-3 opacity-0 transition-[opacity,visibility] duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <div className="grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-night-raised p-3 shadow-2xl">
                      {serviceGroups.map((group) => (
                        <div key={group.id} className="p-2">
                          <p className="px-2 pb-2 font-mono text-[11px] tracking-[0.08em] text-night-muted uppercase">
                            {group.name}
                          </p>
                          <ul>
                            {services
                              .filter((s) => s.group === group.id)
                              .map((s) => (
                                <li key={s.slug}>
                                  <Link
                                    href={s.url}
                                    className="flex gap-3 rounded-lg p-2 transition-colors hover:bg-white/5"
                                  >
                                    <ServiceIcon slug={s.slug} className="mt-0.5 size-5 shrink-0 text-accent-bright" />
                                    <span>
                                      <span className="block text-sm font-medium text-white">{s.shortTitle}</span>
                                      <span className="mt-0.5 line-clamp-2 block text-xs leading-relaxed text-night-muted">
                                        {s.summary}
                                      </span>
                                    </span>
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        </div>
                      ))}
                      <Link
                        href="/services"
                        className="col-span-3 flex items-center justify-between rounded-lg bg-white/5 px-4 py-3 text-sm text-white hover:bg-white/10"
                      >
                        <span>Explore all services and engagement models</span>
                        <ArrowRight />
                      </Link>
                    </div>
                  </div>
                </li>
              ) : (
                <li key={item.href}>
                  <NavLink href={item.href}>{item.label}</NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink
            href="/contact"
            event="cta_start_project"
            eventProps={{ location: "header" }}
            className="hidden bg-white !text-ink hover:bg-white/90 sm:inline-flex"
          >
            Start a Project
          </ButtonLink>
          <MobileMenu services={menuServices} />
        </div>
      </div>
    </header>
  );
}
