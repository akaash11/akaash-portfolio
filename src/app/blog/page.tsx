import type { Metadata } from 'next';
import Link from 'next/link';
import { Box, Container, Typography } from '@mui/material';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { siteConfig } from '@/config/site';
import { blogPosts } from '@/data/blog';

export const metadata: Metadata = {
  title: `Blog - ${siteConfig.author.name} | Applied AI and Agent Security`,
  description: `Write-ups by ${siteConfig.author.name} on building and evaluating agentic systems, with real numbers.`,
  openGraph: {
    title: `Blog - ${siteConfig.author.name}`,
    description: 'Write-ups on building and evaluating agentic systems.',
    url: `${siteConfig.url}/blog`,
    type: 'website',
  },
  alternates: { canonical: `${siteConfig.url}/blog` },
};

export default function BlogIndexPage() {
  return (
    <>
      <Navbar />
      <Box component="main" sx={{ minHeight: 'calc(100vh - 200px)', pt: { xs: 12, md: 14 }, pb: 8 }}>
        <Container maxWidth="md">
          <Typography variant="h1" sx={{ fontWeight: 700, fontSize: { xs: '2rem', md: '2.5rem' }, mb: 5 }}>
            Blog
          </Typography>
          {blogPosts.map((post) => (
            <Box key={post.slug} component="article" sx={{ mb: 4 }}>
              <Typography variant="caption" color="text.secondary">
                {new Date(`${post.date}T00:00:00`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </Typography>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 600, my: 0.5 }}>
                <Link href={`/blog/${post.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  {post.title}
                </Link>
              </Typography>
              <Typography color="text.secondary">{post.summary}</Typography>
            </Box>
          ))}
        </Container>
      </Box>
      <Footer />
    </>
  );
}
