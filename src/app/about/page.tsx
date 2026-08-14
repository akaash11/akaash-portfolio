import type { Metadata } from 'next';
import { Box } from '@mui/material';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Footer from '@/components/Footer';
import Section from '@/components/Section';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `About - ${siteConfig.author.name} | Applied AI Engineer`,
  description: `Learn about ${siteConfig.author.name}'s ${siteConfig.yearsOfExperience}+ years across cybersecurity, fintech, and semiconductors, now building agentic systems, AI developer tooling, and retrieval infrastructure at Marvell Technology.`,
  keywords: [
    'About Akaash Trivedi',
    'Applied AI Engineer',
    'AI Engineering Background',
    'Agentic Systems Engineer',
    'AI Security',
    'Developer Tooling',
    'Distributed Systems Engineer',
    'Marvell Technology Engineer',
    'Qualys',
    'Santa Clara University',
  ],
  openGraph: {
    title: `About - ${siteConfig.author.name}`,
    description: `Learn about ${siteConfig.author.name}'s experience and technical expertise`,
    url: `${siteConfig.url}/about`,
    type: 'profile',
  },
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <Box component="main" sx={{ minHeight: 'calc(100vh - 200px)', mt: 4 }}>
        <Section id="about" bgcolor="background.paper">
          <About isStandalone />
        </Section>
      </Box>
      <Footer />
    </>
  );
}
