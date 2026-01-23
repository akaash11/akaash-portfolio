import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "@/components/ThemeRegistry";
import { siteConfig } from "@/config/site";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: [
    // Personal Brand
    "Akaash Trivedi",
    "Akaash Trivedi Portfolio",
    // Roles & Titles
    "Full Stack Engineer",
    "Senior Software Engineer",
    "Software Developer",
    "Backend Engineer",
    "Frontend Developer",
    // Core Technologies
    "React Developer",
    "TypeScript Developer",
    "Python Developer",
    "Node.js Developer",
    "Next.js Portfolio",
    // Specializations
    "Distributed Systems",
    "Cloud Architecture",
    "API Development",
    "System Design",
    "Microservices",
    "PostgreSQL",
    "Redis",
    "AWS",
    // Location-based
    "Software Engineer New York",
    "Full Stack Engineer NYC",
    // Companies & Education
    "Marvell Technology",
    "Qualys",
    "Santa Clara University",
    // Research & Achievements
    "HCI Research",
    "NSF SBIR",
    // Technical Skills
    "REST API",
    "GraphQL",
    "Docker",
    "Kubernetes",
    "CI/CD",
  ],
  authors: [{ name: siteConfig.author.name, url: siteConfig.social.linkedin }],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  category: "technology",
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.author.name} - Full Stack Engineer`,
        type: "image/png",
      },
    ],
  },
  other: {
    "article:author": siteConfig.author.name,
    "profile:username": "akaash11",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: "@akaasht",
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add these when you verify your site
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured data for SEO (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author.name,
    jobTitle: siteConfig.author.title,
    email: siteConfig.author.email,
    url: siteConfig.url,
    sameAs: [
      siteConfig.social.linkedin,
      siteConfig.social.github,
      siteConfig.social.twitter,
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.author.location,
      addressCountry: "US",
    },
    alumniOf: {
      "@type": "Organization",
      name: "Santa Clara University",
    },
    worksFor: {
      "@type": "Organization",
      name: "Marvell Technology",
    },
  };

  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <head>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeRegistry>{children}</ThemeRegistry>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
