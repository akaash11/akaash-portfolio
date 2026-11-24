/**
 * Selected LinkedIn posts (AI security, supply chain, LLM infrastructure). Order does not matter: the UI sorts by date.
 * Links only: the posts live on LinkedIn, this site does not republish them.
 */
export interface WritingLink {
  title: string;
  date: string; // ISO yyyy-mm-dd
  topic: string;
  summary: string;
  tags: string[];
  url: string;
}

export const linkedinPostsUrl = 'https://www.linkedin.com/in/akaash-trivedi/recent-activity/all/';

export const writing: WritingLink[] = [
  {
    title: 'Every AI browser tested at Black Hat this year got hijacked by a web page',
    date: '2026-08-20',
    topic: 'Prompt injection',
    summary: 'Every agentic browser tested at Black Hat USA fell to indirect prompt injection, and why the fix is not simple.',
    tags: ['Prompt injection', 'AI browsers', 'Agent security'],
    url: 'https://www.linkedin.com/posts/akaash-trivedi_agenticai-aiinfrastructure-appsec-share-7492594580413038592-c89o/',
  },
  {
    title: 'The exploit code was clean. The dependency it pulled in was not.',
    date: '2026-07-03',
    topic: 'Supply chain',
    summary: 'Fake PoC exploits that hide a RAT in a PyPI dependency, aimed at the researchers who review malware for a living.',
    tags: ['Supply chain', 'Malware', 'PyPI'],
    url: 'https://www.linkedin.com/feed/update/urn:li:activity:7478852604978966530/',
  },
  {
    title: 'Agentjacking: your AI coding agent is now the attack surface',
    date: '2026-06-15',
    topic: 'Agent security',
    summary: "A new attack class where asking a coding agent to fix errors runs an attacker's code with your credentials.",
    tags: ['Agent security', 'Coding agents', 'Prompt injection'],
    url: 'https://www.linkedin.com/posts/akaash-trivedi_devsecops-agenticai-appsec-activity-7472296776750858240-MGIS',
  },
  {
    title: 'The worm that spreads through your AI coding assistant',
    date: '2026-06-08',
    topic: 'Supply chain',
    summary: 'Miasma spread to 73 Microsoft repos through a config file that AI coding agents read on open.',
    tags: ['Supply chain', 'Coding agents', 'Agent security'],
    url: 'https://www.linkedin.com/posts/akaash-trivedi_cursor-supplychainsecurity-devsecops-activity-7469771290644529153-ic4v',
  },
  {
    title: 'LLM inference servers are now first-class attack targets',
    date: '2026-04-27',
    topic: 'Inference security',
    summary: 'An LMDeploy SSRF was exploited within 13 hours of disclosure; model endpoints need the same hardening as any API.',
    tags: ['Inference security', 'SSRF', 'LLM serving'],
    url: 'https://www.linkedin.com/posts/akaash-trivedi_appsec-aiinfrastructure-llmops-activity-7454538955447828480-Efw4',
  },
  {
    title: 'The security scanner your CI/CD trusts became a backdoor',
    date: '2026-04-24',
    topic: 'CI/CD security',
    summary: "Hijacked trivy-action tags stole CI secrets and LiteLLM's PyPI token; why you pin actions to commits, not tags.",
    tags: ['CI/CD security', 'Supply chain', 'GitHub Actions'],
    url: 'https://www.linkedin.com/posts/akaash-trivedi_supplychainsecurity-devsecops-githubactions-activity-7453471835255607296-feij',
  },
  {
    title: 'The feature npm built to kill token theft just shipped 96 backdoored packages',
    date: '2026-06-05',
    topic: 'Supply chain',
    summary: 'Attackers abused npm trusted publishing to push 96 malicious versions across 32 Red Hat packages with no token stolen, and why the trust boundary just moved to the pipeline.',
    tags: ['Supply chain', 'CI/CD security', 'npm', 'GitHub Actions'],
    url: 'https://www.linkedin.com/posts/akaash-trivedi_devsecops-supplychainsecurity-appsec-activity-7468676710109216768-VdGd',
  },
  {
    title: 'The suspension lasted 7 minutes. The outage lasted 8 hours.',
    date: '2026-05-29',
    topic: 'Distributed systems',
    summary: 'A GCP account suspension was reversed in minutes, yet Railway stayed down for hours because its routing control plane lived on one cloud.',
    tags: ['Distributed systems', 'SRE', 'Cloud architecture'],
    url: 'https://www.linkedin.com/posts/akaash-trivedi_distributedsystems-sre-platformengineering-activity-7466154560605077504-A8qn',
  },
  {
    title: "A single git push can execute arbitrary commands on GitHub's backend servers",
    date: '2026-04-29',
    topic: 'AppSec',
    summary: 'CVE-2026-3854 turned unsanitized push options into remote code execution, and 88% of GitHub Enterprise Server customers had not patched seven weeks later.',
    tags: ['AppSec', 'GitHub', 'CVE'],
    url: 'https://www.linkedin.com/posts/akaash-trivedi_appsec-devsecops-github-activity-7455280427445112832-OA7u',
  },
  {
    title: "The attack didn't start at Vercel",
    date: '2026-04-23',
    topic: 'Supply chain',
    summary: "A compromised third-party AI tool gave attackers a Vercel employee's Google Workspace account, and why every OAuth integration widens your blast radius.",
    tags: ['Supply chain', 'OAuth', 'AI tooling'],
    url: 'https://www.linkedin.com/posts/akaash-trivedi_supplychainsecurity-aiappsec-oauthsecurity-activity-7453109349180211202-4Dhu',
  },
  {
    title: "Your Inference Provider's Hidden Controls",
    date: '2026-04-22',
    topic: 'LLM inference',
    summary: 'KV cache eviction and batching set a latency floor you cannot see, so benchmark under load and watch cache hit rate.',
    tags: ['LLM inference', 'Latency', 'KV cache'],
    url: 'https://www.linkedin.com/posts/akaash-trivedi_llmops-aiinfrastructure-inferenceeconomics-activity-7452750145663766528-gQGK',
  },
  {
    title: 'Introducing the Agent Readiness score. Is your site agent-ready?',
    date: '2026-04-20',
    topic: 'Platform engineering',
    summary: "Most sites are opaque to AI agents, and Cloudflare's Agent Readiness score treats llms.txt and structured metadata as a systems design problem.",
    tags: ['Agent readiness', 'llms.txt', 'Platform engineering'],
    url: 'https://www.linkedin.com/posts/akaash-trivedi_aiengineering-platformengineering-distributedsystems-activity-7452014591468896256-QSuA',
  },
  {
    title: 'Opus 4.7 ships at the same price. Your bill might not agree.',
    date: '2026-04-17',
    topic: 'LLM costs',
    summary: 'A new tokenizer can use up to 35% more tokens at the same unit price, which makes token counts a capacity planning metric.',
    tags: ['LLM inference', 'LLM costs', 'Claude'],
    url: 'https://www.linkedin.com/posts/akaash-trivedi_aiinfrastructure-claudeai-llmops-activity-7450907455955312640-RwSn',
  },
  {
    title: 'Stop using your most expensive model for your cheapest tasks',
    date: '2026-04-16',
    topic: 'LLM routing',
    summary: 'Hard-coding one model is the monolith of the AI era; a routing layer sends each request to a frontier, mid-tier or small model.',
    tags: ['LLM inference', 'LLM routing', 'LLM costs'],
    url: 'https://www.linkedin.com/posts/akaash-trivedi_ai-infrastructure-llmops-activity-7450558689071259648-Sa32',
  },
  {
    title: 'AWS Summit NYC 2026: the wrapper era is over',
    date: '2026-06-22',
    topic: 'AWS Summit',
    summary: 'A day at AWS Summit NYC on what is actually shipping for agents in production, from knowledge graphs to security at machine speed.',
    tags: ['Agentic AI', 'AWS', 'Conferences'],
    url: 'https://www.linkedin.com/posts/akaash-trivedi_aws-summit-nyc-2026-activity-7474820598993649664-XkkQ',
  },
];
