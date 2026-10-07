"use client";

import { track } from "@vercel/analytics";

/**
 * Conversion events. Keep this list small and meaningful — each one should
 * answer a question about which pages generate potential clients.
 */
export type AnalyticsEvent =
  | "cta_start_project"
  | "contact_submit"
  | "email_click"
  | "project_click"
  | "service_click";

export type EventProps = Record<string, string | number | boolean | null>;

export function trackEvent(event: AnalyticsEvent, props?: EventProps) {
  try {
    track(event, props);
  } catch {
    // Analytics must never break the page.
  }
}
