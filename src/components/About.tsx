'use client';

import React, { useMemo, useState } from 'react';
import { Box, Typography, Chip, Stack, Divider, Tooltip, useTheme } from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SecurityIcon from '@mui/icons-material/Security';
import PaidIcon from '@mui/icons-material/Paid';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import GroupsIcon from '@mui/icons-material/Groups';
import { calculateYearsOfExperience } from '@/utils/experience';

const techStack = [
  'Python',
  'LLMs & Agents',
  'LangGraph',
  'LangChain',
  'LiteLLM',
  'MCP',
  'RAG + Retrieval Eval',
  'Django',
  'PostgreSQL',
  'Redis / Celery',
  'Jenkins / GitHub Actions',
  'TypeScript',
  'React',
  'AWS',
  'Docker',
];

// Order follows the canonical positioning: Applied AI and Developer Experience / Platform
// are co-equal primary pillars; Security and Fintech are spikes.
const strengths = [
  {
    icon: PsychologyIcon,
    color: '#60a5fa',
    title: 'Applied AI, Agents & Evals',
    short: 'Agents on LangGraph, LangChain, and LiteLLM, measured with evals rather than vibes.',
    description:
      'Agent pipelines, reusable skills, and MCP integrations at Marvell, with evals run on agent output. Built a Glean agent that routes Jenkins failures to their owners. Personally built an evaluated RAG assistant with hand-labeled sets, recall@k and MRR on every change.',
  },
  {
    icon: ArchitectureIcon,
    color: '#2dd4bf',
    title: 'Developer Experience & Platforms',
    short: 'CI cut from 19h to 2h; a 0-to-1 platform now with 150+ active users across business units.',
    description:
      'Built the HSSLab platform from scratch (Django, Celery + Redis workers scaled 5 to 25), cut CI from 19 hours to 2, shortened delivery from ~28 to 10 days, and led the Gerrit to GitHub Enterprise migration.',
  },
  {
    icon: SecurityIcon,
    color: '#f87171',
    title: 'Security-Minded Engineering',
    short: 'SIEM threat detection and MITRE ATT&CK mapping at Qualys; write weekly on AI security.',
    description:
      'Built enterprise threat detection for SIEM workflows and MITRE ATT&CK tactic/technique dashboards at Qualys. Write weekly on AI security: supply-chain attacks, agent hijacking, and inference-server attack surface.',
  },
  {
    icon: PaidIcon,
    color: '#34d399',
    title: 'Fintech & Regulated Systems',
    short: 'Click-to-Pay at checkout scale, payments microservices, and ML risk models at Opus.',
    description:
      'Architected a Click-to-Pay / Digital Card Facilitator solution at merchant checkout scale, built Spring Boot payments microservices, and shipped a Flask + MongoDB service serving a risk-prediction model, plus ATM time-series forecasting at ~97% accuracy.',
  },
  {
    icon: GroupsIcon,
    color: '#fb923c',
    title: 'Embedded with Domain Teams',
    short: 'Two years as the software engineer inside a SerDes/DSP team; led a 12-person research team.',
    description:
      'Embedded with hardware engineers across DSP, program management, and QA, shipping changes through demonstrated value rather than authority. Led HCI research development at Santa Clara and taught core CS courses.',
  },
];

const MAX_VISIBLE_CHIPS = 7;

interface AboutProps {
  isStandalone?: boolean; // true when on /about page, false on homepage
}

