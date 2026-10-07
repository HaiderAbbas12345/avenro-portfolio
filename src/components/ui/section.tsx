import type { ReactNode } from "react";

type Tone = "canvas" | "surface" | "dark";

const tones: Record<Tone, string> = {
  canvas: "",
  surface: "bg-surface border-y border-line",
  dark: "bg-night text-white",
};

export function Section({
  children,
  className = "",
  id,
  labelledBy,
  tone = "canvas",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  labelledBy?: string;
  tone?: Tone;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`py-20 sm:py-28 ${tones[tone]} ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  action,
  tone = "light",
  align = "left",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
}) {
  const dark = tone === "dark";
  const centered = align === "center";
  return (
    <div
      className={`mb-12 flex flex-col gap-6 sm:mb-16 ${
        centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"
      }`}
    >
      <div className={`max-w-2xl ${centered ? "mx-auto" : ""}`}>
        {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
        <h2 id={id} className="text-3xl font-semibold tracking-tight text-balance sm:text-[2.75rem] sm:leading-[1.1]">
          {title}
        </h2>
        {description && (
          <p className={`mt-5 text-lg leading-relaxed text-pretty ${dark ? "text-night-muted" : "text-ink-muted"}`}>
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className={`mb-4 flex items-center gap-2 font-mono text-xs tracking-[0.08em] uppercase ${dark ? "text-accent-bright" : "text-accent"}`}>
      <span aria-hidden="true" className={`h-px w-5 ${dark ? "bg-accent-bright" : "bg-accent"}`} />
      {children}
    </p>
  );
}

/** Standard dark page header used by every inner page. */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  actions,
  aside,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Rendered above the title — typically breadcrumbs. */
  children?: ReactNode;
  /** Rendered below the description — typically a CTA. */
  actions?: ReactNode;
  /** Optional visual on the right (image, device composition). */
  aside?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden bg-night text-white">
      <div aria-hidden="true" className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black_30%,transparent_75%)]" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(40rem_28rem_at_0%_0%,rgb(43_69_196/0.32),transparent_70%)]"
      />
      <div
        className={`container-page relative pt-10 pb-16 sm:pt-14 sm:pb-24 ${
          aside ? "grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16" : ""
        }`}
      >
        <div>
          {children}
          {eyebrow && <Eyebrow dark>{eyebrow}</Eyebrow>}
          <h1 className="max-w-3xl text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-night-muted text-pretty sm:text-xl">{description}</p>
          )}
          {actions && <div className="mt-10 flex flex-col gap-3 sm:flex-row">{actions}</div>}
        </div>
        {aside && <div className="relative">{aside}</div>}
      </div>
    </header>
  );
}

export function Tag({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "accent" | "dark" }) {
  const tones = {
    neutral: "border-line bg-surface text-ink-muted",
    accent: "border-accent/20 bg-accent-soft text-accent",
    dark: "border-white/15 bg-white/5 text-white/80",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}
