import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

/**
 * Dynamic sitemap generation using Next.js App Router
 * This will automatically generate sitemap.xml at build time
 * 
 * Note: This will override the static public/sitemap.xml when deployed.
 * For a simple site, you can delete public/sitemap.xml and use this instead.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const sections = ['', '#about', '#experience', '#projects', '#contact'];
  
  return sections.map((section) => ({
    url: `${siteConfig.url}${section}`,
    lastModified: new Date(),
    changeFrequency: section === '' ? 'weekly' : 'monthly',
    priority: section === '' ? 1.0 : 0.8,
  })) as MetadataRoute.Sitemap;
}
