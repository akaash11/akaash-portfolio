import type { Metadata } from 'next';
import { Box } from '@mui/material';
import Navbar from '@/components/Navbar';
import Timeline from '@/components/Timeline';
import Footer from '@/components/Footer';
import Section from '@/components/Section';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `Experience - ${siteConfig.author.name} | Professional Timeline`,
  description: `Explore ${siteConfig.author.name}'s professional journey: Sr. Software Engineer at Marvell Technology, former engineer at Qualys, HCI researcher at Santa Clara University, and teaching assistant. ${siteConfig.description.split(' ')[5]}+ years of industry experience.`,
  keywords: [
    'Akaash Trivedi Experience',
    'Professional Timeline',
    'Marvell Technology Engineer',
    'Qualys Software Engineer',
    'Santa Clara University',
    'HCI Research',
    'Teaching Assistant',
    'Software Engineering Career',
    'Full Stack Engineer History',
    'Work Experience',
  ],
  openGraph: {
    title: `Experience - ${siteConfig.author.name}`,
    description: `Professional experience and career timeline of ${siteConfig.author.name}`,
    url: `${siteConfig.url}/experience`,
    type: 'profile',
  },
  alternates: {
    canonical: '/experience',
  },
};

export default function ExperiencePage() {
  return (
    <>
      <Navbar />
      <Box component="main" sx={{ minHeight: 'calc(100vh - 200px)' }}>
        <Section id="experience">
          <Timeline />
        </Section>
      </Box>
      <Footer />
    </>
  );
}
