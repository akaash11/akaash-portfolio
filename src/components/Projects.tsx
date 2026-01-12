'use client';

import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import ProjectCard from './ProjectCard';
import { projects } from '@/data/projects';

export default function Projects() {
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 1 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          },
          gap: 2,
        }}
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </Box>

      {/* GitHub Link */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button
          variant="outlined"
          size="large"
          href="https://github.com/akaash11"
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<GitHubIcon />}
          sx={{
            borderColor: 'divider',
            color: 'text.primary',
            px: 3,
            py: 1.5,
            fontSize: '0.9375rem',
            textTransform: 'none',
            '&:hover': {
              borderColor: 'primary.main',
              bgcolor: 'rgba(144, 202, 249, 0.08)',
            },
          }}
        >
          View More Projects on GitHub
        </Button>
      </Box>
    </Box>
  );
}
