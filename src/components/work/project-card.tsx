import type { Project } from "@/lib/content";
import { DeviceComposition } from "@/components/ui/device-frames";
import { TrackedLink } from "@/components/ui/tracked-link";
import { ArrowRight } from "@/components/ui/button";

/** Showcase card: the project's own brand color behind a desktop + phone composition. */
export function ProjectCard({
  project,
  headingLevel = "h3",
  priority = false,
  tone = "light",
}: {
  project: Project;
  headingLevel?: "h2" | "h3";
  priority?: boolean;
  tone?: "light" | "dark";
}) {
  const Heading = headingLevel;
  const dark = tone === "dark";
  const panel = dark
    ? `linear-gradient(160deg, color-mix(in oklab, ${project.accent} 55%, #0b0c0f), color-mix(in oklab, ${project.accent} 22%, #0b0c0f))`
    : `linear-gradient(160deg, color-mix(in oklab, ${project.accent} 22%, #ffffff), color-mix(in oklab, ${project.accent} 8%, #ffffff))`;

  return (
    <article className="group reveal relative flex h-full flex-col">
      <div
        className={`overflow-hidden rounded-2xl border px-[7%] pt-[7%] ${dark ? "border-white/10" : "border-line"}`}
        style={{ background: panel }}
      >
        <div className="translate-y-[3%] transition-transform duration-500 ease-out group-hover:translate-y-0">
          <DeviceComposition
            screen={project.screen}
            screenAlt={project.screenAlt}
            mobile={project.mobile}
            mobileAlt={project.mobileAlt}
            priority={priority}
          />
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
        <span className={`font-mono text-xs tracking-[0.08em] uppercase ${dark ? "text-night-muted" : "text-ink-subtle"}`}>
          {project.category} · {project.industry}
        </span>
        {project.type === "concept" && (
          <span
            className={`rounded-full border px-2 py-0.5 text-xs ${dark ? "border-white/15 text-white/70" : "border-line-strong text-ink-muted"}`}
          >
            Concept
          </span>
        )}
      </div>
      <Heading className="mt-2 text-2xl font-semibold tracking-tight">
        <TrackedLink
          href={project.url}
          event="project_click"
          eventProps={{ project: project.slug }}
          className="after:absolute after:inset-0"
        >
          {project.title}
        </TrackedLink>
      </Heading>
      <p className={`mt-2 leading-relaxed ${dark ? "text-night-muted" : "text-ink-muted"}`}>{project.summary}</p>
      <span className={`mt-4 inline-flex items-center gap-2 text-sm font-medium ${dark ? "text-white" : "text-ink"}`} aria-hidden="true">
        View case study
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </span>
    </article>
  );
}
