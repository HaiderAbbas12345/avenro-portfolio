import Image from "next/image";
import { engagementModels, industries, processSteps, standards } from "@/lib/content";
import { ArrowRight, ButtonLink } from "@/components/ui/button";

/** Commitments we make on every engagement (not statistics). */
export function Standards({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <dl
      className={`grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-2 lg:grid-cols-4 ${
        dark ? "border-white/10 bg-white/10" : "border-line bg-line"
      }`}
    >
      {standards.map((s) => (
        <div key={s.value} className={`reveal flex flex-col p-7 ${dark ? "bg-night" : "bg-surface"}`}>
          <dt className={`text-sm leading-relaxed ${dark ? "text-night-muted" : "text-ink-muted"}`}>{s.label}</dt>
          <dd className="order-first mb-3 text-4xl font-semibold tracking-tight">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ProcessTimeline() {
  return (
    <ol className="grid gap-4 md:grid-cols-5 md:gap-0">
      {processSteps.map((step, i) => (
        <li key={step.title} className="reveal relative md:pr-6">
          <div className="flex items-center gap-4 md:block">
            <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-line-strong bg-surface font-mono text-sm font-medium">
              {String(i + 1).padStart(2, "0")}
            </span>
            {i < processSteps.length - 1 && (
              <span aria-hidden="true" className="absolute top-6 left-12 hidden h-px w-[calc(100%-3rem)] bg-line-strong md:block" />
            )}
            <h3 className="text-xl font-semibold tracking-tight md:mt-6">{step.title}</h3>
          </div>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted md:pr-2">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}

export function IndustriesGrid() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {industries.map((industry) => (
        <li key={industry.name} className="reveal group relative overflow-hidden rounded-2xl bg-night">
          <Image
            src={industry.image}
            alt={industry.imageAlt}
            width={900}
            height={640}
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
            className="aspect-[4/3] h-auto w-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white">
            <h3 className="text-xl font-semibold tracking-tight">{industry.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/80">{industry.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function EngagementModels() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {engagementModels.map((model, i) => (
        <article
          key={model.title}
          className={`reveal flex flex-col rounded-2xl border p-8 ${
            i === 1 ? "border-white/15 bg-white/[0.06]" : "border-white/10 bg-white/[0.02]"
          }`}
        >
          <p className="font-mono text-xs tracking-[0.08em] text-accent-bright uppercase">Best for</p>
          <p className="mt-2 text-sm text-night-muted">{model.bestFor}</p>
          <h3 className="mt-8 text-2xl font-semibold tracking-tight">{model.title}</h3>
          <p className="mt-3 leading-relaxed text-night-muted">{model.description}</p>
          <ul className="mt-6 space-y-3 border-t border-white/10 pt-6">
            {model.points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm text-white/85">
                <svg viewBox="0 0 16 16" className="mt-0.5 size-4 shrink-0 text-accent-bright" fill="none" aria-hidden="true">
                  <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {point}
              </li>
            ))}
          </ul>
        </article>
      ))}
      <div className="lg:col-span-3">
        <ButtonLink
          href="/contact"
          size="lg"
          event="cta_start_project"
          eventProps={{ location: "engagement_models" }}
          className="mt-4 bg-white !text-ink hover:bg-white/90"
        >
          Discuss the right model
          <ArrowRight />
        </ButtonLink>
      </div>
    </div>
  );
}
