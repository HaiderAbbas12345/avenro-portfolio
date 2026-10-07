"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitContact, type ContactState } from "@/app/contact/actions";
import { budgets, projectTypes, timelines } from "@/app/contact/options";
import { trackEvent } from "@/lib/analytics/events";
import { buttonClasses } from "@/components/ui/button";

const fieldClasses =
  "mt-2 block w-full rounded-lg border border-line-strong bg-surface px-3.5 py-2.5 text-[0.9375rem] text-ink placeholder:text-ink-subtle/70 transition-colors hover:border-ink-subtle focus:border-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-1 aria-[invalid=true]:border-danger";

const labelClasses = "block text-sm font-medium text-ink";

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClasses}>
        {label} {optional && <span className="font-normal text-ink-subtle">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm({ defaultProjectType }: { defaultProjectType?: string }) {
  const [state, action, pending] = useActionState<ContactState, FormData>(submitContact, { status: "idle" });
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status === "success") trackEvent("contact_submit");
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-[var(--radius-card)] border border-line bg-surface p-8 focus:outline-none">
        <p className="eyebrow text-success">Message sent</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">Thank you — we have your inquiry.</h2>
        <p className="mt-3 leading-relaxed text-ink-muted">
          We read every message personally and will reply within two business days.
        </p>
      </div>
    );
  }

  const errors = state.status === "error" ? state.fieldErrors ?? {} : {};
  const values = state.status === "error" ? state.values ?? {} : {};
  const describe = (field: keyof typeof errors) => (errors[field] ? `${field}-error` : undefined);

  return (
    <form action={action} noValidate className="space-y-6">
      {state.status === "error" && (
        <div ref={statusRef} tabIndex={-1} role="alert" className="rounded-lg border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger focus:outline-none">
          {state.message}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name}>
          <input id="name" name="name" type="text" autoComplete="name" required defaultValue={values.name}
            aria-invalid={!!errors.name} aria-describedby={describe("name")} className={fieldClasses} />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" required defaultValue={values.email}
            aria-invalid={!!errors.email} aria-describedby={describe("email")} className={fieldClasses} />
        </Field>
        <Field id="company" label="Company" optional>
          <input id="company" name="company" type="text" autoComplete="organization" defaultValue={values.company} className={fieldClasses} />
        </Field>
        <Field id="projectType" label="Project type" error={errors.projectType}>
          <select id="projectType" name="projectType" required defaultValue={values.projectType ?? defaultProjectType ?? ""}
            aria-invalid={!!errors.projectType} aria-describedby={describe("projectType")} className={fieldClasses}>
            <option value="" disabled>
              Choose one
            </option>
            {projectTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="message" label="Tell us about the project" error={errors.message}>
        <textarea id="message" name="message" rows={6} required defaultValue={values.message}
          placeholder="What are you looking to build, and what would a good outcome look like?"
          aria-invalid={!!errors.message} aria-describedby={describe("message")} className={fieldClasses} />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="budget" label="Budget" optional>
          <select id="budget" name="budget" defaultValue={values.budget ?? ""} className={fieldClasses}>
            <option value="">Prefer not to say</option>
            {budgets.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </Field>
        <Field id="timeline" label="Timeline" optional>
          <select id="timeline" name="timeline" defaultValue={values.timeline ?? ""} className={fieldClasses}>
            <option value="">Not sure yet</option>
            {timelines.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
      </div>

      {/* Honeypot for bots — hidden from people and assistive technology. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-subtle">
          We only use your details to reply to your inquiry. See our{" "}
          <a href="/privacy" className="underline underline-offset-4 hover:text-ink">
            privacy policy
          </a>
          .
        </p>
        <button type="submit" disabled={pending} className={buttonClasses("primary", "lg", "w-full sm:w-auto")}>
          {pending ? "Sending…" : "Send inquiry"}
        </button>
      </div>
    </form>
  );
}
