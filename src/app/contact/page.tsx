import type { Metadata } from "next";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHeader, Section } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ContactForm } from "@/components/contact/contact-form";
import { TrackedAnchor } from "@/components/ui/tracked-link";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: `Start a project with Avenro. Tell us what you are building, or email ${site.email}.`,
  path: "/contact",
});

const steps = [
  "We read your message and reply within two business days.",
  "If it looks like a fit, we arrange a short call to understand the details.",
  "You receive a written proposal with scope, timeline and cost — no obligation.",
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Start a project."
        description="Tell us a little about what you need. A few sentences is plenty — we will ask follow-up questions if we need them."
      >
        <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
      </PageHeader>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
          <ContactForm />

          <aside className="space-y-10">
            <div>
              <h2 className="eyebrow">Email</h2>
              <TrackedAnchor
                href={`mailto:${site.email}`}
                event="email_click"
                eventProps={{ location: "contact_page" }}
                className="mt-3 inline-block text-xl font-medium tracking-tight underline decoration-line-strong underline-offset-4 hover:decoration-ink"
              >
                {site.email}
              </TrackedAnchor>
            </div>
            <div>
              <h2 className="eyebrow">What happens next</h2>
              <ol className="mt-4 space-y-4">
                {steps.map((step, i) => (
                  <li key={step} className="flex gap-4 text-[0.9375rem] leading-relaxed text-ink-muted">
                    <span className="font-mono text-xs leading-6 text-ink-subtle">{String(i + 1).padStart(2, "0")}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h2 className="eyebrow">Working hours</h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">
                We work remotely with clients across the US, UK and Europe, and schedule calls in your time zone.
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
