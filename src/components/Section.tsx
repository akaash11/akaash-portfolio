'use client';

import React from 'react';
import { Box, Container, Typography } from '@mui/material';

interface SectionProps {
  id: string;
  title?: string;
  children: React.ReactNode;
  bgcolor?: string;
  noPadding?: boolean;
  compactPadding?: boolean;
  isMainSection?: boolean; // New prop to control h1 vs h2
}

export default function Section({ 
  id, 
  title, 
  children, 
  bgcolor, 
  noPadding = false, 
  compactPadding = false,
  isMainSection = false // Default to h2 for homepage sections
}: SectionProps) {
  return (
    <Box
      id={id}
      component="section"
      sx={{
        minHeight: id === 'home' ? '100vh' : 'auto',
        py: noPadding ? 0 : compactPadding ? { xs: 4, md: 6 } : { xs: 6, md: 10 },
        bgcolor: bgcolor || 'transparent',
        scrollMarginTop: '65px', // Offset for fixed navbar
      }}
    >
      <Container maxWidth="lg">
        {title && (
          <Typography
            variant={isMainSection ? 'h1' : 'h2'}
            component={isMainSection ? 'h1' : 'h2'}
            sx={{
              mb: 6,
              textAlign: 'center',
              fontWeight: 700,
              fontSize: isMainSection ? { xs: '2rem', md: '2.5rem' } : undefined,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '4px',
                bgcolor: 'primary.main',
                borderRadius: '2px',
              },
            }}
          >
            {title}
          </Typography>
        )}
        {children}
      </Container>
    </Box>
  );
}
