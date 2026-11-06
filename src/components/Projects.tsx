'use client';

import React, { useRef, useState } from 'react';
import { Box, Button, IconButton, Collapse, Typography, Link as MuiLink } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GitHubIcon from '@mui/icons-material/GitHub';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ProjectCard from './ProjectCard';
import { mainProjects as projects, earlierProjects } from '@/data/projects';

const CARD_WIDTH = 340;
const CARD_GAP = 16;

export default function Projects() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [showEarlier, setShowEarlier] = useState(false);
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

      {/* Earlier work: older hackathon projects, collapsed so they don't dilute the main set
          but stay in the rendered HTML for crawlers. */}
      {earlierProjects.length > 0 && (
        <Box sx={{ mt: 4, maxWidth: 720, mx: 'auto' }}>
          <Button
            onClick={() => setShowEarlier((v) => !v)}
            aria-expanded={showEarlier}
            aria-controls="earlier-work"
            endIcon={
              <ExpandMoreIcon
                sx={{ transform: showEarlier ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
              />
            }
            sx={{ color: 'text.secondary', textTransform: 'none', px: 1 }}
          >
            Earlier work (hackathons, {earlierProjects[0].year})
          </Button>
          <Collapse in={showEarlier} id="earlier-work">
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, mt: 1 }}>
              {earlierProjects.map((p) => (
                <Box
                  component="li"
                  key={p.id}
                  sx={{ py: 1.25, borderTop: '1px solid', borderColor: 'divider' }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    {p.title}
                    <Box component="span" sx={{ color: 'text.secondary', fontWeight: 400 }}>
                      {' '}· {p.subtitle}
                      {p.badge ? ` · ${p.badge}` : ''}
                    </Box>
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8125rem' }}>
                    {p.description}{' '}
                    {p.devpostLink && (
                      <MuiLink href={p.devpostLink} target="_blank" rel="noopener noreferrer">
                        Devpost
                      </MuiLink>
                    )}
                    {p.githubLink && (
                      <>
                        {' · '}
                        <MuiLink href={p.githubLink} target="_blank" rel="noopener noreferrer">
                          GitHub
                        </MuiLink>
                      </>
                    )}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Collapse>
        </Box>
      )}

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
