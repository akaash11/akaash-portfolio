import type { Metadata } from 'next';
import { Box } from '@mui/material';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Footer from '@/components/Footer';
import Section from '@/components/Section';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `About - ${siteConfig.author.name} | Full Stack Engineer`,
  description: `Learn about ${siteConfig.author.name}'s ${siteConfig.description.split(' ')[5]} years of experience in full-stack development, distributed systems, cloud architecture, and API design. Specializing in React, TypeScript, Python, Node.js, PostgreSQL, and AWS.`,
  keywords: [
    'About Akaash Trivedi',
    'Full Stack Engineer Background',
    'Software Engineer Experience',
    'React Developer Portfolio',
    'TypeScript Expert',
    'Python Developer',
    'Distributed Systems Engineer',
    'Cloud Architecture',
    'Marvell Technology Engineer',
    'Santa Clara University',
  ],
  openGraph: {
    title: `About - ${siteConfig.author.name}`,
    description: `Learn about ${siteConfig.author.name}'s experience and technical expertise`,
    url: `${siteConfig.url}/about`,
    type: 'profile',
  },
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <Box component="main" sx={{ minHeight: 'calc(100vh - 200px)' }}>
        <Section id="about" bgcolor="background.paper">
          <About />
        </Section>
      </Box>
      <Footer />
    </>
  );
}
