import type { Metadata } from 'next';
import { Box } from '@mui/material';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Section from '@/components/Section';
import Writing from '@/components/Writing';
import { siteConfig } from '@/config/site';
import { blogPosts } from '@/data/blog';
import { writing } from '@/data/writing';

const url = `${siteConfig.url}/writing`;
const allTags = [...new Set([...blogPosts, ...writing].flatMap((p) => p.tags))];

export const metadata: Metadata = {
  title: `Writing - ${siteConfig.author.name} | Agentic AI, Security and LLM Infrastructure`,
  description: `Long reads and LinkedIn posts by ${siteConfig.author.name} on agentic systems, AI security, supply-chain attacks and LLM infrastructure, filterable by topic.`,
  keywords: allTags,
  openGraph: {
    title: `Writing - ${siteConfig.author.name}`,
    description: 'Long reads and LinkedIn posts on agentic AI, security and LLM infrastructure.',
    url,
    type: 'website',
  },
  alternates: { canonical: url },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: `${siteConfig.author.name}: Writing`,
  url,
  keywords: allTags.join(', '),
  author: { '@id': `${siteConfig.url}/#person` },
  hasPart: [
    ...blogPosts.map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: `${url}/${p.slug}` })),
    ...writing.map((p) => ({ '@type': 'SocialMediaPosting', headline: p.title, url: p.url })),
  ],
};

export default function WritingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <Box component="main" sx={{ minHeight: 'calc(100vh - 200px)', mt: 4 }}>
        <Section id="writing" title="Writing" compactPadding isMainSection>
          <Writing />
        </Section>
      </Box>
      <Footer />
    </>
  );
}
