import type { Metadata } from 'next';
import { Box } from '@mui/material';
import Navbar from '@/components/Navbar';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';
import Section from '@/components/Section';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `Projects - ${siteConfig.author.name} | Portfolio Showcase`,
  description: `Explore ${siteConfig.author.name}'s portfolio of full-stack projects including SMAR (NSF SBIR awarded HCI research), distributed systems, real-time dashboards, API development, and hackathon-winning applications built with React, Node.js, Python, PostgreSQL, Redis, and AWS.`,
  keywords: [
    'Akaash Trivedi Projects',
    'Software Portfolio',
    'Full Stack Projects',
    'React Projects',
    'Node.js Applications',
    'Python Projects',
    'SMAR Project',
    'NSF SBIR',
    'HCI Research Projects',
    'Distributed Systems',
    'Real-time Dashboard',
    'API Development Portfolio',
    'Open Source Projects',
    'GitHub Portfolio',
  ],
  openGraph: {
    title: `Projects - ${siteConfig.author.name}`,
    description: `Portfolio of full-stack projects and applications`,
    url: `${siteConfig.url}/projects`,
    type: 'website',
  },
  alternates: {
    canonical: '/projects',
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
