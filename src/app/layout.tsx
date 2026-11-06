import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "@/components/ThemeRegistry";
import { siteConfig } from "@/config/site";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { experiences } from "@/data/experience";
import { monthYearToISO } from "@/utils/experience";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
    shortcut: ["/icon.png"],
  },
  keywords: [
    "Akaash Trivedi",
    "Akaash Trivedi Portfolio",
    "Staff Software Engineer",
    "Applied AI Engineer",
    "AI Engineer",
    "Forward Deployed Engineer",
    "Agentic Systems",
    "AI Agents",
    "LangGraph",
    "LangChain",
    "LiteLLM",
    "MCP",
    "Retrieval Augmented Generation",
    "RAG Evaluation",
    "LLM Evals",
    "Developer Experience",
    "Developer Productivity",
    "Platform Engineering",
    "CI/CD",
    "AI Security",
    "Application Security",
    "SIEM",
    "MITRE ATT&CK",
    "Fintech Engineering",
    "Payments Engineering",
    "Distributed Systems",
    "Python",
    "Django",
    "Celery",
    "Redis",
    "PostgreSQL",
    "Docker",
    "AWS",
    "Marvell Technology",
    "Qualys",
    "Santa Clara University",
    "Software Engineer New York",
  ],
  authors: [{ name: siteConfig.author.name, url: siteConfig.social.linkedin }],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
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
        alt: `${siteConfig.author.name} - Applied AI Engineer`,
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

// Viewport configuration for better performance
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Work/research/teaching history as machine-readable structured data,
  // generated from the same source of truth the Experience page renders —
  // keeps this in sync with src/data/experience.ts without hand-duplication.
  // Education entries are covered separately by `alumniOf` below.
  const hasOccupation = experiences
    .filter((exp) => exp.type === 'work' || exp.type === 'research' || exp.type === 'teaching')
    .map((exp) => ({
      "@type": "OrganizationRole",
      roleName: exp.title,
      startDate: monthYearToISO(exp.startDate),
      ...(exp.current ? {} : { endDate: monthYearToISO(exp.endDate) }),
      worksFor: {
        "@type": "Organization",
        name: exp.organization,
      },
    }));

  // Structured data for SEO (JSON-LD)
  // Note: Email removed to prevent bot scraping
  const person = {
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: siteConfig.author.name,
    jobTitle: "Staff Software Engineer",
    description: siteConfig.description,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
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
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Santa Clara University" },
      { "@type": "CollegeOrUniversity", name: "Vishwakarma Institute of Technology" },
    ],
    worksFor: {
      "@type": "Organization",
      name: "Marvell Technology",
      url: "https://www.marvell.com/",
    },
    knowsAbout: [
      "Applied AI",
      "AI agents",
      "Agentic systems",
      "LangGraph",
      "LangChain",
      "LiteLLM",
      "Model Context Protocol",
      "Retrieval-augmented generation",
      "Retrieval evaluation",
      "Developer experience",
      "Platform engineering",
      "CI/CD",
      "AI security",
      "Application security",
      "SIEM",
      "MITRE ATT&CK",
      "Payments engineering",
      "Distributed systems",
      "Python",
      "Django",
    ],
    hasOccupation,
  };

  // ProfilePage tells search and answer engines this site is about one person.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: siteConfig.url,
    name: siteConfig.title,
    mainEntity: person,
  };

  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <head>
        {/* Preconnect to Google Fonts for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
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
