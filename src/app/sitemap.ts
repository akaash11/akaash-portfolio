import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

/**
 * Dynamic sitemap generation using Next.js App Router
 * This will automatically generate sitemap.xml at build time
 * 
 * SEO Best Practice: This dynamic sitemap is better than the static one
 * because it automatically updates lastModified dates on each build.
 * 
 * Updated: Now includes all route-based pages for better SEO!
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const now = new Date();

  // Main pages - each page has its own route and metadata
  const pages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/experience`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Future: Add individual project pages
  // projects.map(project => ({
  //   url: `${baseUrl}/projects/${project.slug}`,
  //   lastModified: now,
  //   changeFrequency: 'monthly',
  //   priority: 0.7,
  // }))

  // Future: Add blog posts
  // posts.map(post => ({
  //   url: `${baseUrl}/blog/${post.slug}`,
  //   lastModified: post.publishedAt,
  //   changeFrequency: 'yearly',
  //   priority: 0.6,
  // }))

  return pages;
}
