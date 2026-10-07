"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackEvent, type AnalyticsEvent, type EventProps } from "@/lib/analytics/events";

type TrackedLinkProps = ComponentProps<typeof Link> & {
  event: AnalyticsEvent;
  eventProps?: EventProps;
};

/** A normal link that records a conversion event when clicked. */
export function TrackedLink({ event, eventProps, onClick, ...props }: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        trackEvent(event, eventProps);
        onClick?.(e);
      }}
    />
  );
}

type TrackedAnchorProps = ComponentProps<"a"> & {
  event: AnalyticsEvent;
  eventProps?: EventProps;
};

/** For mailto: and external links. */
export function TrackedAnchor({ event, eventProps, onClick, ...props }: TrackedAnchorProps) {
  return (
    <a
      {...props}
      onClick={(e) => {
        trackEvent(event, eventProps);
        onClick?.(e);
      }}
    />
  );
}
