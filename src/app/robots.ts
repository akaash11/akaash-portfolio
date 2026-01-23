import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

/**
 * Robots.txt configuration for SEO
 * This tells search engines which pages to crawl
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
