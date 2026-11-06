/**
 * Builds /llms.txt and /llms-full.txt from the same data files the site renders, so the
 * plain-text summary that LLM crawlers read can never drift from the visible pages.
 * Spec: https://llmstxt.org
 */
import { siteConfig } from '@/config/site';
import { experiences } from '@/data/experience';
import { mainProjects, earlierProjects } from '@/data/projects';
import { writing, linkedinPostsUrl } from '@/data/writing';

const u = (path: string) => `${siteConfig.url}${path}`;

function header(): string {
  return [
    `# ${siteConfig.author.name}`,
    '',
    `> ${siteConfig.description}`,
    '',
    `${siteConfig.author.name} is a ${siteConfig.author.title}, based in ${siteConfig.author.location}. ` +
      'Primary focus: applied AI (agentic systems, retrieval, evals) and developer experience / platform ' +
      'engineering. Spikes in security (SIEM, MITRE ATT&CK at Qualys) and fintech (Click-to-Pay, payments ' +
      `microservices at Opus). ${siteConfig.author.education}, Santa Clara University (GPA 4.0).`,
    '',
  ].join('\n');
}

function links(): string {
  return [
    '## Pages',
    '',
    `- [Home](${u('/')}): overview, about, experience, projects, writing, contact`,
    `- [About](${u('/about')}): background and strengths`,
    `- [Experience](${u('/experience')}): full work, research, teaching, and education history`,
    `- [Projects](${u('/projects')}): selected projects with measured results`,
    `- [Contact](${u('/contact')}): contact form`,
    `- [Full text for LLMs](${u('/llms-full.txt')}): every role and project in one file`,
    '',
    '## Profiles',
    '',
    `- [LinkedIn](${siteConfig.social.linkedin})`,
    `- [GitHub](${siteConfig.social.github})`,
    `- [2248 Linko (shipped game)](${siteConfig.social.playlinko})`,
    '',
  ].join('\n');
}

function projectsSection(full: boolean): string {
  const lines = ['## Projects', ''];
  for (const p of mainProjects) {
    const status = p.badges?.includes('Planned') ? ' (planned, not yet built)' : '';
    lines.push(`### ${p.title}${status}`, '', `${p.subtitle}. ${p.description}`, '');
    (full ? p.highlights : p.highlights.slice(0, 2)).forEach((h) => lines.push(`- ${h}`));
    lines.push('');
  }
  if (full && earlierProjects.length) {
    lines.push('### Earlier work', '');
    earlierProjects.forEach((p) => lines.push(`- ${p.title} (${p.year}): ${p.description}`));
    lines.push('');
  }
  return lines.join('\n');
}

function experienceSection(full: boolean): string {
  const lines = ['## Experience', ''];
  const roles = experiences.filter((e) => e.type !== 'education');
  for (const e of full ? roles : roles.filter((e) => e.type === 'work' && !/intern/i.test(e.title)).slice(0, 4)) {
    lines.push(`### ${e.title}, ${e.organization} (${e.startDate} to ${e.endDate})`, '');
    if (e.description) lines.push(e.description, '');
    const hs = e.highlights ?? [];
    (full ? hs : hs.slice(0, 4)).forEach((h) => lines.push(`- ${h}`));
    if (full && e.technologies?.length) lines.push('', `Technologies: ${e.technologies.join(', ')}`);
    lines.push('');
  }
  if (full) {
    lines.push('## Education', '');
    experiences
      .filter((e) => e.type === 'education')
      .forEach((e) => lines.push(`- ${e.title}, ${e.organization} (${e.startDate} to ${e.endDate})`));
    lines.push('');
  }
  return lines.join('\n');
}

function writingSection(): string {
  const lines = ['## Writing (LinkedIn, AI security)', ''];
  writing.forEach((w) => lines.push(`- [${w.title}](${w.url}) (${w.date}): ${w.summary}`));
  lines.push(`- [All posts](${linkedinPostsUrl})`, '');
  return lines.join('\n');
}

export function buildLlmsTxt(): string {
  return [header(), links(), projectsSection(false), experienceSection(false), writingSection()].join('\n');
}

export function buildLlmsFullTxt(): string {
  return [header(), links(), projectsSection(true), experienceSection(true), writingSection()].join('\n');
}
