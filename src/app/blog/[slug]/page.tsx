import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import Link from 'next/link';
import { Box, Container, Typography } from '@mui/material';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogPostBody from '@/components/BlogPost';
import { siteConfig } from '@/config/site';
import { blogPosts, getPost } from '@/data/blog';

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

  const markdown = readFileSync(path.join(process.cwd(), 'src/content/blog', `${post.slug}.md`), 'utf8');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
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
          <BlogPostBody markdown={markdown} />
        </Container>
      </Box>
      <Footer />
    </>
  );
}
