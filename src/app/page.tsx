import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Timeline from '@/components/Timeline';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
// import Play from '@/components/Play'; // Reserved for future use
import Section from '@/components/Section';
import { Box, Typography } from '@mui/material';

export default function Home() {
  return (
    <>
      <Navbar />
      <Box component="main">
        {/* Home Section */}
        <Box id="home" component="section" sx={{ scrollMarginTop: '94px' }}>
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
        <Section id="projects" title="Projects" bgcolor="background.paper">
          <Projects />
        </Section>

        {/* Play Section - Reserved for future use */}
        {/* <Section id="play" title="Play">
          <Play />
        </Section> */}

        {/* Contact Section */}
        <Section id="contact" title="Contact">
          <Contact />
        </Section>
      </Box>
      
      <Footer />
    </>
  );
}
