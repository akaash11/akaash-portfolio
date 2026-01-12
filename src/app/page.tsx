import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Timeline from '@/components/Timeline';
import Section from '@/components/Section';
import { Box, Typography } from '@mui/material';

export default function Home() {
  return (
    <>
      <Navbar />
      <Box component="main">
        {/* Home Section */}
        <Box id="home" component="section" sx={{ scrollMarginTop: '80px' }}>
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

        {/* Projects Section - Will be built in Phase 5 */}
        <Section id="projects" title="Projects" bgcolor="background.paper">
          <Typography>Projects section coming soon...</Typography>
        </Section>

        {/* Research Section - Will be built in Phase 6 */}
        <Section id="research" title="Research">
          <Typography>Research section coming soon...</Typography>
        </Section>

        {/* Design Section - Will be built in Phase 6 */}
        <Section id="design" title="System Design" bgcolor="background.paper">
          <Typography>System Design section coming soon...</Typography>
        </Section>

        {/* Play Section - Will be built in Phase 6 */}
        <Section id="play" title="Play">
          <Typography>Play section coming soon...</Typography>
        </Section>

        {/* Contact Section - Will be built in Phase 7 */}
        <Section id="contact" title="Contact" bgcolor="background.paper">
          <Typography>Contact section coming soon...</Typography>
        </Section>
      </Box>
    </>
  );
}
