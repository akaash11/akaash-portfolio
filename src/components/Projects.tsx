'use client';

import React, { useRef, useState } from 'react';
import { Box, Button, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ProjectCard from './ProjectCard';
import { projects } from '@/data/projects';

const CARD_WIDTH = 340;
const CARD_GAP = 16;

export default function Projects() {
  const [activeIdx, setActiveIdx] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const goTo = (idx: number) => {
    const clamped = Math.max(0, Math.min(projects.length - 1, idx));
    setActiveIdx(clamped);
    const track = trackRef.current;
    const card = cardRefs.current[clamped];
    if (track && card) {
      track.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 1 }}>
      {/* Carousel with side arrows */}
      <Box sx={{ position: 'relative' }}>
        {/* Left arrow */}
        <IconButton
          onClick={() => goTo(activeIdx - 1)}
          disabled={activeIdx === 0}
          size="small"
          aria-label="Previous project"
          sx={{
            position: 'absolute',
            left: -20,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: 2,
            '&:hover': { bgcolor: 'background.paper', borderColor: 'primary.main' },
            '&.Mui-disabled': { opacity: 0.3 },
          }}
        >
          <ChevronLeftIcon fontSize="small" />
        </IconButton>

        {/* Right arrow */}
        <IconButton
          onClick={() => goTo(activeIdx + 1)}
          disabled={activeIdx === projects.length - 1}
          size="small"
          aria-label="Next project"
          sx={{
            position: 'absolute',
            right: -20,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: 2,
            '&:hover': { bgcolor: 'background.paper', borderColor: 'primary.main' },
            '&.Mui-disabled': { opacity: 0.3 },
          }}
        >
          <ChevronRightIcon fontSize="small" />
        </IconButton>

      {/* Carousel track */}
      <Box
        ref={trackRef}
        sx={{
          display: 'flex',
          gap: `${CARD_GAP}px`,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          alignItems: 'stretch',
        }}
      >
        {projects.map((project, idx) => (
          <Box
            key={project.id}
            ref={(el: HTMLDivElement | null) => { cardRefs.current[idx] = el; }}
            sx={{
              flexShrink: 0,
              scrollSnapAlign: 'start',
              width: { xs: 'calc(85vw - 32px)', sm: `${CARD_WIDTH}px` },
              display: 'flex',
            }}
          >
            <ProjectCard project={project} />
          </Box>
        ))}
      </Box>

      {/* Dot indicators */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.75, mt: 2 }}>
        {projects.map((_, idx) => (
          <Box
            key={idx}
            onClick={() => goTo(idx)}
            sx={{
              width: idx === activeIdx ? 20 : 8,
              height: 8,
              borderRadius: 4,
              bgcolor: idx === activeIdx ? 'primary.main' : 'divider',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
            }}
          />
        ))}
      </Box>
      </Box>{/* end carousel wrapper */}

      {/* GitHub CTA */}
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
            '&:hover': { borderColor: 'primary.main', bgcolor: 'rgba(144, 202, 249, 0.08)' },
          }}
        >
          View More Projects on GitHub
        </Button>
      </Box>
    </Box>
  );
}
