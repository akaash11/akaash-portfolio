import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Box, Chip, Container, Stack, Typography } from '@mui/material';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogPostBody from '@/components/BlogPost';
import { siteConfig } from '@/config/site';
import { blogPosts, getPost } from '@/data/blog';
import { readPostMarkdown } from '@/utils/blog';

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `${siteConfig.url}/blog/${post.slug}`;
  return {
    title: `${post.title} | ${siteConfig.author.name}`,
    description: post.summary,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.summary,
      url,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [siteConfig.author.name],
      tags: post.tags,
    },
    alternates: { canonical: url },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const markdown = readPostMarkdown(post.slug);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: 'en-US',
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    publisher: { '@id': `${siteConfig.url}/#person` },
    isPartOf: { '@type': 'Blog', name: `${siteConfig.author.name}: Writing`, url: `${siteConfig.url}/#writing` },
    keywords: post.tags.join(', '),
    articleSection: post.tags[0],
    author: { '@id': `${siteConfig.url}/#person` },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <Box component="main" sx={{ pt: { xs: 12, md: 14 }, pb: 8 }}>
        <Container maxWidth={false} sx={{ maxWidth: 760 }}>
          <Typography component="p" variant="body2" sx={{ mb: 2 }}>
            <Link href="/#writing" style={{ color: 'inherit' }}>
              &larr; Back to Writing
            </Link>
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(`${post.date}T00:00:00`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </Typography>
          <Typography variant="h1" sx={{ fontWeight: 700, fontSize: { xs: '1.9rem', md: '2.6rem' }, lineHeight: 1.2, mt: 1, mb: 3 }}>
            {post.title}
          </Typography>
          <Stack direction="row" useFlexGap flexWrap="wrap" sx={{ gap: 1, mb: 3 }} aria-label="Topics">
            {post.tags.map((t) => (
              <Chip key={t} label={t} size="small" variant="outlined" />
            ))}
          </Stack>
          <BlogPostBody markdown={markdown} />
        </Container>
      </Box>
      <Footer />
    </>
  );
}
