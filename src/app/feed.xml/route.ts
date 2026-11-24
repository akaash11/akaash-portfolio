import { siteConfig } from '@/config/site';
import { blogPosts } from '@/data/blog';
import { writing } from '@/data/writing';

export const dynamic = 'force-static';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const rfc822 = (iso: string) => new Date(`${iso}T12:00:00Z`).toUTCString();

/** RSS 2.0 feed of long reads and LinkedIn posts, newest first. Tags become <category>. */
export function GET() {
  const items = [
    ...blogPosts.map((p) => ({ title: p.title, link: `${siteConfig.url}/writing/${p.slug}`, date: p.date, summary: p.summary, tags: p.tags })),
    ...writing.map((p) => ({ title: p.title, link: p.url, date: p.date, summary: p.summary, tags: p.tags })),
  ].sort((a, b) => b.date.localeCompare(a.date));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(`${siteConfig.author.name}: Writing`)}</title>
    <link>${siteConfig.url}/#writing</link>
    <description>${esc('Long reads on building and evaluating agentic systems, plus AI security posts from LinkedIn.')}</description>
    <language>en-us</language>
    <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml" />
${items
  .map(
    (i) => `    <item>
      <title>${esc(i.title)}</title>
      <link>${esc(i.link)}</link>
      <guid isPermaLink="true">${esc(i.link)}</guid>
      <pubDate>${rfc822(i.date)}</pubDate>
      <description>${esc(i.summary)}</description>
${i.tags.map((t) => `      <category>${esc(t)}</category>`).join('\n')}
    </item>`,
  )
  .join('\n')}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
