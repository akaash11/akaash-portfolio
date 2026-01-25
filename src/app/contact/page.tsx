import type { Metadata } from 'next';
import { Box } from '@mui/material';
import Navbar from '@/components/Navbar';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Section from '@/components/Section';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `Contact - ${siteConfig.author.name} | Get in Touch`,
  description: `Get in touch with ${siteConfig.author.name}, Full Stack Engineer based in ${siteConfig.author.location}. Available for full-time opportunities, consulting, and collaboration. Connect via email, LinkedIn, GitHub, or Twitter.`,
  keywords: [
    'Contact Akaash Trivedi',
    'Hire Full Stack Engineer',
    'Software Engineer Contact',
    'Get in Touch',
    'Email Akaash Trivedi',
    'LinkedIn Akaash Trivedi',
    'New York Software Engineer',
    'Full Stack Developer Hire',
    'Engineering Opportunities',
  ],
  openGraph: {
    title: `Contact - ${siteConfig.author.name}`,
    description: `Get in touch with ${siteConfig.author.name} for opportunities and collaboration`,
    url: `${siteConfig.url}/contact`,
    type: 'website',
  },
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <Box component="main" sx={{ minHeight: 'calc(100vh - 200px)' }}>
        <Section id="contact" title="Contact" compactPadding isMainSection>
          <Contact />
        </Section>
      </Box>
      <Footer />
    </>
  );
}
