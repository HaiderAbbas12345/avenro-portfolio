# Growth operations

The website is the central asset behind every acquisition channel. This document covers the free tools to set up, domain and email configuration, the monthly review routine, and the growth phases.

> Projects → Case Studies → Articles → Search Visibility → Outreach → Clients → Testimonials → More Projects → More Content → More Authority → Products

## 1. Search and performance tools (all free)

### Google Search Console
1. Add a **Domain property** for `avenro.com` and verify with the DNS TXT record (preferred), or set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` for HTML-tag verification.
2. Submit `https://avenro.com/sitemap.xml` under **Sitemaps**.
3. Watch: indexed pages, queries, impressions, clicks, average position, indexing issues and Core Web Vitals.

### Bing Webmaster Tools
Import the site from Search Console (fastest), or verify with `NEXT_PUBLIC_BING_SITE_VERIFICATION`. Submit the sitemap.

### PageSpeed Insights and Lighthouse
- Run [PageSpeed Insights](https://pagespeed.web.dev/) on the homepage, a service page, a case study and an article after each significant change. Check mobile first.
- Use Lighthouse in Chrome DevTools during development (Performance, Accessibility, Best Practices, SEO).

### Analytics
Vercel Web Analytics is the only analytics tool. It is cookieless and needs no consent banner. Custom conversion events:

| Event               | Fires when                                             |
| ------------------- | ------------------------------------------------------ |
| `cta_start_project` | Any "Start a Project" button is clicked (`location` prop) |
| `contact_submit`    | The contact form is submitted successfully             |
| `email_click`       | A `mailto:` link is clicked (`location` prop)          |
| `project_click`     | A project card is clicked (`project` prop)             |
| `service_click`     | A service card/link is clicked (`service` prop)        |

Do not add more analytics platforms. Do not buy SEO tools or backlinks, and never use black-hat SEO.

## 2. Domain and email

1. Register `avenro.com` in an account you control; enable auto-renew and registrar lock.
2. Set up professional email (Google Workspace, Microsoft 365 or Fastmail): `hello@avenro.com` first; add `projects@` and `support@` as aliases when needed, plus a personal mailbox for the founder.
3. Configure **before any outbound email**:
   - **SPF** — one TXT record listing every service that sends as `@avenro.com` (email provider + Resend).
   - **DKIM** — enable for the email provider and for Resend (Resend shows the records to add).
   - **DMARC** — start with `v=DMARC1; p=none; rua=mailto:<reports address>`, monitor reports, then move to `quarantine` and eventually `reject`.
4. Verify the domain in Resend and set `CONTACT_FROM_EMAIL` to an address on it (e.g. `website@avenro.com`).
5. Consider sending outbound sales email from a separate subdomain or secondary domain to protect the main domain's reputation. Follow CAN-SPAM, UK PECR/GDPR and similar rules for unsolicited email.

## 3. Outbound integration

Send prospects to the most relevant page, not the homepage:

| Prospect          | Link                                                   |
| ----------------- | ------------------------------------------------------ |
| Agency            | `avenro.com/services/development-partnerships`          |
| Local / service business | `avenro.com/services/websites` (+ a relevant case study) |
| Startup           | `avenro.com/services/web-applications`                  |

## 4. Keyword strategy

Avoid very competitive head terms ("web development company", "best web developer"). Build around specific intent:

- business website development · website redesign for small businesses · website development for service businesses
- web application development · custom dashboard development · Next.js development
- white-label web development · web development for agencies

Location and industry pages (`/industries/...`, `/locations/...`) are only created when each page can say something genuinely different and useful. Never create near-identical city pages.

## 5. Monthly review routine

**Website** — traffic, top pages, contact submissions, CTA clicks (by location), performance (PageSpeed), broken links, indexing issues.

**Search** — top queries, pages gaining impressions, pages gaining or losing visibility, pages ranking on positions 8–20 that could reach page one with improvement.

**Content** — articles and case studies published, older content needing updates (set `updated:` when you revise).

**Sales** — prospects contacted, replies, calls, proposals, closed projects. Which pages did prospects visit? Which questions did they ask that the website does not yet answer? Those questions become the next articles and page improvements.

Improve pages that already get impressions before writing new ones.

## 6. Growth phases

1. **Foundation** — domain, hosting, email, core pages, blog infrastructure, SEO foundation, analytics, Search Console. *(This build.)*
2. **Proof** — 3–5 strong case studies from real work, genuine testimonials, company and founder LinkedIn profiles (add URLs to `site.social` in `src/lib/site.ts`).
3. **Content growth** — 2–4 genuinely useful articles a month when there is something useful to say.
4. **SEO growth** — use Search Console data to improve pages close to page one.
5. **Industry specialization** — dedicated pages for the niches that respond best in sales (e.g. websites for home-service businesses, white-label development for agencies).
6. **Authority** — guest contributions, partnerships, relevant directories, open-source work, useful resources, genuine mentions.
7. **Company evolution** — team, careers, products (`/products`), SaaS, documentation, partner program. Update `site.positioning` in `src/lib/site.ts` as the company grows, from "independent studio" to "software development company" to "technology company".
