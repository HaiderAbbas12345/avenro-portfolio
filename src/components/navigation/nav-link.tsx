"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function NavLink({ href, children, hasMenu = false }: { href: string; children: ReactNode; hasMenu?: boolean }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm transition-colors ${
        active ? "font-medium text-white" : "text-white/70 hover:text-white"
      }`}
    >
      {children}
      {hasMenu && (
        <svg className="size-3.5 opacity-60" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </Link>
  );
}
