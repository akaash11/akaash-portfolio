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
}

export default function Section({ id, title, children, bgcolor, noPadding = false, compactPadding = false }: SectionProps) {
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
            variant="h2"
            component="h2"
            sx={{
              mb: 6,
              textAlign: 'center',
              fontWeight: 700,
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
