import type { Metadata } from "next";
import Image from "next/image";
import { getAllServices, serviceGroups } from "@/lib/content";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHeader, Section, SectionHeading } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ArrowRight, ButtonLink } from "@/components/ui/button";
import { TrackedLink } from "@/components/ui/tracked-link";
import { ServiceIcon } from "@/components/services/service-icon";
import { EngagementModels, ProcessTimeline } from "@/components/sections/company-sections";
import { TechStrip } from "@/components/sections/tech-strip";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { itemListSchema } from "@/lib/seo/structured-data";

export const metadata: Metadata = pageMetadata({
  title: "Software Development & Design Services",
  description:
    "Avenro's services: UI/UX design, business website development, custom web applications, SaaS product development, white-label agency partnerships and ongoing support.",
  path: "/services",
});

const engagementFaqs = [
  {
    question: "How does a project start?",
    answer:
      "With a short call to understand what you need, followed by a written proposal covering scope, timeline, cost and what we need from you. Work begins once the proposal is agreed.",
  },
  {
    question: "Do you work with clients outside your time zone?",
    answer:
      "Yes. We work remotely with clients in the US, UK, Europe and elsewhere, and agree regular overlap hours for calls and reviews at the start of every project.",
  },
  {
    question: "Who owns the code and design?",
    answer:
      "You do. Once a project is paid for, the code, designs and content are yours, delivered into repositories and accounts you control.",
  },
  {
    question: "Can we combine services?",
    answer:
      "Yes — most projects do. A typical engagement combines UI/UX design with website or application development, followed by a support plan after launch.",
  },
];

export default function ServicesPage() {
  const services = getAllServices();

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Design, engineering and support for modern web products."
        description="Six focused services across the full product lifecycle — delivered by one accountable team with a clear process, defined deliverables and a fixed scope agreed up front."
        actions={
          <ButtonLink
            href="/contact"
            size="lg"
            event="cta_start_project"
            eventProps={{ location: "services_header" }}
            className="bg-white !text-ink hover:bg-white/90"
          >
            Start a Project <ArrowRight />
          </ButtonLink>
        }
      >
        <Breadcrumbs items={[{ name: "Services", path: "/services" }]} />
      </PageHeader>

      {serviceGroups.map((group, gi) => {
        const groupServices = services.filter((s) => s.group === group.id);
        if (!groupServices.length) return null;
        return (
          <Section key={group.id} labelledBy={`group-${group.id}`} tone={gi === 1 ? "surface" : "canvas"}>
            <SectionHeading
              id={`group-${group.id}`}
              eyebrow={`0${gi + 1} — ${group.name}`}
              title={group.name}
              description={group.description}
            />
            <div className={`grid gap-6 ${groupServices.length > 1 ? "md:grid-cols-2" : ""} ${groupServices.length > 2 ? "lg:grid-cols-3" : ""}`}>
              {groupServices.map((service) => (
                <article
                  key={service.slug}
                  className="group reveal relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-ink/30"
                >
                  <div className="overflow-hidden bg-sunken">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      width={900}
                      height={560}
                      sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                      className={`h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${
                        groupServices.length === 1 ? "aspect-[21/9]" : "aspect-[16/10]"
                      }`}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                      <ServiceIcon slug={service.slug} className="size-5" />
                    </span>
                    <h3 className="mt-5 text-2xl font-semibold tracking-tight">
                      <TrackedLink
                        href={service.url}
                        event="service_click"
                        eventProps={{ service: service.slug, location: "services_index" }}
                        className="after:absolute after:inset-0"
                      >
                        {service.title}
                      </TrackedLink>
                    </h3>
                    <p className="mt-3 leading-relaxed text-ink-muted">{service.summary}</p>
                    <ul className="mt-5 space-y-2 border-t border-line pt-5">
                      {service.deliverables.slice(0, 4).map((d) => (
                        <li key={d.title} className="flex items-center gap-2.5 text-sm text-ink-muted">
                          <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                          {d.title}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-medium" aria-hidden="true">
                      Explore {service.shortTitle.toLowerCase()}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </Section>
        );
      })}

      <TechStrip title="Technologies we build with" />

      <Section labelledBy="services-process" tone="surface">
        <SectionHeading id="services-process" eyebrow="Process" title="How every engagement runs" />
        <ProcessTimeline />
      </Section>

      <Section labelledBy="services-models" tone="dark">
        <SectionHeading id="services-models" tone="dark" eyebrow="Engagement models" title="Flexible ways to work together." />
        <EngagementModels />
      </Section>

      <Section labelledBy="engagement-faq">
        <Faq id="engagement-faq" title="Working with Avenro" items={engagementFaqs} />
      </Section>

      <Cta location="services_index" />
      <JsonLd data={itemListSchema(services.map((s) => ({ name: s.title, url: s.url })))} />
    </>
  );
}
