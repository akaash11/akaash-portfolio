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
  description: "Portfolio of Akaash Trivedi - Full Stack Engineer with 7 years of experience specializing in React, TypeScript, Node.js, and cloud technologies.",
  keywords: ["Akaash Trivedi", "Full Stack Engineer", "Software Developer", "React", "TypeScript", "Node.js"],
  authors: [{ name: "Akaash Trivedi" }],
  openGraph: {
    title: "Akaash Trivedi | Full Stack Engineer",
    description: "Portfolio of Akaash Trivedi - Full Stack Engineer with 7 years of experience",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akaash Trivedi | Full Stack Engineer",
    description: "Portfolio of Akaash Trivedi - Full Stack Engineer with 7 years of experience",
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
