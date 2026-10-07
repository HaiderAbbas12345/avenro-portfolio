# Publishing content

Avenro publishes with **Markdown/MDX + GitHub + automatic deployment**. There is no admin dashboard: adding a file to `content/` and pushing to `main` is all it takes.

## Before you write: is this worth publishing?

Never publish content just to "feed Google". Answer these first:

1. **Who is this for?** (a business owner, an agency, a startup founder, a developer…)
2. **What problem does it solve?**
3. **Would a real person find this useful** — enough to bookmark or share it?
4. **Does it demonstrate something Avenro actually understands?**

If any answer is weak, improve the idea or skip it. Two useful articles a month beat ten forgettable ones.

### Content groups

- **Buyer-focused** — questions prospects ask before they hire (cost, timelines, redesigns, what makes a site work).
- **Technical authority** — how we build fast, maintainable websites and applications.
- **Company** — launches, behind-the-build notes, lessons from real projects. Use the `avenro-updates` category.

## Publishing an article — step by step

1. **Choose a real question or problem** — ideally one a prospect actually asked, or a query from Search Console.
2. **Research the topic.** Check facts; link to primary sources where you cite them.
3. **Write for humans first.** Plain language, short paragraphs, descriptive `##` headings. No H1 (the title is rendered for you).
4. **Add original value** — examples, screenshots, experience, observations. Never invent statistics, clients or quotes.
5. **Write the title and meta description.** Title: specific and honest. Description: one sentence, 140–160 characters.
6. **Add internal links** to the relevant service page and 1–2 related articles.
7. **Set the CTA.** Set `service:` so the article ends with that service's call to action, or write a specific `cta:` block.
8. **Optimize images.** Optional cover image at 1600×900, compressed (WebP/JPEG, ideally under 200 KB), with descriptive `imageAlt`. Put files in `public/images/blog/`.
9. **Add the file** to `content/blog/` — copy `content/blog/_template.mdx`. The file name is the URL: `content/blog/website-redesign-checklist.mdx` → `/blog/website-redesign-checklist`. Use lowercase words separated by hyphens.
10. **Preview locally** with `npm run dev` (drafts are visible locally). Run `npm run build` — it fails with a clear message if frontmatter is wrong.
11. **Commit to GitHub** and push to `main` (or open a pull request to get a preview link first).
12. **Automatic deployment** publishes it. The blog listing, category page, sitemap, RSS feed, Open Graph image, related articles and "Latest from Avenro" update automatically.
13. **Check the live page**: title, description, links, mobile layout, and the social preview (paste the URL into a LinkedIn post composer, then discard it).
14. **Request indexing** in Google Search Console (URL Inspection → Request indexing) for important articles.
15. **Monitor** impressions and clicks over the following weeks. Update the article (and set `updated:`) when you improve it.

### Frontmatter reference

| Field         | Required | Notes                                                                            |
| ------------- | -------- | -------------------------------------------------------------------------------- |
| `title`       | Yes      |                                                                                  |
| `description` | Yes      | Used for meta description, cards and RSS                                         |
| `date`        | Yes      | `YYYY-MM-DD` — the real publication date                                         |
| `updated`     | No       | Set when you meaningfully revise the article                                     |
| `author`      | Yes      | An id from `src/lib/content/taxonomy.ts`                                         |
| `category`    | Yes      | `web-development`, `business-technology`, `product-development`, `avenro-updates` |
| `tags`        | No       | A few descriptive tags                                                           |
| `service`     | No       | `websites`, `web-applications`, `development-partnerships` — drives the CTA      |
| `featured`    | No       | `true`/`false`                                                                   |
| `draft`       | No       | `true` hides the article from production builds                                  |
| `image`       | No       | Cover image path; `imageAlt` is then required                                    |
| `cta`         | No       | `title`, `text`, optional `label` and `href`                                     |

### Available MDX components

- `<Callout title="Optional title">Text</Callout>` — a highlighted note. Use sparingly.
- Standard Markdown, including tables (GitHub-flavored Markdown).

## Publishing a case study

1. Copy `content/projects/_template.mdx` to `content/projects/<slug>.mdx`.
2. Keep the required sections: **Overview, The Challenge, Approach, Solution, Technology, Result**. The build fails if one of the required sections is missing.
3. Add a 1600×1000 screenshot to `public/images/work/` with descriptive `imageAlt`.
4. **Results must be real.** Only include metrics that are verifiable and that the client agreed to share. Otherwise describe the actual outcome honestly, e.g. *"The redesigned interface simplified navigation and provided a clearer path to requesting a quote."*
5. Mark self-initiated work as `type: "concept"` — it is labeled as a concept everywhere on the site.
6. Set `featured: true` (and a low `order`) for the three projects that should appear on the homepage.
7. Ask permission before naming a client, showing their logo or linking to their live site.

## Replacing the concept projects

The launch site includes three clearly labeled concept projects. As real client work is completed, add it as `type: "client"` with `featured: true` and set the concept projects to `featured: false` (or delete them).
