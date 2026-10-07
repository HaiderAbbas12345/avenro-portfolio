import Image from "next/image";
import type { Service, ServiceSlug } from "@/lib/content";
import { serviceGroups } from "@/lib/content";
import { BrowserFrame, PhoneFrame } from "@/components/ui/device-frames";
import { TrackedLink } from "@/components/ui/tracked-link";
import { ArrowRight } from "@/components/ui/button";
import { ServiceIcon } from "./service-icon";

/** Layout order and column spans for the bento grid. */
const layout: { slug: ServiceSlug; wide: boolean }[] = [
  { slug: "websites", wide: true },
  { slug: "ui-ux-design", wide: false },
  { slug: "web-applications", wide: false },
  { slug: "saas-product-development", wide: true },
  { slug: "development-partnerships", wide: true },
  { slug: "maintenance-support", wide: false },
];

export function ServiceBento({ services }: { services: Service[] }) {
  const items = layout
    .map((l) => ({ ...l, service: services.find((s) => s.slug === l.slug) }))
    .filter((i): i is typeof i & { service: Service } => Boolean(i.service));

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {items.map(({ service, wide }) => (
        <article
          key={service.slug}
          className={`group reveal relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-ink/30 ${
            wide ? "lg:col-span-2" : ""
          }`}
        >
          <div className={`flex flex-1 flex-col gap-6 p-7 sm:p-8 ${wide ? "md:flex-row md:items-stretch" : ""}`}>
            <div className={`flex flex-col ${wide ? "md:w-[42%] md:shrink-0" : ""}`}>
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <ServiceIcon slug={service.slug} className="size-5" />
                </span>
                <span className="font-mono text-[11px] tracking-[0.08em] text-ink-subtle uppercase">
                  {serviceGroups.find((g) => g.id === service.group)?.name}
                </span>
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                <TrackedLink
                  href={service.url}
                  event="service_click"
                  eventProps={{ service: service.slug, location: "home_bento" }}
                  className="after:absolute after:inset-0"
                >
                  {service.shortTitle}
                </TrackedLink>
              </h3>
              <p className="mt-3 leading-relaxed text-ink-muted">{service.summary}</p>
              <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-medium" aria-hidden="true">
                Learn more
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
            <div className="relative min-h-52 flex-1 overflow-hidden rounded-xl bg-sunken" aria-hidden="true">
              <ServiceVisual slug={service.slug} />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

/** Decorative visual for each service card. */
function ServiceVisual({ slug }: { slug: ServiceSlug }) {
  switch (slug) {
    case "websites":
      return (
        <>
          <BrowserFrame
            src="/images/work/kestrel-roofing-website-screen.webp"
            alt=""
            sizes="(min-width: 1024px) 420px, 80vw"
            className="absolute top-6 left-6 w-[115%] transition-transform duration-500 group-hover:-translate-y-1"
          />
          <PhoneFrame
            src="/images/work/kestrel-roofing-mobile.webp"
            alt=""
            sizes="140px"
            className="absolute right-5 -bottom-10 w-[30%] max-w-[140px]"
          />
        </>
      );
    case "web-applications":
      return (
        <BrowserFrame
          src="/images/work/service-operations-dashboard-screen.webp"
          alt=""
          sizes="(min-width: 1024px) 380px, 80vw"
          className="absolute top-6 left-6 w-[150%] transition-transform duration-500 group-hover:-translate-y-1"
        />
      );
    case "saas-product-development":
      return (
        <>
          <BrowserFrame
            src="/images/work/saas-analytics-platform.webp"
            alt=""
            sizes="(min-width: 1024px) 420px, 80vw"
            className="absolute top-6 left-6 w-[115%] transition-transform duration-500 group-hover:-translate-y-1"
          />
          <PhoneFrame
            src="/images/work/saas-analytics-platform-mobile.webp"
            alt=""
            sizes="140px"
            className="absolute right-5 -bottom-10 w-[30%] max-w-[140px]"
          />
        </>
      );
    case "ui-ux-design":
      return (
        <Image
          src="/images/photos/design-wireframes.jpg"
          alt=""
          fill
          sizes="(min-width: 1024px) 360px, 90vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      );
    case "development-partnerships":
      return (
        <BrowserFrame
          src="/images/work/agency-client-portal-approvals.webp"
          alt=""
          sizes="(min-width: 1024px) 420px, 80vw"
          className="absolute top-6 left-6 w-[115%] transition-transform duration-500 group-hover:-translate-y-1"
        />
      );
    case "maintenance-support":
      return <SupportChecklist />;
  }
}

function SupportChecklist() {
  const items = ["Dependencies updated", "Backups verified", "Uptime monitored", "Core Web Vitals reviewed", "Monthly report sent"];
  return (
    <div className="absolute inset-0 flex items-center justify-center p-6">
      <div className="w-full max-w-xs rounded-xl border border-line bg-surface p-4 shadow-[0_20px_50px_-25px_rgb(0_0_0/0.35)]">
        <p className="mb-3 font-mono text-[11px] tracking-[0.08em] text-ink-subtle uppercase">Monthly care plan</p>
        <ul className="space-y-2.5">
          {items.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-sm text-ink">
              <span className="flex size-5 items-center justify-center rounded-full bg-success/10 text-success">
                <svg viewBox="0 0 16 16" className="size-3" fill="none">
                  <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
