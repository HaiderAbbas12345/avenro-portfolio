import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { companyFaqs, getAllPosts, getAllServices, getFeaturedProjects } from "@/lib/content";
import { pageMetadata } from "@/lib/seo/metadata";
import { ArrowRight } from "@/components/ui/button";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { Hero } from "@/components/sections/hero";
import { TechStrip } from "@/components/sections/tech-strip";
import { ServiceBento } from "@/components/services/service-bento";
import { ProjectCard } from "@/components/work/project-card";
import { EngagementModels, IndustriesGrid, ProcessTimeline, Standards } from "@/components/sections/company-sections";
import { ArticleCard } from "@/components/blog/article-card";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";

export const metadata: Metadata = pageMetadata({
  title: `${site.name} — Software & Digital Products | Websites, Web Apps & SaaS`,
  description:
    "Avenro designs and builds modern business websites, custom web applications and SaaS products — with UI/UX design, agency partnerships and ongoing support.",
  path: "/",
  absoluteTitle: true,
});

function SectionLink({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        dark ? "border-white/20 text-white hover:border-white/60" : "border-line-strong hover:border-ink"
      }`}
    >
      {children} <ArrowRight />
    </Link>
  );
}

export default function HomePage() {
  const services = getAllServices();
  const projects = getFeaturedProjects(4);
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <Hero />
      <TechStrip />

      <Section labelledBy="services-title">
        <SectionHeading
          id="services-title"
          eyebrow="What we do"
          title="End-to-end design and engineering for the web."
          description="From the first wireframe to long-term support — six services, one accountable team."
          action={<SectionLink href="/services">All services</SectionLink>}
        />
        <ServiceBento services={services} />
      </Section>

      <Section labelledBy="work-title" tone="dark">
        <SectionHeading
          id="work-title"
          tone="dark"
          eyebrow="Selected work"
          title="Products and websites, documented in full."
          description="Every project is written up the same way: the problem, the approach, what we built and the honest outcome."
          action={<SectionLink href="/work" dark>All work</SectionLink>}
        />
        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} tone="dark" />
          ))}
        </div>
      </Section>

      <Section labelledBy="why-title">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="reveal relative">
            <Image
              src="/images/photos/workspace-desk.jpg"
              alt="An open laptop with a code editor on a wooden desk in soft window light"
              width={1200}
              height={900}
              sizes="(min-width: 1024px) 540px, 100vw"
              className="aspect-[4/3] h-auto w-full rounded-2xl object-cover"
            />
            <div className="absolute right-6 -bottom-6 left-6 hidden rounded-xl border border-line bg-surface/95 p-5 shadow-xl sm:block lg:-right-10 lg:left-auto lg:w-72">
              <p className="font-mono text-[11px] tracking-[0.08em] text-ink-subtle uppercase">How we deliver</p>
              <p className="mt-2 text-sm leading-relaxed text-ink">
                Written scope, weekly previews and code you own — on every engagement.
              </p>
            </div>
          </div>
          <div>
            <Eyebrow>Why Avenro</Eyebrow>
            <h2 id="why-title" className="text-3xl font-semibold tracking-tight text-balance sm:text-[2.75rem] sm:leading-[1.1]">
              The standards of a software company, the attention of a dedicated team.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">
              Strategy, design and engineering work together from day one, so nothing gets lost between teams. We
              plan carefully, communicate openly and build software that is fast, accessible and easy to maintain.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">
              No inflated scope, no invented results — just clear commitments we keep on every project.
            </p>
          </div>
        </div>
        <div className="mt-16 sm:mt-20">
          <Standards />
        </div>
      </Section>

      <Section labelledBy="process-title" tone="surface">
        <SectionHeading
          id="process-title"
          eyebrow="Process"
          title="A clear process from first call to launch — and beyond."
          description="Five stages, each with defined outputs, so you always know what is happening and what comes next."
        />
        <ProcessTimeline />
      </Section>

      <Section labelledBy="industries-title">
        <SectionHeading
          id="industries-title"
          eyebrow="Industries"
          title="Built for the way your industry works."
          description="We focus on sectors where better websites and software make a real difference to how a business wins and serves customers."
        />
        <IndustriesGrid />
      </Section>

      <Section labelledBy="models-title" tone="dark">
        <SectionHeading
          id="models-title"
          tone="dark"
          eyebrow="Engagement models"
          title="Flexible ways to work together."
          description="Choose the model that fits your project, budget and team — and change it as your needs evolve."
        />
        <EngagementModels />
      </Section>

      {posts.length > 0 && (
        <Section labelledBy="insights-title">
          <SectionHeading
            id="insights-title"
            eyebrow="Latest from Avenro"
            title="Insights for teams building on the web."
            description="Practical, honest guidance on websites, web applications and software projects."
            action={<SectionLink href="/blog">All insights</SectionLink>}
          />
          <div className="grid gap-5 md:grid-cols-3">
            {posts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </Section>
      )}

      <Section labelledBy="home-faq" tone="surface">
        <Faq id="home-faq" title="Frequently asked questions" items={[...companyFaqs]} />
      </Section>

      <Cta
        location="home"
        title="Let’s build something your customers will love."
        text="Tell us about your project. We reply to every inquiry within two business days with honest advice on scope, timeline and cost."
      />
    </>
  );
}
