import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

/**
 * robots.txt
 *
 * AI search and answer engines (ChatGPT search, Claude, Perplexity, Gemini, Apple) use their
 * own crawlers. They're named explicitly so the intent to be indexed and cited is unambiguous.
 * `/_next/` is not disallowed: crawlers that render pages need the CSS and JS there.
 */
const aiCrawlers = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Applebot',
  'Bingbot',
  'Googlebot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: aiCrawlers, allow: '/', disallow: ['/api/'] },
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
