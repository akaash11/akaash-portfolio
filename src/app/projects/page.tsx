import type { Metadata } from 'next';
import { Box } from '@mui/material';
import Navbar from '@/components/Navbar';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';
import Section from '@/components/Section';
import { siteConfig } from '@/config/site';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
  title: `Projects - ${siteConfig.author.name} | Applied AI Portfolio`,
  description: `${siteConfig.author.name}'s projects: a private, voice-first RAG assistant with evals and prompt-injection defenses (MRR 0.88, 109/109 injection checks), 2248 Linko, a mobile game shipped solo on the App Store and Google Play, and SMAR, NSF-funded HCI research.`,
  keywords: [
    'Akaash Trivedi Projects',
    'Applied AI Portfolio',
    'RAG Evaluation',
    'Private RAG Assistant',
    'Prompt Injection',
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
    description: `A private RAG assistant with evals, a shipped mobile game, and NSF-funded HCI research`,
    url: `${siteConfig.url}/projects`,
    type: 'website',
  },
  alternates: {
    canonical: `${siteConfig.url}/projects`,
  },
};

const projectsJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: projects.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': p.appStoreLink || p.playStoreLink ? 'SoftwareApplication' : 'CreativeWork',
      name: p.title,
      headline: p.subtitle,
      description: p.description,
      keywords: p.technologies.join(', '),
      creator: { '@id': `${siteConfig.url}/#person` },
      ...(p.liveLink || p.appStoreLink ? { url: p.liveLink || p.appStoreLink } : {}),
      ...(p.appStoreLink || p.playStoreLink
        ? { applicationCategory: 'GameApplication', operatingSystem: 'iOS, Android' }
        : {}),
    },
  })),
};

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
      />
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
