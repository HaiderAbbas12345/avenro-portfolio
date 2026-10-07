import Link from "next/link";
import type { ComponentProps } from "react";
import { TrackedLink } from "./tracked-link";
import type { AnalyticsEvent, EventProps } from "@/lib/analytics/events";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-150 whitespace-nowrap focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-white hover:bg-ink/85",
  secondary: "border border-line-strong bg-surface text-ink hover:border-ink",
  ghost: "text-ink hover:bg-sunken",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-6 text-[0.9375rem]",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
  /** Record a conversion event when clicked. */
  event?: AnalyticsEvent;
  eventProps?: EventProps;
};

export function ButtonLink({ variant, size, className, event, eventProps, ...props }: ButtonLinkProps) {
  const classes = buttonClasses(variant, size, className);
  if (event) return <TrackedLink event={event} eventProps={eventProps} className={classes} {...props} />;
  return <Link className={classes} {...props} />;
}

export function ArrowRight({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
