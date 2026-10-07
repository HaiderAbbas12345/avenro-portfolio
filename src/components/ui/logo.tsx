/** Avenro mark: a stable, geometric "A" built from two strokes and a bar. */
export function LogoMark({ className = "size-7", tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const bg = tone === "dark" ? "#ffffff" : "#111213";
  const fg = tone === "dark" ? "#0b0c0f" : "#fafaf8";
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill={bg} />
      <path d="M9.5 23 16 9l6.5 14" fill="none" stroke={fg} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.6 18.4h6.8" stroke={fg} strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark tone={tone} />
      <span className="text-[1.0625rem] font-semibold tracking-tight">Avenro</span>
    </span>
  );
}
