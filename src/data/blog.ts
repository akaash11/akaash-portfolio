export interface BlogPost {
  slug: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  summary: string;
  tags: string[]; // Drives filters, meta keywords, JSON-LD and llms.txt
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'tripwire',
    title: 'Tripwire: designing a payment firewall for AI shopping agents',
    date: '2026-11-23',
    summary:
      'How I built a guard that stops a shopping agent from being fooled: signed intent, deterministic checks before model checks, and a red-team eval where 0 of 23 attacks got through.',
    tags: ['Agent security', 'Prompt injection', 'Agentic AI', 'Payments', 'LLM evals', 'Gemini'],
  },
];

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);
