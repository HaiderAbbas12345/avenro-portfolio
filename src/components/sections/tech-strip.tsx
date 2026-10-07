import { TechMark, techLogos } from "@/components/ui/tech-logos";

/** The technologies we build with — named honestly, not presented as clients or partners. */
export function TechStrip({ names, tone = "dark", title = "Built with modern, proven technology" }: {
  names?: string[];
  tone?: "light" | "dark";
  title?: string;
}) {
  const logos = names ? techLogos.filter((l) => names.includes(l.name)) : techLogos.slice(0, 12);
  const dark = tone === "dark";
  return (
    <div className={dark ? "bg-night text-white" : ""}>
      <div className={`container-page py-12 sm:py-14 ${dark ? "border-t border-white/10" : ""}`}>
        <p className={`text-center font-mono text-xs tracking-[0.08em] uppercase ${dark ? "text-night-muted" : "text-ink-subtle"}`}>
          {title}
        </p>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-12">
          {logos.map((logo) => (
            <li
              key={logo.slug}
              className={`flex items-center gap-2.5 transition-colors ${dark ? "text-white/55 hover:text-white" : "text-ink-subtle hover:text-ink"}`}
            >
              <TechMark logo={logo} className="size-5" />
              <span className="text-sm font-medium">{logo.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
