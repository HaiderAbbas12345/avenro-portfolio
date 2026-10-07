import type { ServiceSlug } from "@/lib/content/service-slugs";

/** Simple line icons for each service (decorative — always paired with a text label). */
const paths: Record<ServiceSlug, React.ReactNode> = {
  "ui-ux-design": (
    <>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M3 8h18M8 18v2M16 18v2M7 12h4M7 15h7" />
    </>
  ),
  websites: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" />
    </>
  ),
  "web-applications": (
    <>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </>
  ),
  "saas-product-development": (
    <>
      <path d="M7 18a4 4 0 0 1-.6-7.96A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9H7Z" />
      <path d="M12 11v5M9.5 13.5 12 11l2.5 2.5" />
    </>
  ),
  "development-partnerships": (
    <>
      <path d="m8 9-4 3 4 3M16 9l4 3-4 3M13.5 6l-3 12" />
    </>
  ),
  "maintenance-support": (
    <>
      <path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
};

export function ServiceIcon({ slug, className = "size-6" }: { slug: ServiceSlug; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[slug]}
    </svg>
  );
}
