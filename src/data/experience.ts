export type ExperienceType = 'work' | 'education' | 'research' | 'teaching';

export interface Experience {
  id: string;
  type: ExperienceType;
  title: string;
  organization: string;
  location?: string;
  startDate: string;
  endDate: string;
  current?: boolean;
  description?: string;
  highlights?: string[];
  technologies?: string[];
  link?: string;
  concurrent?: boolean; // Indicates this overlaps with other experiences
}

export const experiences: Experience[] = [
    {
        id: 'marvell-senior',
        type: 'work',
        title: 'Sr. Software Engineer',
        organization: 'Marvell Technology, Inc.',
        location: 'New York',
        startDate: 'July 2024',
        endDate: 'Present',
        current: true,
        highlights: [
          'Built a Django web application with Celery + Redis for background job scheduling and reliable async processing.',
          'Operationalized reproducible notebook runs by executing .ipynb pipelines with Papermill for automated reporting and batch analysis.',
          'Implemented CI/CD with GitHub Actions to automate deployment and enforce a consistent release workflow on every merge.',
          'Authored and maintained end-to-end documentation for a Python monorepo using Sphinx (API docs, guides, and runbooks).',
          'Developed internal dashboards and reporting utilities using Matplotlib to visualize key metrics and experiment results.',
          'Designed a scalable Channel Library system (data model + search UX) to store, query, and visualize channel artifacts efficiently.',
          'Led team enablement on engineering standards: Git branching strategy, PR review flow, and maintaining high-signal code reviews.',
          'Improved persistence and query performance by evolving storage across MongoDB and PostgreSQL to match access patterns.',
        ],
        technologies: [
          'Python',
          'Django',
          'Celery',
          'Redis',
          'Papermill',
          'GitHub Actions',
          'Sphinx',
          'Matplotlib',
          'PostgreSQL',
          'MongoDB',
          'Docker',
        ],
        link: 'https://www.marvell.com/',
    },
  {
    id: 'scu-masters',
    type: 'education',
    title: 'Master of Science in Computer Science and Engineering',
    organization: 'Santa Clara University',
    location: 'Santa Clara, CA',
    startDate: 'September 2022',
    endDate: 'June 2024',
    concurrent: true,
    highlights: [
      'GPA: 4.0',
      'Focus areas: Software Engineering, HCI, and System Design.',
      'Completed applied work spanning full-stack development, data/ML, and systems fundamentals.',
      'Hands-on experience through research leadership and teaching assistantship.',
    ],
    technologies: [
      'Distributed Systems',
      'Advanced Operating Systems',
      'Advanced Data Structures',
      'Computer Networks',
      'Design and Analysis of Algorithms',
    ],
    link: 'https://www.scu.edu/',
  },

  {
    id: 'scu-ta',
    type: 'teaching',
    title: 'Teaching Assistant - CSE Department',
    organization: 'Santa Clara University',
    location: 'Santa Clara, CA',
    startDate: 'September 2023',
    endDate: 'June 2024',
    concurrent: true,
    highlights: [
      'Taught Introduction to Programming Languages.',
      'Instructed Data Structures and Algorithms.',
      'Led Operating Systems lab sessions.',
      'Mentored students through debugging, assignments, and project milestones.',
      'Supported course operations: office hours, grading support, and clarifying concepts with practical examples.',
    ],
    technologies: ["C", "C++", 'Python', 'Data Structures', 'Operating Systems'],
  },

  {
    id: 'scu-hci',
    type: 'research',
    title: 'HCI Researcher & Development Team Lead',
    organization: 'Santa Clara University - SMAR Project',
    location: 'Santa Clara, CA',
    startDate: 'March 2023',
    endDate: 'June 2024',
    concurrent: true,
    description: 'Led research and development for SMAR (Systematic Mobile Application Reviews) tool.',
    highlights: [
      'Led development for an HCI research tool end-to-end: requirements, UX iteration, implementation, and deployment.',
      'Built a production-grade web application using React, Material UI, and Node.js.',
      'Owned cloud deployment and operationalization using AWS (EC2, S3, Route 53) and Docker containerization.',
      'Built/maintained data acquisition workflows (Play Store scraping) to support research and experimentation.',
      'Conducted user studies and incorporated findings into iterative product improvements.',
      'Coordinated a multi-person research/development team and aligned deliverables to lab goals and timelines.',
    ],
    technologies: ['React', 'Material UI', 'Node.js', 'AWS EC2', 'Amazon S3', 'Route 53', 'Docker', 'Python'],
    link: 'https://smar-tool.org',
  },

  {
    id: 'marvell-intern',
    type: 'work',
    title: 'Software Engineer Intern',
    organization: 'Marvell Technology Inc.',
    location: 'New York',
    startDate: 'June 2023',
    endDate: 'September 2023',
    concurrent: true,
    highlights: [
      'Built a Python MVC application using Django with GraphQL integration and a Bootstrap-based UI.',
      'Improved CI/CD workflows using Gerrit and Jenkins, reducing integration time by ~20%.',
      'Collaborated with engineers to ship models through code review and automated pipelines.',
      'Focused on maintainable structure, predictable deployments, and developer experience improvements.',
    ],
    technologies: ['Jenkins', 'CI/CD','Python', 'Django', 'GraphQL', 'Bootstrap', 'Gerrit'],
    link: 'https://www.marvell.com/',
  },

  {
    id: 'qualys',
    type: 'work',
    title: 'Sr. Software Engineer',
    organization: 'Qualys, Inc.',
    location: 'Pune, India',
    startDate: 'November 2020',
    endDate: 'July 2022',
    highlights: [
      'Built an enterprise threat detection and response solution for SIEM workflows, improving security posture.',
      'Created firewall log mapping and parsers using Logstash + Kibana, improving log analysis efficiency by ~30%.',
      'Prototyped 30+ UI features using React and Redux to improve scalability and user experience.',
      'Designed dashboards and widgets for Events, Signals, and MITRE ATT&CK tactics/techniques mapping.',
      'Partnered with UX and cross-functional teams to translate feedback into actionable product improvements.',
      'Mentored junior engineers and drove code reviews and quality practices across the team.',
    ],
    technologies: [
      'React',
      'Redux',
      'SIEM',
      'ELK (Elasticsearch, Logstash, Kibana)',
      'MITRE ATT&CK',
      'JavaScript',
      'TypeScript',
    ],
    link: 'https://www.qualys.com/',
  },

  {
    id: 'opus',
    type: 'work',
    title: 'Software Engineer',
    organization: 'Opus Consulting Solutions',
    location: 'Pune, India',
    startDate: 'August 2018',
    endDate: 'October 2020',
    highlights: [
      'Architected a Digital Card Facilitator / Click-to-Pay solution at merchant checkout scale, emphasizing data integrity and reliability.',
      'Implemented microservices using Java Spring Boot, improving scalability by ~50%.',
      'Optimized SQL queries and added indexing to remove bottlenecks, improving retrieval performance by ~40%.',
      'Built a secure JavaScript (ES6) SDK using the façade pattern with robust controllers and stronger security guarantees.',
      'Integrated SonarQube and raised code quality across security, reliability, and maintainability (~70% improvement).',
      'Created and maintained design documentation via Storybook to streamline cross-team collaboration.',
      'Developed a Flask + MongoDB microservice to support a risk prediction model.',
      'Performed ML time-series forecasting for ATM transaction frequency (~97% accuracy) and surfaced insights for stakeholders.',
      'Delivered reporting via Power BI dashboards to visualize trends and operational metrics.',
    ],
    technologies: [
      'Java',
      'Spring Boot',
      'Microservices',
      'SQL',
      'JavaScript (ES6)',
      'SonarQube',
      'Storybook',
      'Flask',
      'MongoDB',
      'Power BI',
    ],
    link: 'https://opustechglobal.com/',
  },

  {
    id: 'tech-mahindra-intern',
    type: 'work',
    title: 'Software Development Intern',
    organization: 'Tech Mahindra',
    location: 'Pune, India',
    startDate: 'January 2018',
    endDate: 'May 2018',
    concurrent: true,
    highlights: [
      'Engineered custom Alexa Skills for car and realtor assistants.',
      'Used AWS Lambda, DynamoDB, and S3 for robust data handling and storage.',
      'Improved performance and reliability through efficient AWS service integration.',
      'Worked in a fast-iteration environment to validate ideas and ship usable prototypes.',
    ],
    technologies: ['Alexa Skills', 'AWS Lambda', 'DynamoDB', 'Amazon S3'],
    link: 'https://www.techmahindra.com/',
  },

  {
    id: 'vit-bachelors',
    type: 'education',
    title: 'Bachelor of Technology in Computer Engineering',
    organization: 'Vishwakarma Institute of Technology',
    location: 'Pune, India',
    startDate: 'August 2014',
    endDate: 'May 2018',
    concurrent: true,
    highlights: [
      'Bachelor of Technology in Computer Engineering.',
      'Built a strong foundation in core CS fundamentals and software development.',
      'Active participation in hackathons and coding competitions.',
    ],
    technologies: [
      'Data Structures',
      'Algorithms',
      'Operating Systems',
      'Database Management',
      'Computer Networks',
      'Object-Oriented Programming',
    ],
  },
];
