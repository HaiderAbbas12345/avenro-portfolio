"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mainNav } from "@/lib/site";
import { trackEvent } from "@/lib/analytics/events";

export function MobileMenu({ services }: { services: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState<string | null>(null);
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close the menu after navigating.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="-mr-2 inline-flex size-10 items-center justify-center rounded-full text-white hover:bg-white/10"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <svg className="size-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          {open ? (
            <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          ) : (
            <path d="M3 7h14M3 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          )}
        </svg>
      </button>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-white/10 bg-night text-white"
      >
        <nav aria-label="Mobile" className="container-page py-6">
          <ul className="divide-y divide-white/10 border-b border-white/10">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                  className="flex items-center justify-between py-4 text-2xl font-medium tracking-tight"
                >
                  {item.label}
                </Link>
                {item.href === "/services" && (
                  <ul className="-mt-1 grid grid-cols-2 gap-x-4 gap-y-2 pb-4">
                    {services.map((s) => (
                      <li key={s.href}>
                        <Link href={s.href} className="text-sm text-white/65 hover:text-white">
                          {s.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            onClick={() => trackEvent("cta_start_project", { location: "mobile_menu" })}
            className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-full bg-white text-[0.9375rem] font-medium text-ink"
          >
            Start a Project
          </Link>
        </nav>
      </div>
    </div>
  );
}
