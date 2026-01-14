/**
 * Site configuration constants
 * Single source of truth for site-wide settings
 */

import { calculateYearsOfExperience } from '@/utils/experience';

/**
 * Calculate years of experience dynamically
 * Note: This is evaluated at build time for static metadata.
 * With continuous deployment (Vercel), this stays up-to-date automatically.
 * The same calculation is used in Hero and About components at runtime.
 */
const yearsOfExperience = calculateYearsOfExperience();

export const siteConfig = {
  // Base URL - from env var or fallback to production URL
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://akaasht.vercel.app',
  
  // Site metadata
  name: 'Akaash Trivedi Portfolio',
  title: 'Akaash Trivedi | Full Stack Engineer',
  description: `Sr. Software Engineer with ${yearsOfExperience}+ years of experience. Specializing in distributed systems, APIs, cloud architecture, and full-stack development with Python, React, PostgreSQL, Redis, and AWS.`,
  
  // Author information
  author: {
    name: 'Akaash Trivedi',
    email: 'akaashtrivedi2@gmail.com',
    title: 'Sr. Software Engineer @ Marvell Technology',
    location: 'New York',
    education: 'MS in Computer Science & Engineering',
  },
  
  // Social links
  social: {
    linkedin: 'https://www.linkedin.com/in/akaash-trivedi',
    github: 'https://github.com/akaash11',
    twitter: 'https://twitter.com/akaasht',
  },
  
  // OG Image
  ogImage: '/og-image.png',
} as const;

/**
 * Helper to construct full URLs
 */
export function getAbsoluteUrl(path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.url}${cleanPath}`;
}
