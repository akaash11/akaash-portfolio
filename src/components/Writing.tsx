'use client';

import React from 'react';
import { Box, Button, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { writing, linkedinPostsUrl } from '@/data/writing';

function formatDate(iso: string) {
  const [y, m] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export default function Writing() {
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Typography
        variant="body1"
        sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: 640, mx: 'auto', mb: 4 }}
      >
        I write weekly on LinkedIn about AI security: prompt injection, agent hijacking, supply-chain
        attacks, and the attack surface of inference infrastructure.
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          gap: 2,
        }}
      >
        {writing.map((post) => (
          <Card
            key={post.url}
            variant="outlined"
            sx={{ bgcolor: 'background.paper', '&:hover': { borderColor: 'primary.main' } }}
          >
            <CardActionArea
              component="a"
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ height: '100%', alignItems: 'stretch' }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Typography
                  variant="caption"
                  component="p"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    mb: 1,
                  }}
                >
                  {post.topic} · <time dateTime={post.date}>{formatDate(post.date)}</time>
                </Typography>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.35, mb: 1, color: 'text.primary' }}
                >
                  {post.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8125rem' }}>
                  {post.summary}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button
          variant="outlined"
          size="large"
          href={linkedinPostsUrl}
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<LinkedInIcon />}
          sx={{ borderColor: 'divider', color: 'text.primary', '&:hover': { borderColor: 'primary.main' } }}
        >
          All posts on LinkedIn
        </Button>
      </Box>
    </Box>
  );
}
