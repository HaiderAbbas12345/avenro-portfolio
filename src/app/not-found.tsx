import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

const links = [
  { label: "Our work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Insights", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <section className="container-page py-24 sm:py-32">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">This page could not be found.</h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
        The link may be outdated, or the page may have moved. Try one of these instead:
      </p>
      <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="font-medium underline decoration-line-strong underline-offset-4 hover:decoration-ink">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <ButtonLink href="/" className="mt-12">
        Back to the homepage
      </ButtonLink>
    </section>
  );
}
