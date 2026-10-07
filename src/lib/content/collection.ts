import fs from "node:fs";
import path from "node:path";
import { getFrontmatter } from "next-mdx-remote-client/utils";

/**
 * File-system source for content collections in /content.
 *
 * This is the only module that knows content lives in Markdown files. Swapping
 * to a headless CMS later means replacing these functions; the typed
 * collection modules (posts, projects, …) and every page stay the same.
 */

const CONTENT_ROOT = path.join(process.cwd(), "content");

export type RawEntry = {
  slug: string;
  frontmatter: Record<string, unknown>;
  body: string;
  file: string;
};

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function readCollection(collection: string): RawEntry[] {
  const dir = path.join(CONTENT_ROOT, collection);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => /\.mdx?$/.test(file) && !file.startsWith("_"))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      if (!SLUG_PATTERN.test(slug)) {
        throw new Error(
          `content/${collection}/${file}: file names must be lowercase-kebab-case (they become the URL).`,
        );
      }
      const source = fs.readFileSync(path.join(dir, file), "utf8");
      const { frontmatter, strippedSource } = getFrontmatter(source);
      return { slug, frontmatter, body: strippedSource, file: `content/${collection}/${file}` };
    });
}

/* ------------------------------------------------------------------------ */
/* Frontmatter validation — fail the build loudly instead of shipping a     */
/* broken page.                                                             */
/* ------------------------------------------------------------------------ */

export class FieldReader {
  constructor(private entry: RawEntry) {}

  private fail(key: string, message: string): never {
    throw new Error(`${this.entry.file}: frontmatter "${key}" ${message}`);
  }

  private value(key: string) {
    return this.entry.frontmatter[key];
  }

  string(key: string): string {
    const v = this.value(key);
    if (typeof v !== "string" || v.trim() === "") this.fail(key, "is required and must be text.");
    return v.trim();
  }

  optionalString(key: string): string | undefined {
    const v = this.value(key);
    if (v === undefined || v === null || v === "") return undefined;
    if (typeof v !== "string") this.fail(key, "must be text.");
    return v.trim();
  }

  date(key: string): string {
    const v = this.value(key);
    return this.toIsoDate(key, v, true)!;
  }

  optionalDate(key: string): string | undefined {
    return this.toIsoDate(key, this.value(key), false);
  }

  private toIsoDate(key: string, v: unknown, required: boolean): string | undefined {
    if (v === undefined || v === null || v === "") {
      if (required) this.fail(key, "is required (YYYY-MM-DD).");
      return undefined;
    }
    const d = v instanceof Date ? v : new Date(String(v));
    if (Number.isNaN(d.getTime())) this.fail(key, "must be a date in YYYY-MM-DD format.");
    return d.toISOString().slice(0, 10);
  }

  boolean(key: string): boolean {
    const v = this.value(key);
    if (v === undefined || v === null) return false;
    if (typeof v !== "boolean") this.fail(key, "must be true or false.");
    return v;
  }

  optionalNumber(key: string): number | undefined {
    const v = this.value(key);
    if (v === undefined || v === null) return undefined;
    if (typeof v !== "number") this.fail(key, "must be a number.");
    return v;
  }

  stringList(key: string, { required = false } = {}): string[] {
    const v = this.value(key);
    if (v === undefined || v === null) {
      if (required) this.fail(key, "is required and must be a list.");
      return [];
    }
    if (!Array.isArray(v) || v.some((item) => typeof item !== "string")) {
      this.fail(key, "must be a list of text values.");
    }
    return v.map((item: string) => item.trim());
  }

  oneOf<T extends string>(key: string, allowed: readonly T[]): T {
    const v = this.string(key);
    if (!allowed.includes(v as T)) this.fail(key, `must be one of: ${allowed.join(", ")}.`);
    return v as T;
  }

  objectList<T>(key: string, fields: readonly (keyof T & string)[]): T[] {
    const v = this.value(key);
    if (v === undefined || v === null) return [];
    if (!Array.isArray(v)) this.fail(key, "must be a list.");
    return v.map((item, i) => {
      if (typeof item !== "object" || item === null) this.fail(`${key}[${i}]`, "must be an object.");
      for (const field of fields) {
        const fv = (item as Record<string, unknown>)[field];
        if (typeof fv !== "string" || fv.trim() === "") {
          this.fail(`${key}[${i}].${field}`, "is required and must be text.");
        }
      }
      return item as T;
    });
  }

  optionalObject<T>(key: string, fields: readonly (keyof T & string)[]): T | undefined {
    const v = this.value(key);
    if (v === undefined || v === null) return undefined;
    if (typeof v !== "object" || Array.isArray(v)) this.fail(key, "must be an object.");
    for (const field of fields) {
      if (typeof (v as Record<string, unknown>)[field] !== "string") {
        this.fail(`${key}.${field}`, "is required and must be text.");
      }
    }
    return v as T;
  }

  requireHeadings(headings: readonly string[]) {
    const found = new Set(
      this.entry.body
        .split("\n")
        .filter((line) => line.startsWith("## "))
        .map((line) => line.slice(3).trim()),
    );
    for (const heading of headings) {
      if (!found.has(heading)) {
        throw new Error(`${this.entry.file}: missing required section "## ${heading}".`);
      }
    }
  }
}

export function readingTimeMinutes(body: string) {
  const words = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

/** Drafts are visible in local development but never in production builds. */
export const showDrafts = process.env.NODE_ENV !== "production";

export function byDateDesc<T extends { date: string }>(a: T, b: T) {
  return b.date.localeCompare(a.date);
}
