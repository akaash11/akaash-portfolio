'use client';

import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Link as MuiLink,
  useTheme,
  useMediaQuery,
  IconButton,
  Collapse,
  Tabs,
  Tab,
  Button,
  Paper,
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import BusinessIcon from '@mui/icons-material/Business';
import ScienceIcon from '@mui/icons-material/Science';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LaunchIcon from '@mui/icons-material/Launch';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import { experiences, ExperienceType } from '@/data/experience';

// Experience duration calculation
const CAREER_START_DATE = new Date(2018, 0, 1); // Jan 1, 2018

function getExperienceDuration(start: Date, end: Date): { years: number; months: number; label: string } {
  const startYear = start.getFullYear();
  const startMonth = start.getMonth();
  const startDay = start.getDate();
  
  const endYear = end.getFullYear();
  const endMonth = end.getMonth();
  const endDay = end.getDate();
  
  // Calculate total months
  let totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth);
  
  // Adjust if end day is before start day
  if (endDay < startDay) {
    totalMonths--;
  }
  
  const years = Math.floor((totalMonths / 12) * 10) / 10; // Floor to 1 decimal
  const months = totalMonths % 12;
  const label = `${years}+ years`;
  
  return { years, months, label };
}

const typeConfig = {
  work: {
    icon: WorkIcon,
    color: '#60a5fa',
    label: 'Industry',
  },
  education: {
    icon: SchoolIcon,
    color: '#a78bfa',
    label: 'Education',
  },
  research: {
    icon: ScienceIcon,
    color: '#2dd4bf',
    label: 'Research',
  },
  teaching: {
    icon: MenuBookIcon,
    color: '#fb923c',
    label: 'Teaching',
  },
};

type Category = 'experience' | 'education' | 'all';
type ExperienceFilter = 'all' | 'work' | 'research' | 'teaching';

// Derive category from experience type
function getCategory(type: ExperienceType): 'experience' | 'education' {
  return type === 'education' ? 'education' : 'experience';
}

interface TimelineItemProps {
  experience: typeof experiences[0];
  expanded: boolean;
  onToggle: () => void;
}

