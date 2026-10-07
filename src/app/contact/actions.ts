"use server";

import { site } from "@/lib/site";
import { projectTypes, budgets, timelines } from "./options";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors?: Partial<Record<ContactField, string>>; values?: Partial<Record<ContactField, string>> };

type ContactField = "name" | "email" | "company" | "projectType" | "message" | "budget" | "timeline";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(form: FormData, key: string, max: number) {
  return String(form.get(key) ?? "").trim().slice(0, max);
}

/**
 * Delivers contact inquiries by email through the Resend HTTP API.
 * Credentials live in server-only environment variables (see .env.example).
 */
export async function submitContact(_prev: ContactState, form: FormData): Promise<ContactState> {
  // Honeypot: real visitors never see or fill this field.
  if (text(form, "website", 200)) return { status: "success" };

  const values = {
    name: text(form, "name", 120),
    email: text(form, "email", 200),
    company: text(form, "company", 160),
    projectType: text(form, "projectType", 80),
    message: text(form, "message", 5000),
    budget: text(form, "budget", 80),
    timeline: text(form, "timeline", 80),
  };

  const fieldErrors: Partial<Record<ContactField, string>> = {};
  if (!values.name) fieldErrors.name = "Please enter your name.";
  if (!EMAIL_PATTERN.test(values.email)) fieldErrors.email = "Please enter a valid email address.";
  if (!projectTypes.includes(values.projectType as (typeof projectTypes)[number]))
    fieldErrors.projectType = "Please choose a project type.";
  if (values.message.length < 20) fieldErrors.message = "Please add a few sentences about the project (20 characters minimum).";
  if (values.budget && !budgets.includes(values.budget as (typeof budgets)[number])) values.budget = "";
  if (values.timeline && !timelines.includes(values.timeline as (typeof timelines)[number])) values.timeline = "";

  if (Object.keys(fieldErrors).length) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors, values };
  }

  const lines = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Company: ${values.company || "—"}`,
    `Project type: ${values.projectType}`,
    `Budget: ${values.budget || "Not specified"}`,
    `Timeline: ${values.timeline || "Not specified"}`,
    "",
    values.message,
  ];

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || site.email;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] Email delivery is not configured. Inquiry received:\n" + lines.join("\n"));
      return { status: "success" };
    }
    console.error("[contact] RESEND_API_KEY / CONTACT_FROM_EMAIL are not set.");
    return {
      status: "error",
      message: `Sorry, the form is temporarily unavailable. Please email us at ${site.email}.`,
      values,
    };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email,
        subject: `New inquiry: ${values.projectType} — ${values.name}${values.company ? ` (${values.company})` : ""}`,
        text: lines.join("\n"),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error(`Resend responded ${response.status}: ${await response.text()}`);
  } catch (error) {
    console.error("[contact] Delivery failed", error);
    return {
      status: "error",
      message: `Sorry, something went wrong sending your message. Please try again or email us at ${site.email}.`,
      values,
    };
  }

  return { status: "success" };
}
