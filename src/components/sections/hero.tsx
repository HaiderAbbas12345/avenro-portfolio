import { site } from "@/lib/site";
import { ArrowRight, ButtonLink } from "@/components/ui/button";
import { BrowserFrame, PhoneFrame } from "@/components/ui/device-frames";

/** Homepage hero: positioning statement over a layered product composition. */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-night text-white">
      <div aria-hidden="true" className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_35%,transparent_75%)]" />
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(60rem_32rem_at_50%_-8rem,rgb(43_69_196/0.38),transparent_70%)]" />

      <div className="container-page relative pt-16 text-center sm:pt-24 lg:pt-28">
        <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs text-white/80">
          <span className="size-1.5 rounded-full bg-accent-bright" aria-hidden="true" />
          <span className="font-semibold text-white">{site.name}</span>
          <span aria-hidden="true" className="text-white/30">
            |
          </span>
          {site.tagline}
        </p>
        <h1
          id="hero-title"
          className="mx-auto mt-7 max-w-5xl text-[2.6rem] leading-[1.04] font-semibold tracking-tight text-balance sm:text-6xl lg:text-[4.75rem]"
        >
          We build modern websites, web applications, and digital products for growing businesses.
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-night-muted text-pretty sm:text-xl">
          Avenro is a software and digital product company. Strategy, design and engineering under one roof — so
          your product ships faster, performs better and is built to last.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink
            href="/contact"
            size="lg"
            event="cta_start_project"
            eventProps={{ location: "hero" }}
            className="bg-white !text-ink hover:bg-white/90"
          >
            Start a Project
            <ArrowRight />
          </ButtonLink>
          <ButtonLink href="/work" size="lg" variant="secondary" className="!border-white/20 !bg-white/5 !text-white hover:!border-white/50">
            View Our Work
          </ButtonLink>
        </div>
      </div>

      {/* Product composition — concept work from our case studies. */}
      <div className="container-page relative mt-16 sm:mt-20">
        <div className="relative mx-auto max-w-6xl [mask-image:linear-gradient(to_bottom,black_70%,transparent)]">
          <BrowserFrame
            src="/images/work/service-operations-dashboard-job.webp"
            alt=""
            sizes="(min-width: 1024px) 40vw, 1px"
            tone="dark"
            className="absolute top-[-6%] left-[-4%] hidden w-[52%] -rotate-2 opacity-60 lg:block"
          />
          <BrowserFrame
            src="/images/work/saas-analytics-platform.webp"
            alt="Analytics dashboard designed and built by Avenro for the Lumen Metrics concept project"
            url="app.lumenmetrics.example"
            sizes="(min-width: 1152px) 880px, 90vw"
            tone="dark"
            className="relative mx-auto w-full lg:w-[78%]"
          />
          <PhoneFrame
            src="/images/work/kestrel-roofing-mobile.webp"
            alt="Mobile homepage designed by Avenro for the Kestrel Roofing concept project"
            sizes="(min-width: 1024px) 220px, 28vw"
            className="absolute right-[2%] bottom-[8%] w-[26%] max-w-[230px] rotate-3 lg:right-[4%] lg:w-[19%]"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-[22%] left-[2%] hidden items-center gap-3 rounded-xl border border-white/10 bg-night-raised/90 px-4 py-3 text-left shadow-2xl sm:flex lg:left-[6%]"
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
              <svg viewBox="0 0 16 16" className="size-4" fill="none">
                <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>
              <span className="block text-sm font-medium text-white">Production deploy ready</span>
              <span className="block font-mono text-[11px] text-night-muted">main · tests passed</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
