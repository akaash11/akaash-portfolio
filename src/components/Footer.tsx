'use client';

import React from 'react';
import { Box, Typography, IconButton, Divider } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        borderTop: '1px solid',
        borderColor: 'divider',
        py: 3,
        mt: 8,
        bgcolor: 'background.default',
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          px: 3,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        {/* Left - Info */}
        <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: '0.875rem',
              mb: 0.5,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              justifyContent: { xs: 'center', sm: 'flex-start' },
            }}
          >
            <span>New York</span>
            <span>•</span>
            <span>Sr. Software Engineer @ Marvell Technology</span>
            <span>•</span>
            <span>MS in Computer Science & Engineering</span>
          </Typography>
          <Typography variant="caption" color="text.disabled" sx={{ fontSize: '0.75rem' }}>
            © {currentYear} Akaash Trivedi. All rights reserved.
          </Typography>
        </Box>

        {/* Right - Social Icons */}
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton
            component="a"
            href="mailto:akaashtrivedi2@gmail.com"
            size="small"
            sx={{
              color: 'text.secondary',
              '&:hover': { color: 'text.primary', bgcolor: 'action.hover' },
            }}
            aria-label="Email"
          >
            <EmailIcon fontSize="small" />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.linkedin.com/in/akaash-trivedi"
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            sx={{
              color: 'text.secondary',
              '&:hover': { color: 'text.primary', bgcolor: 'action.hover' },
            }}
            aria-label="LinkedIn"
          >
            <LinkedInIcon fontSize="small" />
          </IconButton>
          <IconButton
            component="a"
            href="https://github.com/akaash11"
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            sx={{
              color: 'text.secondary',
              '&:hover': { color: 'text.primary', bgcolor: 'action.hover' },
            }}
            aria-label="GitHub"
          >
            <GitHubIcon fontSize="small" />
          </IconButton>
          <IconButton
            component="a"
            href="https://twitter.com/akaasht"
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            sx={{
              color: 'text.secondary',
              '&:hover': { color: 'text.primary', bgcolor: 'action.hover' },
            }}
            aria-label="Twitter"
          >
            <TwitterIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
