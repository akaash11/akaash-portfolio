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
}

export const projects: Project[] = [
  {
    id: 'retrieval-engine',
    title: 'Retrieval Engine',
    subtitle: 'Hand-Built Vector Search for an Agentic System',
    description:
      'In progress: building and rigorously evaluating a retrieval system for an agent, implementing the index myself (IVF, HNSW, product quantization) rather than importing a vector DB, with an eval harness that scores chunking strategies on nDCG and MRR.',
    highlights: [
      'In progress: index layer (flat/exact kNN, IVF, HNSW, product quantization) implemented from scratch and benchmarked against FAISS',
      'Eval harness scores chunking strategies with nDCG@k and MRR against a hand-labeled query set',
      'LangGraph agent layer with citation-grounded output: every claim must cite a retrieved chunk, or the agent flags what evidence is missing',
      'Concurrent serving API with P50/P95/P99 latency and recall@k tracking planned for a later milestone',
    ],
    technologies: ['Python', 'FAISS', 'LangGraph', 'NumPy', 'Prometheus', 'Grafana'],
    badges: ['In Progress'],
    category: 'ml',
    featured: true,
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
    githubLink: '',
    badges: ['NSF Award $174,555'],
    category: 'full-stack',
  },
  {
    id: 'linko-2248',
    title: '2248 Linko',
    subtitle: 'Number Merge Puzzle Game: Shipped Solo',
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
    badges: ['Shipped Solo', 'App Store & Google Play'],
    category: 'mobile',
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
  },
];
