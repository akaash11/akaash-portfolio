'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Typography,
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { writing, linkedinPostsUrl } from '@/data/writing';
import { blogPosts } from '@/data/blog';

const VISIBLE_LINKEDIN = 6; // two rows of three on desktop
const MAX_FILTER_TAGS = 8;

function formatDate(iso: string) {
  const [y, m] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function TagRow({ tags }: { tags: string[] }) {
  return (
    <Stack direction="row" useFlexGap flexWrap="wrap" sx={{ gap: 0.75, mt: 1.5 }}>
      {tags.map((t) => (
        <Chip key={t} label={t} size="small" variant="outlined" sx={{ fontSize: '0.7rem', height: 22 }} />
      ))}
    </Stack>
  );
}

/**
 * Writing: long reads on this site (featured, wide) and LinkedIn posts (compact grid).
 * Everything is rendered into the HTML for crawlers; filters and "show all" only change
 * what is visible. Tags come from the data files, so adding a post needs no UI change.
 */
export default function Writing() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  // Most-used tags across both kinds of posts become the filter chips.
  const filterTags = useMemo(() => {
    const counts = new Map<string, number>();
    [...blogPosts, ...writing].forEach((p) => p.tags.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)));
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, MAX_FILTER_TAGS)
      .map(([t]) => t);
  }, []);

  const matches = (tags: string[]) => !activeTag || tags.includes(activeTag);
  const longReads = blogPosts.filter((p) => matches(p.tags));
  const linkedin = writing.filter((p) => matches(p.tags));
  // While filtering, show every match; otherwise cap at two rows with a toggle.
  const limit = activeTag || expanded ? linkedin.length : VISIBLE_LINKEDIN;
  const shown = linkedin.slice(0, limit);
  const rest = linkedin.slice(limit);

  const linkedinCard = (post: (typeof writing)[number]) => (
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
        sx={{ height: '100%', display: 'flex', alignItems: 'stretch' }}
      >
        <CardContent sx={{ p: 2.5, width: '100%' }}>
          <Typography
            variant="caption"
            component="p"
            sx={{ color: 'primary.main', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', mb: 1 }}
          >
            {post.topic} · <time dateTime={post.date}>{formatDate(post.date)}</time>
          </Typography>
          <Typography
            variant="h6"
            component="h4"
            sx={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.35, mb: 1, color: 'text.primary' }}
          >
            {post.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8125rem' }}>
            {post.summary}
          </Typography>
          <TagRow tags={post.tags} />
        </CardContent>
      </CardActionArea>
    </Card>
  );

  const grid = {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
    gap: 2,
  } as const;

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Typography
        variant="body1"
        sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: 640, mx: 'auto', mb: 3 }}
      >
        Long reads here, and weekly AI security posts on LinkedIn.
      </Typography>

      {/* Topic filters. Scrolls sideways on phones instead of wrapping into many rows. */}
      <Stack
        direction="row"
        role="group"
        aria-label="Filter writing by topic"
        sx={{
          gap: 1,
          mb: 4,
          justifyContent: { md: 'center' },
          overflowX: 'auto',
          pb: 0.5,
          flexWrap: { xs: 'nowrap', md: 'wrap' },
          '& > *': { flexShrink: 0 },
        }}
      >
        <Chip
          label="All"
          clickable
          color={activeTag === null ? 'primary' : 'default'}
          variant={activeTag === null ? 'filled' : 'outlined'}
          onClick={() => setActiveTag(null)}
        />
        {filterTags.map((t) => (
          <Chip
            key={t}
            label={t}
            clickable
            color={activeTag === t ? 'primary' : 'default'}
            variant={activeTag === t ? 'filled' : 'outlined'}
            onClick={() => setActiveTag(activeTag === t ? null : t)}
            aria-pressed={activeTag === t}
          />
        ))}
      </Stack>

      {longReads.length > 0 && (
        <Box component="section" aria-label="Long reads" sx={{ mb: 5 }}>
          <Typography variant="overline" component="h3" sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: '0.1em' }}>
            Long reads
          </Typography>
          <Stack sx={{ gap: 2, mt: 1 }}>
            {longReads.map((post) => (
              <Card
                key={post.slug}
                variant="outlined"
                sx={{ bgcolor: 'background.paper', borderColor: 'primary.main', '&:hover': { borderColor: 'primary.light' } }}
              >
                <CardActionArea component={Link} href={`/blog/${post.slug}`} sx={{ display: 'block' }}>
                  <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
                    <Typography
                      variant="caption"
                      component="p"
                      sx={{ color: 'primary.main', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', mb: 1 }}
                    >
                      Write-up · <time dateTime={post.date}>{formatDate(post.date)}</time>
                    </Typography>
                    <Typography
                      variant="h5"
                      component="h4"
                      sx={{ fontWeight: 700, lineHeight: 1.3, mb: 1.5, color: 'text.primary', fontSize: { xs: '1.2rem', md: '1.5rem' } }}
                    >
                      {post.title}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', maxWidth: 820 }}>{post.summary}</Typography>
                    <TagRow tags={post.tags} />
                    <Typography
                      component="span"
                      sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, mt: 2, color: 'primary.main', fontWeight: 600 }}
                    >
                      Read the write-up <ArrowForwardIcon fontSize="small" />
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Stack>
        </Box>
      )}

      {linkedin.length > 0 && (
        <Box component="section" aria-label="LinkedIn posts">
          <Typography variant="overline" component="h3" sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: '0.1em' }}>
            On LinkedIn
          </Typography>
          <Box sx={{ ...grid, mt: 1 }}>{shown.map(linkedinCard)}</Box>
          {rest.length > 0 && (
            // Hidden, not unmounted: collapsed posts stay in the HTML for crawlers.
            <Box hidden sx={{ ...grid, mt: 2 }}>{rest.map(linkedinCard)}</Box>
          )}
        </Box>
      )}

      {longReads.length === 0 && linkedin.length === 0 && (
        <Typography sx={{ textAlign: 'center', color: 'text.secondary' }}>No posts for this topic yet.</Typography>
      )}

      <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 4, gap: 2, justifyContent: 'center' }}>
        {!activeTag && writing.length > VISIBLE_LINKEDIN && (
          <Button
            variant="text"
            size="large"
            onClick={() => setExpanded((v) => !v)}
            endIcon={<ExpandMoreIcon sx={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} />}
          >
            {expanded ? 'Show fewer' : `Show all ${writing.length} LinkedIn posts`}
          </Button>
        )}
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
      </Stack>
    </Box>
  );
}
