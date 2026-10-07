# Avenro website

The company website for **Avenro — Software & Digital Products**: a fast, statically generated Next.js site with a Git-based content system for articles, case studies and service pages.

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in values (all optional in development)
npm run dev                   # http://localhost:3000
```

| Command         | What it does                                        |
| --------------- | --------------------------------------------------- |
| `npm run dev`   | Local development server (drafts are visible)       |
| `npm run build` | Production build — also validates all content files |
| `npm run start` | Serve the production build locally                  |
| `npm run lint`  | ESLint                                              |

## Stack

- **Next.js 16** (App Router, static generation) · **React 19** · **TypeScript**
- **Tailwind CSS 4** with design tokens in `src/app/globals.css`
- **MDX content** in `/content`, rendered with `next-mdx-remote-client` and `remark-gfm`
- **Vercel** hosting and **Vercel Web Analytics** (cookieless)
- **Resend** HTTP API for contact-form delivery (no SDK; server-only credentials)

There is no database and no CMS. Every page is prerendered at build time.

## Project structure

```text
content/
  blog/        Articles (one .mdx file per article — file name = URL slug)
  projects/    Case studies (must contain the standard case-study sections)
  services/    Service pages (structured frontmatter + optional body)
  pages/       Standalone pages such as privacy and terms
  */_template.mdx   Copy these to start new content (ignored by the site)

src/
  app/         Routes: /, /services, /work, /blog, /about, /contact, /privacy, /terms,
               sitemap.ts, robots.ts, rss.xml, opengraph images, not-found
  components/  navigation, footer, ui, sections, blog, work, services, contact, seo
  lib/
    content/   Content layer — the ONLY code that knows content lives in files
    seo/       Metadata builder, schema.org structured data, OG image template
    analytics/ Conversion event helper
    site.ts    Company name, URL, email, founder, navigation, social profiles

public/images/ work/ — case-study screens (WebP); photos/ — licensed photography (see photos/CREDITS.md)
design/mockups/ Editable SVG sources for the case-study screens
docs/          Publishing workflow, growth routine and launch checklist
```

### How content works

`src/lib/content/collection.ts` reads Markdown files and validates frontmatter. Typed modules (`posts.ts`, `projects.ts`, `services.ts`, `pages.ts`) turn those into `Post`, `Project`, `Service` and `ContentPage` objects. Pages only ever call functions such as `getAllPosts()` or `getProject(slug)`.

- **Adding content never requires changing components.** Add a file, push, and the listing pages, sitemap, RSS feed, Open Graph images, related content and "Latest from Avenro" all update on the next build.
- **Invalid content fails the build** with a clear message (missing title, unknown category, a case study missing its "Result" section, and so on), so broken pages never ship.
- **Moving to a headless CMS later** (Sanity, Contentful, headless WordPress) means reimplementing the content layer to fetch from the CMS and return the same types. Pages and components stay as they are. Article bodies are Markdown, which every major CMS can store.

### Adding things that do not exist yet

| To add…               | Do this                                                                                      |
| --------------------- | -------------------------------------------------------------------------------------------- |
| An article            | Copy `content/blog/_template.mdx` — see `docs/PUBLISHING.md`                                 |
| A case study          | Copy `content/projects/_template.mdx` and add a 1600×1000 screenshot to `public/images/work/` |
| A blog category       | Add it to `categories` in `src/lib/content/taxonomy.ts` (only when there is content for it)   |
| An author             | Add them to `authors` in `src/lib/content/taxonomy.ts`                                        |
| A service             | Add the slug to `src/lib/content/service-slugs.ts`, then create `content/services/<slug>.mdx` (set `group`, `seoTitle`, `image`) |
| Industries, process, engagement models, standards, company FAQs | Edit `src/lib/content/company.ts` |
| A founder/team portrait | Add `public/images/team/founder.jpg` and replace the monogram block on the About page |
| Testimonials / logos  | Use `TestimonialBlock` / `LogoGrid` in `components/sections/social-proof.tsx` — real and permitted only |
| Products / SaaS pages | Reserved for later: create a `content/products/` collection and `src/app/products/[slug]` route following the projects pattern |
| Industry pages        | Only when each page has genuinely distinct, useful content — see `docs/GROWTH.md`            |

## Environment variables

See `.env.example`. None are required for local development — without Resend credentials, contact submissions are printed to the terminal in development.

| Variable                                | Purpose                                                 |
| --------------------------------------- | ------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                  | Canonical site URL (default `https://avenro.com`)       |
| `RESEND_API_KEY`                        | Resend API key for contact-form email (server-only)     |
| `CONTACT_FROM_EMAIL`                    | Sender address on a Resend-verified domain              |
| `CONTACT_TO_EMAIL`                      | Where inquiries are delivered (default `hello@avenro.com`) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`  | Optional Search Console HTML-tag verification           |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION`    | Optional Bing Webmaster Tools verification              |

In production, if Resend is not configured the form shows a friendly error with the email address instead of silently dropping messages.

## Deployment (Vercel)

1. Push this repository to GitHub.
2. Import it in Vercel (framework preset: Next.js). Add the environment variables for **Production**.
3. Add the custom domain `avenro.com` (and redirect `www` to the apex, or the reverse — pick one).
4. Every push to `main` deploys to production. Pull requests get preview deployments, which are automatically excluded from search engines (`robots.txt` disallows all and pages are `noindex` when `VERCEL_ENV=preview`).
5. Enable **Web Analytics** in the Vercel project. Custom conversion events (`cta_start_project`, `contact_submit`, `email_click`, `project_click`, `service_click`) require a Vercel plan that supports custom events; page views work on all plans.

## Design and performance

- Dark/light section rhythm with CSS device frames (`components/ui/device-frames.tsx`) around product screens. Screens are designed as SVG (`design/mockups/`) and exported to WebP, because detailed SVG images are laid out on the main thread and slowed mobile rendering. To update one, edit the SVG, render it at 1600px wide (mobile: 780px), and save it as WebP in `public/images/work/`.
- Photography is served through `next/image` as AVIF/WebP at responsive sizes; only above-the-fold images use `priority`.
- Scroll reveals use CSS scroll-driven animations (`.reveal`) — zero JavaScript, skipped for reduced-motion users and unsupported browsers.
- The Services dropdown is CSS-only (hover and keyboard focus). The only client JavaScript is the mobile menu, nav state, the contact form and analytics.
- Photos never show people presented as Avenro staff. Stock photos of people are used only to illustrate client industries.

## SEO features

Unique titles and descriptions, canonical URLs, Open Graph and X cards with generated images, `sitemap.xml`, `robots.txt`, RSS (`/rss.xml`), schema.org Organization, WebSite, BlogPosting, BreadcrumbList, Service, FAQPage and CreativeWork markup, semantic headings, a custom 404 page and permanent redirects for common alternative URLs (`/insights`, `/portfolio`, `/case-studies`, `/feed`).

## Further reading

- `docs/PUBLISHING.md` — how to write and publish an article or case study
- `docs/GROWTH.md` — search tools setup, email/DNS, monthly review routine and growth phases
- `docs/LAUNCH-CHECKLIST.md` — V1 definition of done and current status
