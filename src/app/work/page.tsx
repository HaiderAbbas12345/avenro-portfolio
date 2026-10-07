import type { Metadata } from "next";
import { getAllProjects } from "@/lib/content";
import { pageMetadata } from "@/lib/seo/metadata";
import { itemListSchema } from "@/lib/seo/structured-data";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHeader, Section } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ProjectCard } from "@/components/work/project-card";
import { Cta } from "@/components/sections/cta";

export const metadata: Metadata = pageMetadata({
  title: "Our Work — Case Studies & Projects",
  description:
    "Case studies from Avenro: business websites, web applications, SaaS products and white-label agency work — each documented from challenge to outcome.",
  path: "/work",
});

export default function WorkPage() {
  const projects = getAllProjects();
  const hasConcepts = projects.some((p) => p.type === "concept");

  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Websites, applications and products we have designed and built."
        description="Every project is written up the same way — the problem, our approach, what we built and the honest outcome — so you can judge how we work, not just how it looks."
      >
        <Breadcrumbs items={[{ name: "Work", path: "/work" }]} />
      </PageHeader>

      <Section labelledBy="projects-title">
        <h2 id="projects-title" className="sr-only">
          All projects
        </h2>
        {hasConcepts && (
          <p className="mb-14 max-w-3xl rounded-2xl border border-line bg-surface p-5 text-[0.9375rem] leading-relaxed text-ink-muted">
            <span className="font-medium text-ink">A note on concept projects.</span> Projects marked “Concept” are
            self-initiated builds that show how we approach a particular kind of problem. They are not client
            engagements, and we label them clearly.
          </p>
        )}
        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} headingLevel="h3" priority={i < 2} />
          ))}
        </div>
      </Section>

      <Cta
        location="work_index"
        title="Want work like this for your business?"
        text="Tell us about your project and we will reply with honest advice on scope, timeline and cost."
      />
      <JsonLd data={itemListSchema(projects.map((p) => ({ name: p.title, url: p.url })))} />
    </>
  );
}
