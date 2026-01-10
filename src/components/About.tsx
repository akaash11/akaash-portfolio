'use client';

import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CodeIcon from '@mui/icons-material/Code';
import CloudIcon from '@mui/icons-material/Cloud';
import PsychologyIcon from '@mui/icons-material/Psychology';
import GroupsIcon from '@mui/icons-material/Groups';
import SpeedIcon from '@mui/icons-material/Speed';
import ArchitectureIcon from '@mui/icons-material/Architecture';

const strengths = [
  {
    icon: <CodeIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Full-Stack Development',
    description: 'Expert in React, TypeScript, Node.js, and modern web frameworks with a focus on clean, maintainable code.',
  },
  {
    icon: <CloudIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
    title: 'Cloud & DevOps',
    description: 'Experienced with AWS (EC2, S3, Lambda), Docker, CI/CD pipelines, and scalable infrastructure design.',
  },
  {
    icon: <ArchitectureIcon sx={{ fontSize: 40, color: 'primary.light' }} />,
    title: 'System Architecture',
    description: 'Skilled in designing scalable systems, microservices, and database optimization for high-performance applications.',
  },
  {
    icon: <PsychologyIcon sx={{ fontSize: 40, color: 'secondary.light' }} />,
    title: 'Problem Solving',
    description: 'Strong analytical mindset with a passion for tackling complex challenges and finding elegant solutions.',
  },
  {
    icon: <GroupsIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Team Leadership',
    description: 'Led HCI research teams, mentored junior developers, and fostered collaborative engineering cultures.',
  },
  {
    icon: <SpeedIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
    title: 'Performance Optimization',
    description: 'Obsessed with speed and efficiency—optimizing load times, rendering, and user experience at every level.',
  },
];

export default function About() {
  return (
    <Box>
      {/* Bio Section */}
      <Box
        sx={{
          maxWidth: '800px',
          mx: 'auto',
          mb: 8,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: '1.125rem',
            lineHeight: 1.8,
            color: 'text.secondary',
            mb: 3,
          }}
        >
          I'm a Full Stack Engineer with <strong style={{ color: '#60a5fa' }}>7 years of experience</strong> building 
          scalable web applications, leading technical teams, and conducting HCI research. I thrive at the intersection 
          of design and engineering, creating products that are not only functional but delightful to use.
        </Typography>
        
        <Typography
          variant="body1"
          sx={{
            fontSize: '1.125rem',
            lineHeight: 1.8,
            color: 'text.secondary',
          }}
        >
          From hackathon-winning projects to production systems serving thousands of users, I bring a blend of 
          technical expertise, creative problem-solving, and a user-first mindset to every project I touch.
        </Typography>
      </Box>

      {/* Strengths Grid */}
      <Grid container spacing={3}>
        {strengths.map((strength, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: '100%',
                bgcolor: 'background.paper',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px rgba(96, 165, 250, 0.2)',
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    {strength.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      mb: 1.5,
                      fontWeight: 600,
                      color: 'text.primary',
                    }}
                  >
                    {strength.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.6,
                    }}
                  >
                    {strength.description}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
