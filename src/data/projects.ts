export type ProjectCategory = 'full-stack' | 'ml' | 'research' | 'mobile';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  technologies: string[];
  liveLink?: string;
  githubLink?: string;
  devpostLink?: string;
  appStoreLink?: string;
  playStoreLink?: string;
  image?: string;
  badge?: string; // Legacy: single badge (e.g., "Featured", "Hackathon Winner")
  badges?: string[]; // Multiple badges (takes precedence over badge if present)
  category?: ProjectCategory;
  featured?: boolean;
  earlier?: boolean; // Older work, shown collapsed under "Earlier work" instead of the main carousel
  year?: string;
}

export const projects: Project[] = [
  {
    id: 'knowledge-assistant',
    title: 'Private RAG Assistant',
    subtitle: 'Voice-first AI agent with evals and prompt-injection defenses',
    description:
      'An AI assistant over my own notes that runs on hardware I control. Sensitive data never leaves the device, and every retrieval change is scored against hand-labeled evals before it ships.',
    highlights: [
      'Keeps sensitive notes on-device: 76/76 outbound requests clean across 172 adversarial and replayed questions',
      'Hardened against prompt injection: 109/109 checks pass, with a quarantined no-tools model reading email',
      'Raised recall@5 from 26/28 to 27/28 and MRR from 0.83 to 0.88 through chunking changes',
      'Caught my own regression: a date filter lifted temporal MRR to 0.92 but leaked false premises, so I turned it off',
      'Checks grounding in code: every number in an answer must appear in the cited source notes',
      'Voice capture with local Whisper and Qwen3, plus a native iPhone app with Face ID sign-in',
    ],
    technologies: ['Python', 'RAG', 'LLM Evals', 'Whisper', 'Qwen3', 'Local LLMs', 'Prompt-Injection Defense'],
    badges: ['Evaluated'],
    category: 'ml',
    featured: true,
  },
  {
    id: 'linko-2248',
    title: '2248 Linko',
    subtitle: 'Number Merge Puzzle Game',
    description:
      'Independently shipped mobile game on the App Store and Google Play. Draw chains of tiles to merge numbers and chase the high score, with Linko the Shiba Inu reacting to every move.',
    highlights: [
      'Designed, built, and shipped solo, from architecture to App Store / Google Play release',
      'Built with Expo / React Native for cross-platform iOS & Android',
      'Supabase backend for real-time leaderboards and score sync',
      'Offline-first: plays without internet, syncs on reconnect',
      'Daily missions, rewarded ads, and in-app purchases',
    ],
    technologies: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'Zustand', 'EAS'],
    appStoreLink: 'https://apps.apple.com/app/id6760681337',
    playStoreLink: 'https://play.google.com/store/apps/details?id=com.playlinko.mergegame',
    image: '/linko-icon.png',
    badges: ['Shipped Solo'],
    category: 'mobile',
  },
  {
    id: 'smar',
    title: 'SMAR',
    subtitle: 'Systematic Mobile Application Reviews',
    description:
      'HCI research tool that helps researchers analyze mobile app reviews at scale, delivering structured insights from Play Store data.',
    highlights: [
      '$174,555 National Science Foundation (NSF) award supporting the research.',
      'Led development as HCI Research Team Lead at Santa Clara University',
      'Built full-stack web application with React, MUI, and Node.js',
      'Deployed on AWS (EC2, S3, Route 53) with Docker',
      'Integrated Play Store scraping and data analysis pipelines',
    ],
    technologies: ['React', 'Material UI', 'Node.js', 'AWS', 'Docker', 'Python', 'Play Store API'],
    liveLink: 'https://smar-tool.org',
    badges: ['NSF Award $174,555'],
    category: 'full-stack',
  },
  {
    id: 'retrieval-engine',
    title: 'Retrieval Engine',
    subtitle: 'Evaluated, Grounded Retrieval for an Agentic System',
    description:
      'Planned, not yet built: a retrieval system for an agent, designed around an eval harness that scores chunking strategies on nDCG and MRR, and a LangGraph agent layer that must cite a retrieved chunk for every claim or admit it cannot answer.',
    highlights: [
      'Eval harness will score chunking strategies with nDCG@k and MRR against a hand-labeled query set, so retrieval quality is measured, not assumed.',
      'LangGraph agent layer with citation-grounded output: every claim must cite a retrieved chunk, or the agent flags what evidence is missing.',
      'Exact/flat retrieval baseline as the recall oracle for later index work.',
      'Stretch goal: hand-built IVF, HNSW, and product-quantization index benchmarked against FAISS.',
    ],
    technologies: ['Python', 'FAISS', 'LangGraph', 'NumPy'],
    badges: ['Planned'],
    category: 'ml',
  },
  {
    id: 'eat-o-pia',
    title: 'Eatopia',
    subtitle: 'AI-Powered Meal Planning Assistant',
    description: 'Cal Hacks 10 project featuring "Avo," an intelligent chatbot that generates personalized meal plans and recipes using AI.',
    highlights: [
      'Built mobile app with React Native and TypeScript for cross-platform experience',
      'Integrated TogetherAI for intelligent meal recommendations and conversational AI',
      'Firebase backend for real-time data sync and user authentication',
      'Won recognition at Cal Hacks 10 hackathon',
    ],
    technologies: ['React Native', 'TypeScript', 'Firebase', 'TogetherAI', 'AI/ML'],
    devpostLink: 'https://devpost.com/software/eatopia',
    githubLink: 'https://github.com/ViralDam/CalHacks10',
    badge: 'Hackathon',
    category: 'ml',
    earlier: true,
    year: '2023',
  },
  {
    id: 'lets-not-wait',
    title: 'Lets not wait!',
    subtitle: 'Smart Wait Time Optimization',
    description: 'Hackathon-winning platform that reduced wait times using real-time data and intelligent scheduling algorithms.',
    highlights: [
      'Full-stack application with Python/Django backend and React frontend',
      'MySQL database optimization for handling high-volume queries',
      'Google Maps API integration for location-based services',
      'Won hackathon for innovative approach to reducing service wait times',
    ],
    technologies: ['Python', 'Django', 'MySQL', 'React', 'Google Maps API', 'REST API'],
    devpostLink: 'https://devpost.com/software/lets-not-wait',
    githubLink: 'https://github.com/mohanraj-cs/Inrix_hackathon',
    badge: 'Hackathon Winner',
    category: 'full-stack',
    earlier: true,
    year: '2023',
  },
];

export const mainProjects = projects.filter((p) => !p.earlier);
export const earlierProjects = projects.filter((p) => p.earlier);
