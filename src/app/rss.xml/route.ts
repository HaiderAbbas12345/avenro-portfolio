import { absoluteUrl, site } from "@/lib/site";
import { getAllPosts } from "@/lib/content";

export const dynamic = "force-static";

function escape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** RSS 2.0 feed of published articles, regenerated on every build. */
export function GET() {
  const posts = getAllPosts().filter((post) => !post.draft);

  const items = posts
    .map(
      (post) => `    <item>
      <title>${escape(post.title)}</title>
      <link>${absoluteUrl(post.url)}</link>
      <guid isPermaLink="true">${absoluteUrl(post.url)}</guid>
      <description>${escape(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${escape(post.category.name)}</category>
      <dc:creator>${escape(post.author.name)}</dc:creator>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escape(`${site.name} Insights`)}</title>
    <link>${absoluteUrl("/blog")}</link>
    <description>${escape(site.description)}</description>
    <language>en</language>
    <atom:link href="${absoluteUrl("/rss.xml")}" rel="self" type="application/rss+xml" />
${posts[0] ? `    <lastBuildDate>${new Date(posts[0].updated ?? posts[0].date).toUTCString()}</lastBuildDate>\n` : ""}${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
