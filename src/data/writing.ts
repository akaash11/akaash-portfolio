/**
 * Selected LinkedIn posts on AI security and agent risk.
 * Links only: the posts live on LinkedIn, this site does not republish them.
 */
export interface WritingLink {
  title: string;
  date: string; // ISO yyyy-mm-dd
  topic: string;
  summary: string;
  url: string;
}

export const linkedinPostsUrl = 'https://www.linkedin.com/in/akaash-trivedi/recent-activity/all/';

export const writing: WritingLink[] = [
  {
    title: 'Every AI browser tested at Black Hat this year got hijacked by a web page',
    date: '2026-08-20',
    topic: 'Prompt injection',
    summary: 'Every agentic browser tested at Black Hat USA fell to indirect prompt injection, and why the fix is not simple.',
    url: 'https://www.linkedin.com/posts/akaash-trivedi_agenticai-aiinfrastructure-appsec-share-7492594580413038592-c89o/',
  },
  {
    title: 'The exploit code was clean. The dependency it pulled in was not.',
    date: '2026-07-03',
    topic: 'Supply chain',
    summary: 'Fake PoC exploits that hide a RAT in a PyPI dependency, aimed at the researchers who review malware for a living.',
    url: 'https://www.linkedin.com/feed/update/urn:li:activity:7478852604978966530/',
  },
  {
    title: 'Agentjacking: your AI coding agent is now the attack surface',
    date: '2026-06-15',
    topic: 'Agent security',
    summary: "A new attack class where asking a coding agent to fix errors runs an attacker's code with your credentials.",
    url: 'https://www.linkedin.com/posts/akaash-trivedi_devsecops-agenticai-appsec-activity-7472296776750858240-MGIS',
  },
  {
    title: 'The worm that spreads through your AI coding assistant',
    date: '2026-06-08',
    topic: 'Supply chain',
    summary: 'Miasma spread to 73 Microsoft repos through a config file that AI coding agents read on open.',
    url: 'https://www.linkedin.com/posts/akaash-trivedi_cursor-supplychainsecurity-devsecops-activity-7469771290644529153-ic4v',
  },
  {
    title: 'LLM inference servers are now first-class attack targets',
    date: '2026-04-27',
    topic: 'Inference security',
    summary: 'An LMDeploy SSRF was exploited within 13 hours of disclosure; model endpoints need the same hardening as any API.',
    url: 'https://www.linkedin.com/posts/akaash-trivedi_appsec-aiinfrastructure-llmops-activity-7454538955447828480-Efw4',
  },
  {
    title: 'The security scanner your CI/CD trusts became a backdoor',
    date: '2026-04-24',
    topic: 'CI/CD security',
    summary: "Hijacked trivy-action tags stole CI secrets and LiteLLM's PyPI token; why you pin actions to commits, not tags.",
    url: 'https://www.linkedin.com/posts/akaash-trivedi_supplychainsecurity-devsecops-githubactions-activity-7453471835255607296-feij',
  },
];
