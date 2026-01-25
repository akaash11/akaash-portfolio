'use client';

import React, { useMemo } from 'react';
import { Box, Typography, Button, Container, useTheme } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { calculateYearsOfExperience } from '@/utils/experience';

export default function Hero() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  // Calculate years of experience dynamically from Jan 2018
  const yearsOfExperience = useMemo(() => calculateYearsOfExperience(), []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'background.default',
        background: isDark ? `
          linear-gradient(135deg, 
            rgba(96, 165, 250, 0.1) 0%, 
            rgba(167, 139, 250, 0.1) 50%, 
            rgba(59, 130, 246, 0.1) 100%
          ),
          radial-gradient(ellipse at top left, 
            rgba(96, 165, 250, 0.15) 0%, 
            transparent 50%
          ),
          radial-gradient(ellipse at bottom right, 
            rgba(167, 139, 250, 0.15) 0%, 
            transparent 50%
          ),
          #0a0a0a
        ` : `
          linear-gradient(135deg, 
            rgba(37, 99, 235, 0.08) 0%, 
            rgba(124, 58, 237, 0.08) 50%, 
            rgba(59, 130, 246, 0.08) 100%
          ),
          radial-gradient(ellipse at top left, 
            rgba(37, 99, 235, 0.1) 0%, 
            transparent 50%
          ),
          radial-gradient(ellipse at bottom right, 
            rgba(124, 58, 237, 0.1) 0%, 
            transparent 50%
          ),
          #ffffff
        `,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: { xs: 'center', md: 'left' },
            py: { xs: 4, md: 0 },
          }}
        >


          <Typography
            variant="h1"
            component="h1"
            sx={{
              mb: 2,
              background: isDark 
                ? 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)'
                : 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
            }}
          >
            Akaash Trivedi
          </Typography>

          <Typography
            variant="h3"
            component="h2"
            sx={{
              mb: 3,
              color: 'text.primary',
              fontWeight: 600,
            }}
          >
            Full Stack Engineer
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 1,
              color: 'text.secondary',
              fontWeight: 400,
              fontSize: '1.125rem',
              maxWidth: '700px',
              mx: { xs: 'auto', md: 0 },
            }}
          >
            {yearsOfExperience}+ years delivering end-to-end systems—from architecture to production.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 5,
              color: 'text.secondary',
              maxWidth: '650px',
              mx: { xs: 'auto', md: 0 },
              lineHeight: 1.8,
            }}
          >
            Full-stack engineering with Python, React, PostgreSQL, Redis, and cloud platforms.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
              justifyContent: { xs: 'center', md: 'flex-start' },
            }}
          >
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={() => scrollToSection('projects')}
              aria-label="View my projects portfolio"
              sx={{
                background: isDark 
                  ? 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)'
                  : 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                color: '#ffffff',
                '&:hover': {
                  background: isDark 
                    ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
                    : 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: isDark 
                    ? '0 8px 24px rgba(96, 165, 250, 0.4)'
                    : '0 8px 24px rgba(37, 99, 235, 0.4)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              View Projects
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => scrollToSection('contact')}
              aria-label="Navigate to contact section"
              sx={{
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  borderColor: 'primary.light',
                  bgcolor: isDark 
                    ? 'rgba(96, 165, 250, 0.1)'
                    : 'rgba(37, 99, 235, 0.1)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Get in Touch
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: isDark 
            ? 'radial-gradient(circle, rgba(96, 165, 250, 0.1) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          display: { xs: 'none', md: 'block' },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          left: '15%',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background: isDark 
            ? 'radial-gradient(circle, rgba(167, 139, 250, 0.1) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          display: { xs: 'none', md: 'block' },
        }}
      />
    </Box>
  );
}
