import 'server-only';
import { readFileSync } from 'node:fs';
import path from 'node:path';

/** Server-only: reads a long read's Markdown. Used by the article page, llms-full.txt and the RSS feed. */
export function readPostMarkdown(slug: string): string {
  return readFileSync(path.join(process.cwd(), 'src/content/blog', `${slug}.md`), 'utf8');
}
