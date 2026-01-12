'use client';

import React, { useMemo, useState } from 'react';
import { Box, Typography, Chip, Stack, Divider, Tooltip } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import CloudIcon from '@mui/icons-material/Cloud';
import PsychologyIcon from '@mui/icons-material/Psychology';
import GroupsIcon from '@mui/icons-material/Groups';
import SpeedIcon from '@mui/icons-material/Speed';
import ArchitectureIcon from '@mui/icons-material/Architecture';

// Calculate years of experience
const CAREER_START_DATE = new Date(2018, 0, 1); // Jan 1, 2018

function calculateYearsOfExperience(): number {
  const now = new Date();
  const startYear = CAREER_START_DATE.getFullYear();
  const startMonth = CAREER_START_DATE.getMonth();
  
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth();
  
  const totalMonths = (nowYear - startYear) * 12 + (nowMonth - startMonth);
  const years = Math.floor((totalMonths / 12) * 10) / 10; // Floor to 1 decimal
  
  return years;
}

const techStack = [
  'Python',
  'TypeScript',
  'React',
  'Node.js',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'AWS',
  'Docker',
  'Kubernetes',
];

const strengths = [
  {
    icon: CodeIcon,
    color: '#60a5fa',
    title: 'Full-Stack Development',
    short: 'Build production web systems with Python, React, PostgreSQL, Redis, and CI/CD.',
    description:
      'End-to-end development across UI, APIs (REST/GraphQL), and data layers. Strong focus on clean architecture, maintainability, and performance, with async workflows (Celery/Redis) and automated testing/CI.',
  },
  {
    icon: CloudIcon,
    color: '#a78bfa',
    title: 'Cloud & Infrastructure',
    short: 'Deploy and scale with AWS, Docker, Kubernetes, and CI/CD pipelines.',
    description: 'Hands-on experience deploying distributed systems on cloud platforms. Expertise in containerization, orchestration, and building reliable infrastructure.',
  },
  {
    icon: ArchitectureIcon,
    color: '#2dd4bf',
    title: 'System Design',
    short: 'Design scalable architectures with focus on reliability and performance.',
    description: 'Strong background in distributed systems, microservices, and database optimization. Coursework in advanced operating systems and distributed systems.',
  },
  {
    icon: PsychologyIcon,
    color: '#fb923c',
    title: 'Problem Solving',
    short: 'Analytical mindset for complex technical challenges and optimization.',
    description: 'Strong foundation in algorithms and data structures. Experience debugging production issues and optimizing performance bottlenecks.',
  },
  {
    icon: GroupsIcon,
    color: '#60a5fa',
    title: 'Leadership & Mentorship',
    short: 'Led HCI research teams, taught CS courses, mentor through code reviews.',
    description: 'Experience leading technical teams, teaching undergraduate courses, and mentoring junior engineers through design and code reviews.',
  },
  {
    icon: SpeedIcon,
    color: '#a78bfa',
    title: 'Pragmatic Delivery',
    short: 'Ship quality products: design → implementation → release → iteration.',
    description: 'Focus on delivering value while maintaining quality. Balance technical excellence with shipping velocity and business impact.',
  },
];

const MAX_VISIBLE_CHIPS = 7;

export default function About() {
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
              variant="h4"
              sx={{
                mb: 1.5,
                fontWeight: 700,
                fontSize: { xs: '1.5rem', md: '1.75rem' },
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
              <strong style={{ color: '#60a5fa' }}>Full Stack Engineer</strong> with{' '}
              <strong style={{ color: '#60a5fa' }}>{yearsOfExperience}+ years</strong> building 
              scalable systems across enterprise software, cloud infrastructure, and HCI research. 
              Master's in CS from Santa Clara (4.0 GPA) where I led research and taught core courses.
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
              From early-stage startups to Fortune 500 companies, I've architected{' '}
              <strong style={{ color: '#60a5fa' }}>full-stack solutions</strong>, optimized 
              distributed systems, and mentored engineering teams. Whether building production 
              systems serving thousands of users or winning hackathons with innovative prototypes, 
              I bring technical depth, pragmatic problem-solving, and focus on delivering value.
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
                      bgcolor: 'rgba(96, 165, 250, 0.1)',
                      color: 'primary.main',
                      fontSize: '0.75rem',
                      height: 22,
                      border: '1px solid rgba(96, 165, 250, 0.3)',
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
              variant="h4"
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
                          bgcolor: 'rgba(96, 165, 250, 0.05)',
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
                          variant="subtitle1"
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
