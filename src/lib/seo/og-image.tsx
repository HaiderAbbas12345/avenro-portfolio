import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/** Shared social-image template so every shared link looks consistent. */
export function renderOgImage({ eyebrow, title, footer }: { eyebrow: string; title: string; footer?: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fafaf8",
          padding: "72px 80px",
          color: "#111213",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="52" height="52" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="8" fill="#111213" />
            <path d="M9.5 23 16 9l6.5 14" fill="none" stroke="#fafaf8" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12.6 18.4h6.8" stroke="#fafaf8" strokeWidth="2.6" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: 34, fontWeight: 600, letterSpacing: "-0.02em" }}>{site.name}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 24, color: "#686c73", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            {eyebrow}
          </span>
          <span
            style={{
              marginTop: 20,
              fontSize: title.length > 60 ? 58 : 68,
              lineHeight: 1.08,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              maxWidth: 1000,
            }}
          >
            {title}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "2px solid #e4e4de",
            paddingTop: 28,
            fontSize: 24,
            color: "#4f535a",
          }}
        >
          <span>{footer ?? site.tagline}</span>
          <span>{site.url.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
