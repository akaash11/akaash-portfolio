'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Stack,
} from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';
import CodeIcon from '@mui/icons-material/Code';
import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';
import { Project } from '@/data/projects';
import { analytics } from '@/utils/analytics';

interface ProjectCardProps {
  project: Project;
}

// A plain `Hackathon` stays neutral while `Hackathon Winner` is highlighted.
function getBadgeColors(badge: string) {
  if (badge === 'In Progress') return { bgcolor: '#f59e0b', color: '#fff' };
  if (badge === 'Hackathon Winner') return { bgcolor: '#10b981', color: 'background.default' };
  if (badge === 'Hackathon') return { bgcolor: 'primary.main', color: 'background.default' };
  if (badge.includes('NSF') || badge.includes('Award')) return { bgcolor: '#d4af37', color: '#fff' };
  if (badge === 'Shipped Solo') return { bgcolor: '#a78bfa', color: '#fff' };
  return { bgcolor: 'primary.main', color: '#fff' };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const handleLinkClick = (linkType: 'live' | 'github' | 'devpost') => {
    analytics.trackProjectClick(project.title, linkType);
  };

  const primaryLink = project.liveLink || project.devpostLink;
  const primaryLabel = project.liveLink ? 'Live Demo' : 'Devpost';
  const primaryType: 'live' | 'devpost' = project.liveLink ? 'live' : 'devpost';

  const badges = project.badges?.length
    ? project.badges
    : project.badge
    ? [project.badge]
    : [];

  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        transition: 'all 0.2s ease',
        border: '1px solid',
        borderColor: project.featured ? 'primary.main' : 'divider',
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: 2,
        },
      }}
    >
      <CardContent
        sx={{
          p: 2.5,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          '&:last-child': { pb: 2.5 },
        }}
      >
        {/* Title and badges share a row. The badges are in normal flow rather
            than absolutely positioned, so a card with more than one badge wraps
            the row instead of overlapping the subtitle beneath it. */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 0.5 }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              flex: 1,
              fontWeight: 700,
              fontSize: '1.25rem',
              color: 'text.primary',
              lineHeight: 1.2,
            }}
          >
            {project.title}
          </Typography>

          {badges.length > 0 && (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 0.5,
                justifyContent: 'flex-end',
                maxWidth: '55%',
              }}
            >
              {badges.map((badge) => (
                <Chip
                  key={badge}
                  label={badge}
                  size="small"
                  sx={{
                    ...getBadgeColors(badge),
                    fontWeight: 600,
                    fontSize: '0.6875rem',
                    height: 20,
                  }}
                />
              ))}
            </Box>
          )}
        </Box>

        {/* Subtitle */}
        <Typography
          variant="body2"
          sx={{
            mb: 1,
            color: 'text.secondary',
            fontWeight: 500,
            fontSize: '0.8125rem',
          }}
        >
          {project.subtitle}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            mb: 2,
            color: 'text.secondary',
            lineHeight: 1.5,
            fontSize: '0.875rem',
          }}
        >
          {project.description}
        </Typography>

        {/* All Highlights */}
        <Box sx={{ mb: 2, flex: 1 }}>
          {project.highlights.map((highlight, idx) => (
            <Box
              key={idx}
              sx={{
                display: 'flex',
                gap: 1,
                mb: 0.75,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  minWidth: '6px',
                  fontSize: '0.8125rem',
                }}
              >
                •
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.6,
                  fontSize: '0.8125rem',
                }}
              >
                {highlight}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* All Technologies */}
        <Box sx={{ mb: 2.5 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
            {project.technologies.map((tech, idx) => (
              <Chip
                key={idx}
                label={tech}
                size="small"
                sx={{
                  bgcolor: 'background.default',
                  fontSize: '0.7rem',
                  height: 22,
                  '& .MuiChip-label': { px: 1 },
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Action Buttons */}
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 'auto', gap: 1 }}>
          {primaryLink && (
            <Button
              variant="contained"
              size="small"
              startIcon={project.liveLink ? <LaunchIcon fontSize="small" /> : <CodeIcon fontSize="small" />}
              href={primaryLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleLinkClick(primaryType)}
              aria-label={
                project.liveLink
                  ? `View live demo of ${project.title}`
                  : `View ${project.title} on Devpost`
              }
              sx={{ textTransform: 'none', fontWeight: 600, fontSize: '0.8125rem' }}
            >
              {primaryLabel}
            </Button>
          )}
          {project.appStoreLink && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<AppleIcon fontSize="small" />}
              href={project.appStoreLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleLinkClick('live')}
              aria-label={`Download ${project.title} on the App Store`}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.8125rem',
                borderColor: 'divider',
                color: 'text.primary',
                '&:hover': { borderColor: 'primary.main' },
              }}
            >
              App Store
            </Button>
          )}
          {project.playStoreLink && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<AndroidIcon fontSize="small" />}
              href={project.playStoreLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleLinkClick('live')}
              aria-label={`Download ${project.title} on Google Play`}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.8125rem',
                borderColor: 'divider',
                color: 'text.primary',
                '&:hover': { borderColor: '#01875f' },
              }}
            >
              Google Play
            </Button>
          )}
          {project.githubLink && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<GitHubIcon fontSize="small" />}
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleLinkClick('github')}
              aria-label={`View ${project.title} source code on GitHub`}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.8125rem',
                borderColor: 'divider',
                '&:hover': { borderColor: 'primary.main' },
              }}
            >
              GitHub
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
