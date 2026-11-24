import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Timeline from '@/components/Timeline';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Writing from '@/components/Writing';
import Footer from '@/components/Footer';
import Section from '@/components/Section';
import { Box } from '@mui/material';
import { siteConfig } from '@/config/site';
import { blogPosts } from '@/data/blog';
import { writing } from '@/data/writing';

// Writing as a Blog entity: long reads on this site plus LinkedIn posts, with tags as keywords.
const writingJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': `${siteConfig.url}/#writing`,
  name: `${siteConfig.author.name}: Writing`,
  url: `${siteConfig.url}/#writing`,
  author: { '@id': `${siteConfig.url}/#person` },
  blogPost: [
    ...blogPosts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${siteConfig.url}/blog/${p.slug}`,
      datePublished: p.date,
      keywords: p.tags.join(', '),
    })),
    ...writing.map((p) => ({
      '@type': 'SocialMediaPosting',
      headline: p.title,
      url: p.url,
      datePublished: p.date,
      keywords: p.tags.join(', '),
    })),
  ],
};

// Note: these were previously loaded via next/dynamic(..., { loading: () => null })
// to lazy-load below-the-fold sections. That pattern renders `null` for the
// Suspense fallback, which (a) hides this content from the server-rendered
// HTML entirely and (b) desyncs MUI's Emotion style-insertion cache between
// the server and client passes, causing widespread hydration className
// mismatches. Plain imports match every other route in this app.

/**
 * Homepage - Full scroll experience
 * 
 * HYBRID APPROACH for best UX + SEO:
 * 
 * This page: Full scroll experience with all sections (Hero → About → Experience → Projects → Contact)
 * - Great UX: Immersive storytelling, natural flow
 * - Users can scroll through everything in one go
 * 
 * Separate routes also exist: /about, /experience, /projects, /contact
 * - Great SEO: Each page can rank independently
 * - Direct access for search engines and shared links
 * 
 * Navbar behavior:
 * - On homepage: Smooth scroll to sections
 * - On other pages: Route navigation
 * 
 * Benefits:
 * ✅ Best user experience (scroll storytelling)
 * ✅ Best SEO (separate indexable pages)
 * ✅ Flexibility (works both ways)
 */
export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(writingJsonLd) }} />
      <Navbar />
      <Box component="main">
        {/* Home Section */}
        <Box id="home" component="section" sx={{ scrollMarginTop: '65px' }}>
          <Hero />
        </Box>

        {/* About Section */}
        <Section id="about" bgcolor="background.paper">
          <About />
        </Section>

        {/* Experience Section */}
        <Section id="experience">
          <Timeline />
        </Section>

        {/* Projects Section */}
        <Section id="projects" title="Projects" bgcolor="background.paper" compactPadding>
          <Projects />
        </Section>

        {/* Writing Section */}
        <Section id="writing" title="Writing">
          <Writing />
        </Section>

        {/* Contact Section */}
        <Section id="contact" title="Contact" bgcolor="background.paper" compactPadding>
          <Contact />
        </Section>
      </Box>
      
      <Footer />
    </>
  );
}
