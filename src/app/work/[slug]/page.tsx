import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProjects, getProject, getRelatedProjects, getService } from "@/lib/content";
import { formatMonth } from "@/lib/format";
import { pageMetadata } from "@/lib/seo/metadata";
import { caseStudySchema } from "@/lib/seo/structured-data";
import { JsonLd } from "@/components/seo/json-ld";
import { Section, SectionHeading, Tag } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { BrowserFrame, DeviceComposition, PhoneFrame } from "@/components/ui/device-frames";
import { MdxContent } from "@/components/blog/mdx-content";
import { ProjectCard } from "@/components/work/project-card";
import { Cta } from "@/components/sections/cta";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: project.type === "concept" ? `${project.title} — Concept Case Study` : `${project.title} — Case Study`,
    description: project.description,
    path: project.url,
    image: null,
  });
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const service = getService(project.service);
  const related = getRelatedProjects(project);
  const desktopShots = project.gallery.filter((g) => g.kind === "desktop");
  const mobileShots = project.gallery.filter((g) => g.kind === "mobile");

  const facts = [
    { label: project.type === "concept" ? "Type" : "Client", value: project.client },
    { label: "Industry", value: project.industry },
    { label: "Category", value: project.category },
    { label: "Year", value: formatMonth(project.date) },
  ];

  return (
    <>
      <article>
        <header
          className="relative overflow-hidden text-white"
          style={{
            background: `linear-gradient(170deg, color-mix(in oklab, ${project.accent} 70%, #0b0c0f) 0%, #0b0c0f 70%)`,
          }}
        >
          <div aria-hidden="true" className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
          <div className="container-page relative pt-10 sm:pt-14">
            <Breadcrumbs
              items={[
                { name: "Work", path: "/work" },
                { name: project.title, path: project.url },
              ]}
            />
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs tracking-[0.08em] text-white/70 uppercase">{project.category}</span>
              {project.type === "concept" && <Tag tone="dark">Concept project</Tag>}
            </div>
            <h1 className="mt-4 max-w-4xl text-4xl leading-[1.06] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 text-pretty sm:text-xl">{project.summary}</p>

            <dl className="mt-10 grid max-w-4xl grid-cols-2 gap-x-8 gap-y-5 border-t border-white/15 pt-6 sm:grid-cols-4">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="font-mono text-[11px] tracking-[0.08em] text-white/50 uppercase">{fact.label}</dt>
                  <dd className="mt-1.5 text-sm font-medium">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mx-auto mt-14 max-w-5xl pb-0 [mask-image:linear-gradient(to_bottom,black_80%,transparent)]">
              <DeviceComposition
                screen={project.screen}
                screenAlt={project.screenAlt}
                mobile={project.mobile}
                mobileAlt={project.mobileAlt}
                priority
                tone="dark"
              />
            </div>
          </div>
        </header>

        {project.highlights.length > 0 && (
          <div className="border-b border-line bg-surface">
            <ul className="container-page grid gap-6 py-10 sm:grid-cols-3">
              {project.highlights.map((h, i) => (
                <li key={h} className="flex gap-4">
                  <span className="font-mono text-xs leading-6" style={{ color: project.accent }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="leading-relaxed text-ink">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Section>
          <div className="grid gap-12 lg:grid-cols-[1fr_2.2fr] lg:gap-16">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <dl className="divide-y divide-line border-y border-line text-sm">
                <div className="py-4">
                  <dt className="text-ink-subtle">Services</dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {project.services.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </dd>
                </div>
                <div className="py-4">
                  <dt className="text-ink-subtle">Technology</dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <Tag key={tech}>{tech}</Tag>
                    ))}
                  </dd>
                </div>
                {service && (
                  <div className="flex justify-between gap-4 py-4">
                    <dt className="text-ink-subtle">Related service</dt>
                    <dd>
                      <Link href={service.url} className="font-medium underline underline-offset-4 hover:text-accent">
                        {service.shortTitle}
                      </Link>
                    </dd>
                  </div>
                )}
                {project.liveUrl && (
                  <div className="flex justify-between gap-4 py-4">
                    <dt className="text-ink-subtle">Live site</dt>
                    <dd>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-4">
                        Visit ↗
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
              {project.type === "concept" && (
                <p className="mt-6 text-sm leading-relaxed text-ink-subtle">
                  This is a self-initiated concept project, not client work. It shows how we would approach this type of
                  problem.
                </p>
              )}
            </aside>
            <MdxContent source={project.body} />
          </div>
        </Section>

        {project.gallery.length > 0 && (
          <section aria-labelledby="gallery-title" className="bg-sunken py-20 sm:py-24">
            <div className="container-page">
              <h2 id="gallery-title" className="mb-10 text-3xl font-semibold tracking-tight">
                Inside the project
              </h2>
              <div className={`grid items-start gap-8 ${mobileShots.length ? "lg:grid-cols-[2.2fr_1fr]" : ""}`}>
                <div className="space-y-8">
                  {desktopShots.map((shot) => (
                    <figure key={shot.src} className="reveal">
                      <BrowserFrame src={shot.src} alt={shot.alt} sizes="(min-width: 1024px) 720px, 100vw" />
                      <figcaption className="mt-3 text-sm text-ink-muted">{shot.caption}</figcaption>
                    </figure>
                  ))}
                </div>
                {mobileShots.length > 0 && (
                  <div className="grid grid-cols-2 gap-6 lg:grid-cols-1">
                    {mobileShots.map((shot) => (
                      <figure key={shot.src} className="reveal mx-auto w-full max-w-[280px]">
                        <PhoneFrame src={shot.src} alt={shot.alt} sizes="280px" />
                        <figcaption className="mt-4 text-sm text-ink-muted">{shot.caption}</figcaption>
                      </figure>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </article>

      {related.length > 0 && (
        <Section labelledBy="more-work">
          <SectionHeading id="more-work" eyebrow="More work" title="Related projects" />
          <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Section>
      )}

      <Cta
        location={`case_study_${project.slug}`}
        title={service ? service.cta.title : undefined}
        text={service ? service.cta.text : undefined}
      />
      <JsonLd data={caseStudySchema(project)} />
    </>
  );
}