function TimelineItem({ experience, expanded, onToggle }: TimelineItemProps) {
  const config = typeConfig[experience.type];
  const Icon = config.icon;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const hasDetails = 
    (experience.highlights && experience.highlights.length > 0) ||
    (experience.technologies && experience.technologies.length > 0) ||
    experience.description;

  const handleExpandClick = () => {
    if (hasDetails) {
      onToggle();
    }
  };

  // Show max 3 tech chips in collapsed state on mobile, all on desktop
  const maxChipsToShow = isMobile ? 3 : (experience.technologies?.length || 0);
  const visibleTechs = experience.technologies?.slice(0, maxChipsToShow) || [];
  const remainingTechCount = (experience.technologies?.length || 0) - maxChipsToShow;

  return (
    <Card
      sx={{
        bgcolor: 'background.paper',
        transition: 'all 0.2s ease',
        cursor: hasDetails ? 'pointer' : 'default',
        border: '1px solid',
        borderColor: 'divider',
        '&:hover': {
          borderColor: hasDetails ? config.color : 'divider',
          boxShadow: hasDetails ? 2 : 0,
        },
      }}
      onClick={handleExpandClick}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        {/* Header Row */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Type Icon + Title */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '4px',
                  bgcolor: `${config.color}22`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon sx={{ fontSize: 14, color: config.color }} />
              </Box>
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: 'text.primary',
                  lineHeight: 1.3,
                }}
              >
                {experience.title}
              </Typography>
            </Box>

            {/* Organization + Link */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Typography
                variant="body2"
                sx={{
                  color: config.color,
                  fontWeight: 600,
                  fontSize: '0.9375rem',
                }}
              >
                {experience.organization}
              </Typography>
              {experience.link && (
                <MuiLink
                  href={experience.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    color: 'text.secondary',
                    '&:hover': { color: config.color },
                  }}
                >
                  <LaunchIcon sx={{ fontSize: 14 }} />
                </MuiLink>
              )}
            </Box>

            {/* Date + Location */}
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.875rem',
                }}
              >
                {experience.startDate} – {experience.endDate}
              </Typography>
              {experience.location && (
                <>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                    •
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      fontSize: '0.875rem',
                    }}
                  >
                    {experience.location}
                  </Typography>
                </>
              )}
            </Box>

            {/* Tech chips in collapsed state */}
            {!expanded && visibleTechs.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                {visibleTechs.map((tech, idx) => (
                  <Chip
                    key={idx}
                    label={tech}
                    size="small"
                    sx={{
                      bgcolor: 'background.default',
                      fontSize: '0.6875rem',
                      height: 20,
                      '& .MuiChip-label': { px: 1 },
                    }}
                  />
                ))}
                {remainingTechCount > 0 && (
                  <Chip
                    label={`+${remainingTechCount}`}
                    size="small"
                    sx={{
                      bgcolor: 'background.default',
                      fontSize: '0.6875rem',
                      height: 20,
                      '& .MuiChip-label': { px: 1 },
                    }}
                  />
                )}
              </Box>
            )}
          </Box>

          {/* Expand Button */}
          {hasDetails && (
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleExpandClick();
              }}
              size="small"
              sx={{
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
                color: config.color,
                ml: 1,
              }}
            >
              <ExpandMoreIcon fontSize="small" />
            </IconButton>
          )}
        </Box>

        {/* Expandable Details */}
        {hasDetails && (
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Box sx={{ mt: 1.5, pt: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
              {/* Description */}
              {experience.description && (
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    mb: 1.5,
                    lineHeight: 1.6,
                    fontSize: '0.875rem',
                  }}
                >
                  {experience.description}
                </Typography>
              )}

              {/* Highlights */}
              {experience.highlights && experience.highlights.length > 0 && (
                <Box sx={{ mb: 1.5 }}>
                  {experience.highlights.map((highlight, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        display: 'flex',
                        gap: 1,
                        mb: 0.5,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: config.color,
                          fontWeight: 600,
                          minWidth: '6px',
                          fontSize: '0.875rem',
                        }}
                      >
                        •
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.6,
                          fontSize: '0.875rem',
                        }}
                      >
                        {highlight}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}

              {/* All Technologies/Coursework */}
              {experience.technologies && experience.technologies.length > 0 && (
                <Box>
                  {experience.type === 'education' && (
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        display: 'block',
                        mb: 0.5,
                      }}
                    >
                      Coursework:
                    </Typography>
                  )}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {experience.technologies.map((tech, idx) => (
                      <Chip
                        key={idx}
                        label={tech}
                        size="small"
                        sx={{
                          bgcolor: 'background.default',
                          fontSize: '0.6875rem',
                          height: 20,
                          '& .MuiChip-label': { px: 1 },
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Collapse>
        )}
      </CardContent>
    </Card>
  );
}

export default function Timeline() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedTab, setSelectedTab] = useState<Category>('experience');
  const [experienceFilter, setExperienceFilter] = useState<ExperienceFilter>('all');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  // Calculate experience duration
  const experienceDuration = useMemo(() => {
    return getExperienceDuration(CAREER_START_DATE, new Date());
  }, []);

  // Count by category
  const categoryCounts = useMemo(() => {
    const result = { experience: 0, education: 0, all: experiences.length };
    experiences.forEach((exp) => {
      const category = getCategory(exp.type);
      result[category]++;
    });
    return result;
  }, []);

  // Filter and sort experiences
  const filteredExperiences = useMemo(() => {
    let filtered = experiences;

    // Apply category filter (tabs)
    if (selectedTab !== 'all') {
      filtered = filtered.filter((exp) => getCategory(exp.type) === selectedTab);
    }

    // Apply experience sub-filter (chips)
    if (selectedTab === 'experience' && experienceFilter !== 'all') {
      filtered = filtered.filter((exp) => exp.type === experienceFilter);
    }

    // Sort: current first, then by date descending
    return [...filtered].sort((a, b) => {
      if (a.current && !b.current) return -1;
      if (!a.current && b.current) return 1;

      const getYear = (dateStr: string) => {
        if (dateStr === 'Present') return 9999;
        const match = dateStr.match(/\d{4}/);
        return match ? parseInt(match[0]) : 0;
      };

      const aYear = getYear(a.startDate);
      const bYear = getYear(b.startDate);
      return bYear - aYear;
    });
  }, [selectedTab, experienceFilter]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: Category) => {
    setSelectedTab(newValue);
    setExperienceFilter('all'); // Reset filter when changing tabs
  };

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    const allIds = filteredExperiences
      .filter((exp) => 
        (exp.highlights && exp.highlights.length > 0) ||
        (exp.technologies && exp.technologies.length > 0) ||
        exp.description
      )
      .map((exp) => exp.id);
    setExpandedIds(new Set(allIds));
  };

  const collapseAll = () => {
    setExpandedIds(new Set());
  };

  const allExpanded = filteredExperiences.every((exp) => {
    const hasDetails = 
      (exp.highlights && exp.highlights.length > 0) ||
      (exp.technologies && exp.technologies.length > 0) ||
      exp.description;
    return !hasDetails || expandedIds.has(exp.id);
  });

  return (
    <Box>
      {/* Experience Summary Strip */}
      {(selectedTab === 'experience' || selectedTab === 'all') && (
        <Paper
          variant="outlined"
          sx={{
            px: 2,
            py: 1.25,
            mb: 3,
            bgcolor: 'background.paper',
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          {/* Icon */}
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: '6px',
              bgcolor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <BusinessIcon sx={{ fontSize: 16, color: 'background.default' }} />
          </Box>

          {/* Content */}
          <Typography
            variant="body1"
            sx={{
              flex: 1,
              fontSize: '0.9375rem',
              fontWeight: 600,
              color: 'text.primary',
              lineHeight: 1,
            }}
          >
            {experienceDuration.label} experience
          </Typography>

          {/* Date Range Badge */}
          <Chip
            label="Jan 2018 – Present"
            size="small"
            sx={{
              bgcolor: 'background.default',
              fontSize: '0.75rem',
              fontWeight: 600,
              height: 24,
            }}
          />
        </Paper>
      )}

      {/* Main Tabs */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'stretch', sm: 'center' },
          mb: 3,
          gap: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          sx={{
            minHeight: 44,
            '& .MuiTab-root': {
              minHeight: 44,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.9375rem',
            },
          }}
        >
          <Tab
            value="experience"
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <BusinessIcon sx={{ fontSize: 18 }} />
                Experience
                <Chip label={categoryCounts.experience} size="small" sx={{ height: 18, fontSize: '0.6875rem' }} />
              </Box>
            }
          />
          <Tab
            value="education"
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SchoolIcon sx={{ fontSize: 18 }} />
                Education
                <Chip label={categoryCounts.education} size="small" sx={{ height: 18, fontSize: '0.6875rem' }} />
              </Box>
            }
          />
          <Tab
            value="all"
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                All
                <Chip label={categoryCounts.all} size="small" sx={{ height: 18, fontSize: '0.6875rem' }} />
              </Box>
            }
          />
        </Tabs>

        {/* Expand/Collapse Controls */}
        <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
          <Button
            size="small"
            startIcon={<UnfoldMoreIcon fontSize="small" />}
            onClick={expandAll}
            disabled={allExpanded}
            sx={{ 
              whiteSpace: 'nowrap',
              fontSize: '0.8125rem',
              textTransform: 'none',
            }}
          >
            Expand
          </Button>
          <Button
            size="small"
            startIcon={<UnfoldLessIcon fontSize="small" />}
            onClick={collapseAll}
            disabled={expandedIds.size === 0}
            sx={{ 
              whiteSpace: 'nowrap',
              fontSize: '0.8125rem',
              textTransform: 'none',
            }}
          >
            Collapse
          </Button>
        </Box>
      </Box>

      {/* Experience Filter Chips */}
      {selectedTab === 'experience' && (
        <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
          <Chip
            label="All"
            onClick={() => setExperienceFilter('all')}
            variant={experienceFilter === 'all' ? 'filled' : 'outlined'}
            color={experienceFilter === 'all' ? 'primary' : 'default'}
            size="small"
            sx={{ fontSize: '0.8125rem' }}
          />
          <Chip
            label="Industry"
            icon={<WorkIcon sx={{ fontSize: 14 }} />}
            onClick={() => setExperienceFilter('work')}
            variant={experienceFilter === 'work' ? 'filled' : 'outlined'}
            color={experienceFilter === 'work' ? 'primary' : 'default'}
            size="small"
            sx={{ fontSize: '0.8125rem' }}
          />
          <Chip
            label="Research"
            icon={<ScienceIcon sx={{ fontSize: 14 }} />}
            onClick={() => setExperienceFilter('research')}
            variant={experienceFilter === 'research' ? 'filled' : 'outlined'}
            color={experienceFilter === 'research' ? 'primary' : 'default'}
            size="small"
            sx={{ fontSize: '0.8125rem' }}
          />
          <Chip
            label="Teaching"
            icon={<MenuBookIcon sx={{ fontSize: 14 }} />}
            onClick={() => setExperienceFilter('teaching')}
            variant={experienceFilter === 'teaching' ? 'filled' : 'outlined'}
            color={experienceFilter === 'teaching' ? 'primary' : 'default'}
            size="small"
            sx={{ fontSize: '0.8125rem' }}
          />
        </Box>
      )}

      {/* Timeline */}
      <Box sx={{ position: 'relative', pl: { xs: 4, md: 5 } }}>
        {/* Timeline Line */}
        <Box
          sx={{
            position: 'absolute',
            left: isMobile ? '12px' : '16px',
            top: 0,
            bottom: 0,
            width: '2px',
            bgcolor: 'divider',
          }}
        />

        {/* Timeline Items */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {filteredExperiences.map((exp) => (
            <Box
              key={exp.id}
              sx={{
                position: 'relative',
              }}
            >
              {/* Timeline Dot */}
              <Box
                sx={{
                  position: 'absolute',
                  left: isMobile ? '-38px' : '-46px',
                  top: '12px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  bgcolor: typeConfig[exp.type].color,
                  border: '2px solid',
                  borderColor: 'background.default',
                  boxShadow: `0 0 0 3px ${typeConfig[exp.type].color}33`,
                }}
              />

              <TimelineItem
                experience={exp}
                expanded={expandedIds.has(exp.id)}
                onToggle={() => toggleExpanded(exp.id)}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
