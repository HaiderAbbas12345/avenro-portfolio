import Image from "next/image";
import { site } from "@/lib/site";
import { ArrowRight, ButtonLink } from "@/components/ui/button";
import { TrackedAnchor } from "@/components/ui/tracked-link";

type CtaProps = {
  title?: string;
  text?: string;
  label?: string;
  href?: string;
  /** Where the CTA sits — recorded with the click event. */
  location: string;
};

/** Closing call to action. Wording is contextual; pass a title/text that fits the page. */
export function Cta({
  title = "Have a project in mind?",
  text = "Tell us what you are building. We reply to every inquiry within two business days.",
  label = "Start a Project",
  href = "/contact",
  location,
}: CtaProps) {
  return (
    <section aria-labelledby={`cta-${location}`} className="py-20 sm:py-24">
      <div className="container-page">
        <div className="relative isolate overflow-hidden rounded-3xl bg-night px-6 py-14 text-white sm:px-14 sm:py-20">
          <Image
            src="/images/photos/architecture-modern.jpg"
            alt=""
            fill
            sizes="(min-width: 1152px) 1088px, 100vw"
            className="-z-20 object-cover opacity-40"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-r from-night via-night/85 to-night/30"
          />
          <div className="max-w-2xl">
            <h2 id={`cta-${location}`} className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl sm:leading-[1.08]">
              {title}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/75 text-pretty">{text}</p>
            <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
              <ButtonLink
                href={href}
                size="lg"
                event="cta_start_project"
                eventProps={{ location }}
                className="bg-white !text-ink hover:bg-white/90"
              >
                {label}
                <ArrowRight />
              </ButtonLink>
              <TrackedAnchor
                href={`mailto:${site.email}`}
                event="email_click"
                eventProps={{ location }}
                className="text-sm text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white"
              >
                or email {site.email}
              </TrackedAnchor>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
