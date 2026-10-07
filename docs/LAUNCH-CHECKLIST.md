# V1 launch checklist

V1 is not done because the homepage looks good. It is done when every item below is checked.

## Built into the codebase

- [x] All primary pages: `/`, `/services`, three service pages, `/work`, case studies, `/about`, `/blog`, articles, `/contact`, `/privacy`, `/terms`
- [x] Custom 404 page
- [x] Metadata on every page: unique titles, descriptions, canonical URLs
- [x] Open Graph / X cards with generated social images
- [x] `sitemap.xml`, `robots.txt`, RSS feed (`/rss.xml`)
- [x] Structured data: Organization, WebSite, BlogPosting, BreadcrumbList, Service, FAQPage
- [x] Blog system: adding an article only requires adding a content file
- [x] Case studies use one reusable template with enforced sections
- [x] Three projects available (clearly labeled concept projects)
- [x] Three initial articles
- [x] No fake testimonials, clients, statistics or claims; no lorem ipsum
- [x] Accessible components: skip link, visible focus states, labeled form fields, keyboard-operable menu, reduced-motion support
- [x] Preview deployments excluded from search engines
- [x] Conversion events wired for CTAs, contact submissions, email, project and service clicks

## Needs to be done when you launch

- [ ] Buy the domain and connect it in Vercel
- [ ] Set up professional email (`hello@avenro.com`) with SPF, DKIM and DMARC
- [ ] Verify the domain in Resend; set `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` and `CONTACT_TO_EMAIL` in Vercel
- [ ] Send a real test inquiry through the live contact form and confirm delivery
- [ ] Enable Vercel Web Analytics
- [ ] Verify Google Search Console and Bing Webmaster Tools; submit the sitemap
- [ ] Check social previews for the homepage, one article and one case study
- [ ] Run PageSpeed Insights (mobile) on the homepage, a service page, a case study and an article
- [ ] Run Lighthouse accessibility checks and test the site with keyboard only
- [ ] Test on a real iPhone and Android phone
- [ ] Check for broken links (e.g. with a link checker against the production URL)
- [ ] Review the privacy policy and terms (ideally with a qualified advisor) for your jurisdiction
- [ ] Confirm the "reply within two business days" promise is one you can keep
- [ ] Add LinkedIn / GitHub URLs to `site.social` in `src/lib/site.ts` once the profiles exist
- [ ] Replace concept projects with real client work as soon as it exists
- [ ] Add a real founder portrait (About page) and, as the company grows, real team photos
- [ ] Confirm the commitments in `src/lib/content/company.ts` (reply time, WCAG target, weekly updates) are ones you will keep
