import type { Service } from "@/lib/content";
import { ArrowRight } from "@/components/ui/button";
import { TrackedLink } from "@/components/ui/tracked-link";

export function ServiceCard({
  service,
  index,
  headingLevel = "h3",
}: {
  service: Service;
  index: number;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <article className="group relative flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-7 transition-colors hover:border-ink sm:p-8">
      <span className="font-mono text-xs text-ink-subtle" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      <Heading className="mt-10 text-2xl font-semibold tracking-tight">
        <TrackedLink
          href={service.url}
          event="service_click"
          eventProps={{ service: service.slug }}
          className="after:absolute after:inset-0 after:rounded-[var(--radius-card)]"
        >
          {service.shortTitle}
        </TrackedLink>
      </Heading>
      <p className="mt-3 leading-relaxed text-ink-muted">{service.summary}</p>
      <span className="mt-auto flex items-center gap-2 pt-8 text-sm font-medium text-ink" aria-hidden="true">
        Learn more
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </article>
  );
}
