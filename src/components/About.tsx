'use client';

import React, { useMemo, useState } from 'react';
import { Box, Typography, Chip, Stack, Divider, Tooltip, useTheme } from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SecurityIcon from '@mui/icons-material/Security';
import PaidIcon from '@mui/icons-material/Paid';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import CodeIcon from '@mui/icons-material/Code';
import GroupsIcon from '@mui/icons-material/Groups';
import { calculateYearsOfExperience } from '@/utils/experience';

const techStack = [
  'Python',
  'LLMs & Agents',
  'RAG / Retrieval',
  'MCP',
  'TypeScript',
  'React',
  'PostgreSQL',
  'Redis',
  'Celery',
  'AWS',
  'Docker',
];

const strengths = [
  {
    icon: PsychologyIcon,
    color: '#60a5fa',
    title: 'Applied AI & Agentic Systems',
    short: 'Build agent pipelines, retrieval systems, and AI developer tooling.',
    description:
      'Agent pipelines, reusable skills, and MCP integrations at Marvell. Drove team adoption of Cursor, GitHub Copilot, and Claude Code across a DSP team. Currently building a hand-implemented retrieval engine (IVF, HNSW, product quantization) with an nDCG/MRR eval harness.',
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
    icon: ArchitectureIcon,
    color: '#2dd4bf',
    title: 'Distributed Systems & Orchestration',
    short: 'Celery/Redis job queues, batch simulation orchestration, CI cut from 19h to 2h.',
    description:
      'Scaled a Celery + Redis job queue from 5 to 25 workers, built Papermill-parameterized notebook pipelines for 224G 3nm simulation workloads, and cut CI runtime from 19 hours to 2 hours.',
  },
  {
    icon: CodeIcon,
    color: '#a78bfa',
    title: 'Full-Stack & Cloud',
    short: 'Production web systems with Python, React, PostgreSQL, and AWS.',
    description:
      'End-to-end development across UI, APIs, and data layers, deployed on AWS with Docker. Owned the HSSLab internal platform end-to-end, growing active users from ~30 to ~80.',
  },
  {
    icon: GroupsIcon,
    color: '#fb923c',
    title: 'Leadership & Mentorship',
    short: 'Led HCI research teams, taught CS courses, mentor through code reviews.',
    description: 'Experience leading technical teams, teaching undergraduate courses, and mentoring junior engineers through design and code reviews.',
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
              <strong style={{ color: '#60a5fa' }}>Applied AI engineer</strong> and{' '}
              <strong style={{ color: '#60a5fa' }}>Staff Software Engineer</strong> at Marvell
              Technology, with <strong style={{ color: '#60a5fa' }}>{yearsOfExperience}+ years</strong>{' '}
              spanning cybersecurity, fintech, and semiconductors, now building agentic systems,
              AI developer tooling, and retrieval infrastructure. Master&apos;s in CS from Santa Clara
              (4.0 GPA), where I led research and taught core courses.
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
              supply-chain risk, agent hijacking, and inference-server attack surface. Distributed
              systems work (Celery/Redis, batch simulation orchestration) and full-stack/cloud
              delivery round out the toolset.
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
