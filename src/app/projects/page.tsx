import type { Metadata } from 'next';
import { Box } from '@mui/material';
import Navbar from '@/components/Navbar';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';
import Section from '@/components/Section';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `Projects - ${siteConfig.author.name} | Applied AI Portfolio`,
  description: `Explore ${siteConfig.author.name}'s project portfolio: a hand-built retrieval engine for an agent (in progress) with an nDCG/MRR eval harness, SMAR (NSF SBIR-awarded HCI research), and 2248 Linko, a mobile game shipped solo on the App Store and Google Play.`,
  keywords: [
    'Akaash Trivedi Projects',
    'Applied AI Portfolio',
    'Retrieval Engine',
    'RAG Project',
    'Agentic Systems',
    'SMAR Project',
    'NSF SBIR',
    'HCI Research Projects',
    'Distributed Systems',
    'Indie Mobile Game',
    'GitHub Portfolio',
  ],
  openGraph: {
    title: `Projects - ${siteConfig.author.name}`,
    description: `Applied AI, retrieval systems, and HCI research projects`,
    url: `${siteConfig.url}/projects`,
    type: 'website',
  },
  alternates: {
    canonical: `${siteConfig.url}/projects`,
  },
};

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <Box component="main" sx={{ minHeight: 'calc(100vh - 200px)', mt: 4 }}>
        <Section id="projects" title="Projects" bgcolor="background.paper" compactPadding isMainSection>
          <Projects />
        </Section>
      </Box>
      <Footer />
    </>
  );
}
