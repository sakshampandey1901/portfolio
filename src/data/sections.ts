export type SectionId = 'about' | 'experience' | 'projects' | 'github';

export interface Section {
  id: SectionId;
  pillLabel: string;
  tabLabel: string;
}

/** Single source for the hero pills and the in-TV navigation tabs. */
export const SECTIONS: Section[] = [
  { id: 'about', pillLabel: 'A little about me', tabLabel: 'About' },
  { id: 'experience', pillLabel: 'Professional Experiences', tabLabel: 'Experience' },
  { id: 'projects', pillLabel: 'Projects I have worked on', tabLabel: 'Projects' },
  { id: 'github', pillLabel: 'Github Profile', tabLabel: 'GitHub' },
];

export const CONTACT = {
  email: 'pandeysaksham450@gmail.com',
  linkedin: 'https://linkedin.com/in/saksham-pandey-01515b286',
  github: 'https://github.com/sakshampandey1901',
};

export const ABOUT = {
  name: 'Saksham Pandey',
  title: 'Full Stack Developer',
  education: 'Georgia State University — Information Technology',
  summary:
    'I build production web apps end to end and spend the rest of my time on applied ML — RAG systems, decision engines, and FastAPI services that hold up outside a notebook.',
  focusAreas: ['RAG systems', 'Decision engines', 'FastAPI', 'Production web apps', 'ML'],
};

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: 'Repped Sports',
    role: 'Web Developer (Full Stack)',
    period: 'Jul 2025 – Oct 2025',
    location: 'Remote',
    bullets: [
      'Built marketplace features across a Next.js front end and Node/Express services.',
      'Designed REST APIs backed by PostgreSQL and MongoDB.',
    ],
  },
  {
    company: 'Georgia State University',
    role: 'Research Assistant',
    period: 'Oct 2024 – May 2025',
    location: 'Atlanta, GA',
    bullets: [
      'Computational modeling with SPARTAN.',
      'Data analysis and visualization in Python and MATLAB.',
    ],
  },
  {
    company: 'Community',
    role: 'CodePath Scholar · Alumni Association Leadership',
    period: '',
    location: '',
    bullets: [
      'Completed CodePath coursework as a selected scholar.',
      'Led student outreach initiatives with the GSU Alumni Association.',
    ],
  },
];

export interface Project {
  name: string;
  tagline: string;
  bullets: string[];
}

export const PROJECTS: Project[] = [
  {
    name: 'StockFlow',
    tagline: 'Human-in-the-loop inventory recommendations',
    bullets: [
      'FastAPI backend with SQLite in WAL mode for concurrent reads.',
      'Champion/challenger policies keep a human approving every recommendation.',
    ],
  },
  {
    name: 'Cite',
    tagline: 'Citation-first RAG cognitive assistant',
    bullets: [
      '85%+ retrieval accuracy with every answer grounded in citations.',
      'Pinecone vector search behind a Dockerized FastAPI service.',
    ],
  },
  {
    name: 'AI Academic Advisor',
    tagline: 'Deterministic rule-based degree advisor',
    bullets: [
      'Rule engine over GSU catalog data — recommendations are reproducible.',
      'Gemini rewrite layer turns rule output into natural advice.',
    ],
  },
];
