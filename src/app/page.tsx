import React from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import { Box } from '@mui/material';

// Lazy load components below the fold for better performance
const About = dynamic(() => import('@/components/About'), {
  loading: () => null,
});
const Timeline = dynamic(() => import('@/components/Timeline'), {
  loading: () => null,
});
const Projects = dynamic(() => import('@/components/Projects'), {
  loading: () => null,
});
const Contact = dynamic(() => import('@/components/Contact'), {
  loading: () => null,
});
const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => null,
});

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

        {/* Contact Section */}
        <Section id="contact" title="Contact" compactPadding>
          <Contact />
        </Section>
      </Box>
      
      <Footer />
    </>
  );
}
