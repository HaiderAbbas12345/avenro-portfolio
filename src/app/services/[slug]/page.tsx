import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllPosts, getAllServices, getProjectsForService, getService, serviceGroups } from "@/lib/content";
import { pageMetadata } from "@/lib/seo/metadata";
import { serviceSchema } from "@/lib/seo/structured-data";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHeader, Section, SectionHeading } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ArrowRight, ButtonLink } from "@/components/ui/button";
import { TrackedLink } from "@/components/ui/tracked-link";
import { ProjectCard } from "@/components/work/project-card";
import { ArticleCard } from "@/components/blog/article-card";
import { MdxContent } from "@/components/blog/mdx-content";
import { ServiceIcon } from "@/components/services/service-icon";
import { TechStrip } from "@/components/sections/tech-strip";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";
import { techLogos } from "@/components/ui/tech-logos";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllServices().map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.seoTitle,
    description: service.description,
    path: service.url,
    image: null,
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const projects = getProjectsForService(service.slug).slice(0, 2);
  const posts = getAllPosts()
    .filter((post) => post.service === service.slug)
    .slice(0, 3);
  const otherServices = getAllServices().filter((s) => s.slug !== service.slug);
  const groupName = serviceGroups.find((g) => g.id === service.group)?.name;
  const logoNames = techLogos.map((l) => l.name).filter((name) => service.technologies.some((t) => t.includes(name)));

  return (
    <>
      <PageHeader
        eyebrow={`${groupName} · ${service.shortTitle}`}
        title={service.headline}
        description={service.intro}
        actions={
          <>
            <ButtonLink
              href="/contact"
              size="lg"
              event="cta_start_project"
              eventProps={{ location: `service_${service.slug}` }}
              className="bg-white !text-ink hover:bg-white/90"
            >
              Start a Project
              <ArrowRight />
            </ButtonLink>
            <ButtonLink href="/work" size="lg" variant="secondary" className="!border-white/20 !bg-white/5 !text-white hover:!border-white/50">
              See our work
            </ButtonLink>
          </>
        }
        aside={
          <div className="relative">
            <Image
              src={service.image}
              alt={service.imageAlt}
              width={1000}
              height={1100}
              priority
              sizes="(min-width: 1024px) 460px, 100vw"
              className="aspect-[5/4] h-auto w-full rounded-2xl object-cover ring-1 ring-white/10 lg:aspect-[4/4.4]"
            />
            <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-xl border border-white/10 bg-night-raised/95 px-4 py-3 shadow-2xl sm:flex">
              <span className="flex size-9 items-center justify-center rounded-lg bg-accent/20 text-accent-bright">
                <ServiceIcon slug={service.slug} className="size-5" />
              </span>
              <span>
                <span className="block text-sm font-medium text-white">{service.title}</span>
                <span className="block text-xs text-night-muted">{service.deliverables.length} core deliverables</span>
              </span>
            </div>
          </div>
        }
      >
        <Breadcrumbs
          items={[
            { name: "Services", path: "/services" },
            { name: service.shortTitle, path: service.url },
          ]}
        />
      </PageHeader>

      <Section labelledBy="audience-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 id="audience-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Who it is for
            </h2>
            <p className="mt-4 leading-relaxed text-ink-muted">{service.summary}</p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {service.audience.map((item) => (
              <li key={item} className="reveal flex gap-4 rounded-2xl border border-line bg-surface p-6 leading-relaxed text-ink-muted">
                <svg viewBox="0 0 16 16" className="mt-1 size-4 shrink-0 text-accent" fill="none" aria-hidden="true">
                  <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section labelledBy="deliverables-title" tone="surface">
        <SectionHeading id="deliverables-title" eyebrow="What you get" title="What is included" />
        <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {service.deliverables.map((item, i) => (
            <div key={item.title} className="reveal bg-surface p-7">
              <dt className="text-lg font-semibold tracking-tight">
                <span className="mb-4 block font-mono text-xs font-normal text-accent" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.title}
              </dt>
              <dd className="mt-2 leading-relaxed text-ink-muted">{item.description}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {service.body.trim() && (
        <Section labelledBy="details-title">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
            <h2 id="details-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Our approach
            </h2>
            <MdxContent source={service.body} />
          </div>
        </Section>
      )}

      <Section labelledBy="process-title" tone="dark">
        <SectionHeading id="process-title" tone="dark" eyebrow="Process" title="How the project runs" />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {service.process.map((step, i) => (
            <li key={step.title} className="reveal rounded-2xl border border-white/10 bg-white/[0.03] p-7">
              <span className="font-mono text-xs text-accent-bright">Step {i + 1}</span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-night-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </Section>
      {logoNames.length > 0 ? (
        <TechStrip names={logoNames} title={`Technology for ${service.shortTitle.toLowerCase()}`} />
      ) : (
        service.technologies.length > 0 && (
          <div className="bg-night text-white">
            <p className="container-page border-t border-white/10 py-10 text-center text-sm text-night-muted">
              <span className="font-medium text-white">Typical tools: </span>
              {service.technologies.join(" · ")}
            </p>
          </div>
        )
      )}

      {projects.length > 0 && (
        <Section labelledBy="related-work">
          <SectionHeading id="related-work" eyebrow="Related work" title="See it in practice" />
          <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Section>
      )}

      {posts.length > 0 && (
        <Section labelledBy="related-reading" tone="surface">
          <SectionHeading id="related-reading" eyebrow="Insights" title="Further reading" />
          <div className="grid gap-5 md:grid-cols-3">
            {posts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </Section>
      )}

      {service.faqs.length > 0 && (
        <Section labelledBy="service-faq">
          <Faq id="service-faq" title={`${service.shortTitle}: common questions`} items={service.faqs} />
        </Section>
      )}

      <Section labelledBy="other-services" tone="surface">
        <SectionHeading id="other-services" eyebrow="More services" title="Other ways we can help" />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {otherServices.map((s) => (
            <li key={s.slug}>
              <TrackedLink
                href={s.url}
                event="service_click"
                eventProps={{ service: s.slug, location: `service_${service.slug}_other` }}
                className="group flex h-full flex-col gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-ink/30"
              >
                <ServiceIcon slug={s.slug} className="size-5 text-accent" />
                <span className="font-medium">{s.shortTitle}</span>
                <ArrowRight className="mt-auto size-4 transition-transform group-hover:translate-x-1" />
              </TrackedLink>
            </li>
          ))}
        </ul>
      </Section>

      <Cta location={`service_${service.slug}`} title={service.cta.title} text={service.cta.text} />
      <JsonLd data={serviceSchema(service)} />
    </>
  );
}