export default function About({ isStandalone = false }: AboutProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const yearsOfExperience = useMemo(() => calculateYearsOfExperience(), []);
  const [showAllChips, setShowAllChips] = useState(false);
  
  const visibleTechStack = showAllChips ? techStack : techStack.slice(0, MAX_VISIBLE_CHIPS);
  const remainingChips = techStack.length - MAX_VISIBLE_CHIPS;

  return (
    <Box
      sx={{
        py: { xs: 4, md: 2 },
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 3, md: 5 },
        }}
      >
        {/* Left Column: About Narrative */}
        <Box sx={{ flex: { md: 1 } }}>
          <Box>
            {/* Headline */}
            <Typography
              variant={isStandalone ? 'h2' : 'h3'}
              component={isStandalone ? 'h1' : 'h2'}
              sx={{
                mb: 1.5,
                fontWeight: 700,
                fontSize: isStandalone ? { xs: '2rem', md: '2.5rem' } : { xs: '1.5rem', md: '1.75rem' },
              }}
            >
              About Me
            </Typography>

            {/* About Content */}
            <Typography
              variant="body1"
              sx={{
                mb: 1.5,
                color: 'text.secondary',
                lineHeight: 1.6,
                fontSize: { xs: '0.9375rem', md: '1rem' },
              }}
            >
              <strong style={{ color: '#60a5fa' }}>Staff Software Engineer</strong> at Marvell Technology
              building <strong style={{ color: '#60a5fa' }}>agentic systems</strong> and the{' '}
              <strong style={{ color: '#60a5fa' }}>developer platforms</strong> engineering teams run
              on, with <strong style={{ color: '#60a5fa' }}>{yearsOfExperience}+ years</strong> across
              cybersecurity, fintech, and semiconductors. I ship agents on LangGraph, LangChain, and
              LiteLLM and measure what I ship: evals on agent output at work, and hand-labeled eval
              sets with recall@k and MRR on my own RAG system. Master&apos;s in CS from Santa Clara (4.0 GPA).
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: 2.5,
                color: 'text.secondary',
                lineHeight: 1.6,
                fontSize: { xs: '0.9375rem', md: '1rem' },
                '@media (max-height: 800px)': {
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                },
              }}
            >
              Most applied-AI engineers come from web development. Very few also carry{' '}
              <strong style={{ color: '#60a5fa' }}>appsec</strong> and{' '}
              <strong style={{ color: '#60a5fa' }}>payments</strong> experience. I bring both:
              SIEM threat detection and MITRE ATT&amp;CK mapping at Qualys, and Click-to-Pay /
              payments microservices and ML risk models at Opus. I write weekly on AI security:
              supply-chain risk, agent hijacking, and inference-server attack surface.
            </Typography>

            {/* Tech Stack Chips */}
            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  display: 'block',
                  mb: 0.75,
                }}
              >
                Tech Stack
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                {visibleTechStack.map((tech, idx) => (
                  <Chip
                    key={idx}
                    label={tech}
                    size="small"
                    sx={{
                      bgcolor: isDark ? 'rgba(96, 165, 250, 0.1)' : 'rgba(37, 99, 235, 0.1)',
                      color: 'primary.main',
                      fontSize: '0.75rem',
                      height: 22,
                      border: isDark ? '1px solid rgba(96, 165, 250, 0.3)' : '1px solid rgba(37, 99, 235, 0.3)',
                      '& .MuiChip-label': { px: 1.25 },
                    }}
                  />
                ))}
                {remainingChips > 0 && !showAllChips && (
                  <Chip
                    label={`+${remainingChips} more`}
                    size="small"
                    onClick={() => setShowAllChips(true)}
                    sx={{
                      bgcolor: 'rgba(167, 139, 250, 0.1)',
                      color: 'secondary.main',
                      fontSize: '0.75rem',
                      height: 22,
                      border: '1px solid rgba(167, 139, 250, 0.3)',
                      '& .MuiChip-label': { px: 1.25 },
                      fontWeight: 600,
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: 'rgba(167, 139, 250, 0.2)',
                        borderColor: 'secondary.main',
                      },
                    }}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Right Column: Strengths List */}
        <Box sx={{ flex: { md: 1 } }}>
          <Box>
            {/* Headline */}
            <Typography
              variant={isStandalone ? 'h3' : 'h4'}
              component={isStandalone ? 'h2' : 'h3'}
              sx={{
                mb: 1.5,
                fontWeight: 700,
                fontSize: { xs: '1.5rem', md: '1.75rem' },
              }}
            >
              Strengths
            </Typography>

            {/* Strengths List */}
            <Stack spacing={1.5}>
              {strengths.map((strength, index) => (
                <Box key={index}>
                  <Tooltip
                    title={strength.description}
                    arrow
                    placement="left"
                    enterDelay={300}
                    leaveDelay={200}
                    slotProps={{
                      tooltip: {
                        sx: {
                          bgcolor: 'background.paper',
                          color: 'text.primary',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                          border: '1px solid',
                          borderColor: 'divider',
                          maxWidth: 320,
                          fontSize: '0.8125rem',
                          lineHeight: 1.6,
                          p: 1.5,
                        },
                      },
                      arrow: {
                        sx: {
                          color: 'background.paper',
                          '&::before': {
                            border: '1px solid',
                            borderColor: 'divider',
                          },
                        },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 1.5,
                        p: 1.5,
                        borderRadius: 1,
                        transition: 'all 0.2s ease',
                        cursor: 'help',
                        '&:hover': {
                          bgcolor: isDark ? 'rgba(96, 165, 250, 0.05)' : 'rgba(37, 99, 235, 0.05)',
                        },
                      }}
                    >
                      {/* Icon */}
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: 1,
                          bgcolor: `${strength.color}22`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <strength.icon sx={{ fontSize: 20, color: strength.color }} />
                      </Box>

                      {/* Content */}
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          variant="body1"
                          component="div"
                          sx={{
                            fontWeight: 600,
                            mb: 0.25,
                            fontSize: '0.9375rem',
                            color: 'text.primary',
                          }}
                        >
                          {strength.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'text.secondary',
                            fontSize: '0.8125rem',
                            lineHeight: 1.5,
                          }}
                        >
                          {strength.short}
                        </Typography>
                      </Box>
                    </Box>
                  </Tooltip>
                  {index < strengths.length - 1 && (
                    <Divider sx={{ opacity: 0.1, ml: 6.5 }} />
                  )}
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
