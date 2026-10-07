import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";
import { getAllServices } from "@/lib/content";
import { pageMetadata } from "@/lib/seo/metadata";
import { Eyebrow, PageHeader, Section, SectionHeading } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ArrowRight } from "@/components/ui/button";
import { TrackedLink } from "@/components/ui/tracked-link";
import { ServiceIcon } from "@/components/services/service-icon";
import { ProcessTimeline, Standards } from "@/components/sections/company-sections";
import { TechStrip } from "@/components/sections/tech-strip";
import { Cta } from "@/components/sections/cta";

export const metadata: Metadata = pageMetadata({
  title: "About Avenro — Software & Digital Product Company",
  description:
    "Avenro is a software and digital product company designing, building and supporting websites, web applications and SaaS products for clients in the US, UK and Europe.",
  path: "/about",
});

const values = [
  {
    title: "Clarity over complexity",
    text: "We recommend the simplest solution that will serve you well, and explain every trade-off in plain language.",
  },
  {
    title: "Quality you can measure",
    text: "Fast pages, accessible interfaces and clean code are requirements on every project, not optional extras.",
  },
  {
    title: "Honest by default",
    text: "Realistic estimates, early warnings about risk and no invented results — ever.",
  },
  {
    title: "Built to be owned",
    text: "Documented code in your repositories and accounts in your name, so your product never depends on us.",
  },
];

export default function AboutPage() {
  const services = getAllServices();

  return (
    <>
      <PageHeader
        eyebrow="About Avenro"
        title="We build the software growing businesses run on."
        description={site.positioning}
        aside={
          <Image
            src="/images/photos/workspace-desk.jpg"
            alt="An open laptop with a code editor on a wooden desk in soft window light"
            width={1000}
            height={1000}
            priority
            sizes="(min-width: 1024px) 460px, 100vw"
            className="aspect-[5/4] h-auto w-full rounded-2xl object-cover ring-1 ring-white/10 lg:aspect-square"
          />
        }
      >
        <Breadcrumbs items={[{ name: "About", path: "/about" }]} />
      </PageHeader>

      <Section labelledBy="mission-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <Eyebrow>Our mission</Eyebrow>
            <h2 id="mission-title" className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Make dependable, well-built software accessible to every growing business.
            </h2>
          </div>
          <div className="prose-avenro">
            <p>
              Too many businesses end up with software that looked fine at launch and became a problem soon after:
              slow websites that are hard to change, tools nobody wants to use, and code only one contractor
              understands.
            </p>
            <p>
              Avenro exists to do it differently. We bring strategy, design and engineering together in one
              accountable team, understand the business problem before writing code, and build products that are fast,
              accessible and straightforward to maintain as you grow.
            </p>
            <p>
              Today we design and build websites, web applications and SaaS products, partner with agencies as their
              development team, and support products long after launch. Over time, Avenro will also build and operate
              software products of its own.
            </p>
          </div>
        </div>
      </Section>

      <Section labelledBy="values-title" tone="surface">
        <SectionHeading id="values-title" eyebrow="What we value" title="Principles behind every project." />
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <div key={v.title} className="reveal bg-surface p-7">
              <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 text-lg font-semibold tracking-tight">{v.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">{v.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Standards />
        </div>
      </Section>

      <Section labelledBy="capabilities-title">
        <SectionHeading
          id="capabilities-title"
          eyebrow="Capabilities"
          title="Everything a web product needs, under one roof."
          description="Six services that cover the full lifecycle — from research and design to engineering, launch and long-term support."
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.slug}>
              <TrackedLink
                href={s.url}
                event="service_click"
                eventProps={{ service: s.slug, location: "about" }}
                className="group reveal flex h-full flex-col rounded-2xl border border-line bg-surface p-7 transition-colors hover:border-ink/30"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <ServiceIcon slug={s.slug} className="size-5" />
                </span>
                <span className="mt-5 text-xl font-semibold tracking-tight">{s.title}</span>
                <span className="mt-2 mb-6 leading-relaxed text-ink-muted">{s.summary}</span>
                <ArrowRight className="mt-auto size-4 transition-transform group-hover:translate-x-1" />
              </TrackedLink>
            </li>
          ))}
        </ul>
      </Section>

      <TechStrip title="Our technology stack" />

      <Section labelledBy="how-title" tone="surface">
        <SectionHeading
          id="how-title"
          eyebrow="How we work"
          title="Remote-first, structured and transparent."
          description="Avenro works remotely with clients in the United States, the United Kingdom, Europe and other English-speaking markets. We agree overlap hours with every client so calls, reviews and quick questions happen in your working day."
        />
        <ProcessTimeline />
      </Section>

      <Section labelledBy="leadership-title">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Replace with a real portrait: add public/images/team/founder.jpg and swap this block for an <Image>. */}
          <div
            aria-hidden="true"
            className="reveal relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-night"
          >
            <div className="bg-grid absolute inset-0" />
            <div className="absolute inset-0 bg-[radial-gradient(24rem_18rem_at_0%_0%,rgb(43_69_196/0.4),transparent_70%)]" />
            <span className="relative text-8xl font-semibold tracking-tight text-white/90">
              {site.founder.name
                .split(" ")
                .map((p) => p[0])
                .filter((_, i, a) => i === 0 || i === a.length - 1)
                .join("")}
            </span>
          </div>
          <div>
            <Eyebrow>Leadership</Eyebrow>
            <h2 id="leadership-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {site.founder.name}
            </h2>
            <p className="mt-2 text-ink-subtle">{site.founder.role}</p>
            <div className="prose-avenro mt-6">
              <p>
                {site.founder.name} founded Avenro and leads its design and engineering work, with a focus on web
                software that businesses can rely on and afford to maintain — fast, accessible and straightforward to
                change as the business grows.
              </p>
              <p>
                Questions about working with Avenro can be sent directly to{" "}
                <a href={`mailto:${site.email}`}>{site.email}</a>.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Cta location="about" title="Let’s talk about your project." />
    </>
  );
}
