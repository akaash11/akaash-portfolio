import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "@/components/ThemeRegistry";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Akaash Trivedi | Full Stack Engineer",
  description: "Sr. Software Engineer at Marvell Technology with 7+ years of experience. Specializing in scalable systems, APIs, cloud architecture, and full-stack development with React, TypeScript, Node.js, Python, and AWS.",
  keywords: [
    "Akaash Trivedi",
    "Full Stack Engineer",
    "Senior Software Engineer",
    "Software Developer",
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "AWS",
    "Marvell Technology",
    "Santa Clara University",
    "HCI Research",
    "System Design",
    "API Development",
    "Cloud Architecture",
  ],
  authors: [{ name: "Akaash Trivedi", url: "https://www.linkedin.com/in/akaash-trivedi" }],
  creator: "Akaash Trivedi",
  publisher: "Akaash Trivedi",
  metadataBase: new URL("https://akaash-portfolio.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Akaash Trivedi | Full Stack Engineer",
    description: "Sr. Software Engineer at Marvell Technology with 7+ years of experience specializing in scalable systems, APIs, and cloud architecture.",
    url: "https://akaash-portfolio.vercel.app",
    siteName: "Akaash Trivedi Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png", // You can add this image later
        width: 1200,
        height: 630,
        alt: "Akaash Trivedi - Full Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Akaash Trivedi | Full Stack Engineer",
    description: "Sr. Software Engineer at Marvell Technology with 7+ years of experience",
    creator: "@akaasht",
    images: ["/og-image.png"],
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
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
