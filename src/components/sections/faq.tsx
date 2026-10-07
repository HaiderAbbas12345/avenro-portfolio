import type { FaqItem } from "@/lib/content";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/seo/structured-data";

/** Accessible FAQ using native <details>, with matching FAQPage structured data. */
export function Faq({ items, title = "Questions", id = "faq" }: { items: FaqItem[]; title?: string; id?: string }) {
  if (!items.length) return null;
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
      <h2 id={id} className="text-3xl font-semibold tracking-tight">
        {title}
      </h2>
      <div className="divide-y divide-line border-y border-line">
        {items.map((item) => (
          <details key={item.question} className="group py-5">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-medium [&::-webkit-details-marker]:hidden">
              {item.question}
              <span
                aria-hidden="true"
                className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink-muted transition-transform group-open:rotate-45"
              >
                <svg className="size-3" viewBox="0 0 12 12" fill="none">
                  <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
            </summary>
            <p className="mt-3 max-w-2xl leading-relaxed text-ink-muted">{item.answer}</p>
          </details>
        ))}
      </div>
      <JsonLd data={faqSchema(items)} />
    </div>
  );
}
