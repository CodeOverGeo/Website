import { Injectable, signal } from '@angular/core';
import {
  AboutSection,
  CommandPaletteItem,
  DossierStat,
  ExperienceCommit,
  HeroProfile,
  PowerRating,
  Project,
  SocialLinks,
  TerminalLine,
  Testimonial
} from '../models/portfolio.models';

const SOCIAL_LINKS: SocialLinks = {
  linkedin: 'https://linkedin.com/in/giovannirufino',
  x: 'https://x.com/CodeOverGeo',
  github: 'https://github.com/CodeOverGeo',
  email: 'mailto:giovannirufino@gmail.com'
};

const HERO: HeroProfile = {
  name: 'Giovanni Rufino',
  title: 'Software Engineer',
  location: 'Raleigh-Durham-Chapel Hill Area',
  tagline: 'Building scalable backend systems, AI-assisted workflows, and polished developer experiences.'
};

const EXPERIENCE: ExperienceCommit[] = [
  {
    hash: 'a9b8c7d',
    date: 'Nov 2025',
    role: 'Software Engineer',
    company: 'Relias',
    description: 'Achieved "Gold" status in Cortex for microservice, advancing observability and quality standards.',
    branch: 'release/gold-tier',
    isMerge: true,
    skills: ['C#', '.NET', 'Cortex', 'Observability', 'API Design']
  },
  {
    hash: 'f1a2b3c',
    date: 'Dec 2025 - Present',
    role: 'Software Engineer',
    company: 'Relias',
    description: 'Created MCP-based AI skills that read technical docs, compare repository context, and generate user stories with Gherkin acceptance criteria for faster refinements.',
    branch: 'feature/ai-refinements',
    isMerge: false,
    skills: ['MCP', 'AI', 'Gherkin', 'Refinement', 'TypeScript']
  },
  {
    hash: 'a1b2c3d',
    date: 'Oct 2024 - Present',
    role: 'Software Engineer',
    company: 'Relias',
    description: 'Delivered backend APIs for AI initiatives, optimized performance from 10s to <1.5s, and advanced observability and quality standards.',
    branch: 'main',
    isMerge: false,
    skills: ['C#', '.NET', 'SQL', 'Angular', 'Observability']
  },
  {
    hash: 'c5d6e7f',
    date: '2023 - 2024',
    role: 'DevOps Evangelist & Feature Flag Enablement',
    company: 'Relias',
    description: 'Became a go-to LaunchDarkly resource, trained teams, and supported architecture migrations with practical implementation guidance.',
    branch: 'feature/devops',
    isMerge: true,
    skills: ['LaunchDarkly', 'DevOps', 'Azure', 'Microservices', 'Training']
  },
  {
    hash: 'e4f5g6h',
    date: 'Jul 2022 - Oct 2024',
    role: 'Associate Software Engineer',
    company: 'Relias',
    description: 'Contributed to service-based architecture projects, cross-team collaboration, and client-impacting feature delivery.',
    branch: 'feature/backend',
    isMerge: false,
    skills: ['Microservices', 'Azure', 'CI/CD', 'Git', 'Agile']
  },
  {
    hash: 'i7j8k9l',
    date: '2021 - 2022',
    role: 'Software Engineering Student',
    company: 'Springboard',
    description: 'Completed an 800-hour software engineering curriculum covering full-stack web development and algorithms.',
    branch: 'feature/bootcamp',
    isMerge: true,
    skills: ['React', 'Node.js', 'Flask', 'PostgreSQL', 'JavaScript']
  },
  {
    hash: 'm0n1o2p',
    date: 'Jun 2019 - Jul 2022',
    role: 'Purchasing Specialist',
    company: 'Creedmoor Forest Products',
    description: 'Improved operational uptime from 55% to 85% and led a safety program exceeding 400 days without recordable incidents.',
    branch: 'feature/ops',
    isMerge: false,
    skills: ['Operations', 'Process Improvement', 'Safety', 'Leadership']
  },
  {
    hash: 'q3r4s5t',
    date: 'Sep 2011 - May 2019',
    role: 'Assistant Store Manager',
    company: "Lowe's Home Improvement",
    description: 'Managed store operations and coached teams across service, logistics, and execution responsibilities.',
    branch: 'feature/leadership',
    isMerge: false,
    skills: ['Team Leadership', 'Operations', 'Customer Service']
  }
];

const PROJECTS: Project[] = [
  {
    title: 'Vypto.org',
    description: 'Zero-knowledge architecture platform ensuring privacy-first interactions and secure data handling.',
    stack: ['Architecture', 'Zero-Knowledge Proofs', 'TypeScript'],
    featured: true,
    specData: 'Given user data, when verified via ZK proofs, then authenticity is confirmed without revealing the underlying information.'
  },
  {
    title: 'Fluck iOS App',
    description: 'Native iOS dual-profile application featuring secure Firebase authentication, real-time Firestore sync, and StoreKit 2 monetization.',
    stack: ['Swift', 'iOS', 'StoreKit', 'Firebase'],
    featured: true,
    specData: 'Given a connected couple, when navigating the app, then relationship milestones and activities are displayed.'
  },
  {
    title: 'Refinement AI Skill',
    description: 'Reads technical documents, compares repo context, and drafts refined user stories with Gherkin acceptance criteria.',
    stack: ['TypeScript', 'MCP', 'AI', 'Gherkin'],
    featured: true,
    specData: 'Given technical documentation is loaded, when repository context is compared, then structured user stories and acceptance criteria are generated.'
  },
  {
    title: 'Elimibug',
    description: 'Bug tracking SPA built with a modern full-stack JavaScript toolchain.',
    stack: ['React', 'Bootstrap', 'Node.js', 'PostgreSQL', 'Express'],
    featured: false,
    specData: 'Given a bug report, when details are saved, then the issue appears in the current sprint board.'
  },
  {
    title: 'Rate the Charge',
    description: 'EV charging station rating and comments platform.',
    stack: ['Flask', 'SQLAlchemy', 'Jinja', 'PostgreSQL', 'JavaScript'],
    featured: false,
    specData: 'Given a charging station, when users submit feedback, then aggregated ratings update instantly.'
  }
];

const ABOUT: AboutSection = {
  professional: 'I am an intentional, highly collaborative introvert who excels at building high-performing teams from the ground up. I hold multiple certifications (AZ-900, AZ-204, AI-900) and am proficient in Node.js, Python, C#, and .NET.',
  personal: "When I'm not writing code from my Mac, I'm likely hitting the road with my family for an amusement park trip or cabin camping, tackling a DIY home project, or cheering for the Kansas City Chiefs. I'm a massive EV enthusiast—always researching the latest in EV tech—and an avid PlayStation gamer.",
  certifications: [
    { name: 'AZ-900 Azure Fundamentals', issuer: 'Microsoft', date: '2023' },
    { name: 'AZ-204 Azure Developer Associate', issuer: 'Microsoft', date: '2024' },
    { name: 'AI-900 Azure AI Fundamentals', issuer: 'Microsoft', date: '2024' },
    { name: 'Introduction to Software Engineering', issuer: 'IBM', date: '2025' },
    { name: 'Introduction to Mobile App Development', issuer: 'Coursera', date: '2025' }
  ],
  interests: [
    'Node.js',
    'Python',
    'AI Engineering',
    'Cloud Architecture',
    'EV Optimization (Kia EV9)',
    'Cabin Camping',
    'DIY Home Projects',
    'Kansas City Chiefs',
    'PS5 Gaming'
  ],
  education: [
    'Johnson & Wales University - AS Business Management (2000-2003)',
    'Springboard - Computer Software Engineering (2021-2022)'
  ],
  socialLinks: SOCIAL_LINKS
};

const TERMINAL_SEQUENCE: TerminalLine[] = [
  { prefix: '[init]', text: 'Loading portfolio runtime...', type: 'init' },
  { prefix: '[load]', text: 'Mounting components... ✓', type: 'load' },
  { prefix: '[load]', text: 'Injecting services... ✓', type: 'load' },
  { prefix: '[pass]', text: 'AI skills online', type: 'pass' },
  { prefix: '[ok]', text: 'Specs verified', type: 'ok' },
  { prefix: '[exec]', text: 'Navigating to ~/dashboard...', type: 'exec' }
];

const DOSSIER_STATS: DossierStat[] = [
  { label: 'Years Active', value: '4+' },
  { label: 'Tests Passed', value: '626' },
  { label: 'Certifications', value: '8' },
  { label: 'Proficient Languages', value: '6' }
];

const AVAILABILITY = { status: 'active' as const, label: 'Available for Opportunities' };

const POWERS: PowerRating[] = [
  { name: 'C# / .NET', level: 10, category: 'backend' },
  { name: 'Node.js', level: 8, category: 'backend' },
  { name: 'Python', level: 8, category: 'backend' },
  { name: 'Angular', level: 8, category: 'frontend' },
  { name: 'TypeScript', level: 9, category: 'frontend' },
  { name: 'Azure Cloud', level: 7, category: 'cloud' },
  { name: 'Cosmos DB', level: 9, category: 'data' },
  { name: 'SQL / Postgres', level: 8, category: 'data' },
  { name: 'CI/CD Pipelines', level: 8, category: 'devops' },
  { name: 'Docker', level: 7, category: 'devops' },
  { name: 'Swift', level: 7, category: 'mobile' }
];

const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'Relationship building is one of his strengths upon which he capitalizes. He turned a potential negative into a positive relationship building opportunity.',
    author: 'Barnell Bohusk',
    role: 'Engineering Lead',
    year: 2023
  },
  {
    quote: 'He has built strong relationships across multiple teams and departments, demonstrating exceptional communication and collaboration skills. An outstanding mentor and collaborator.',
    author: 'Layla Miller',
    role: 'Senior Manager',
    year: 2024
  },
  {
    quote: 'His willingness to step up was especially evident in the chatbot project. Their efforts not only led to a successful outcome but also earned well-deserved recognition from senior management.',
    author: 'Guido Carosella',
    role: 'Director of Engineering',
    year: 2024
  },
  {
    quote: 'Achieving Gold status for the API, one of only four repositories out of sixty-three to reach this level, speaks volumes about your dedication to quality.',
    author: 'Clarice Ferguson',
    role: 'VP of Engineering',
    year: 2025
  }
];

const COMMANDS: CommandPaletteItem[] = [
  { label: 'Open Dashboard', route: '/dashboard', icon: 'dashboard', keywords: ['home', 'hero'] },
  { label: 'Open Experience', route: '/experience.cs', icon: 'commit', keywords: ['timeline', 'git', 'career'] },
  { label: 'Open Projects', route: '/projects.py', icon: 'code', keywords: ['apps', 'portfolio', 'featured'] },
  { label: 'Open About', route: '/about', icon: 'data_object', keywords: ['bio', 'json', 'profile'] },
  { label: 'Contact Giovanni', actionId: 'MAILTO', icon: 'mail', keywords: ['email', 'contact', 'message', 'hire'] },
  { label: 'ai --verify-specs', actionId: 'VERIFY_SPECS', icon: 'terminal', keywords: ['ai', 'spec', 'gherkin'] }
];

const SPEC_DATA: Record<string, string> = {
  '/dashboard': 'Feature: Portfolio Dashboard\n  Scenario: Render hero profile\n    Given profile data is available\n    When dashboard loads\n    Then hero summary and quick links are visible',
  '/experience.cs': 'Feature: Experience Timeline\n  Scenario: Show commit history\n    Given experience commits are loaded\n    When the user opens experience.cs\n    Then git-style nodes and branch metadata are displayed',
  '/projects.py': 'Feature: Project Showcase\n  Scenario: Highlight featured project\n    Given projects are loaded\n    When projects view renders\n    Then featured cards appear first with stack badges',
  '/about': 'Feature: About JSON Viewer\n  Scenario: Toggle JSON modes\n    Given about data is loaded\n    When formatted mode is toggled\n    Then structured and raw JSON views are available',
  '/about.json': 'Feature: About JSON Viewer\n  Scenario: Toggle JSON modes\n    Given about data is loaded\n    When formatted mode is toggled\n    Then structured and raw JSON views are available'
};

@Injectable({ providedIn: 'root' })
export class PortfolioDataService {
  readonly hero = signal(HERO);
  readonly experience = signal(EXPERIENCE);
  readonly projects = signal(PROJECTS);
  readonly about = signal(ABOUT);
  readonly socialLinks = signal(SOCIAL_LINKS);
  readonly terminalSequence = signal(TERMINAL_SEQUENCE);
  readonly commandPaletteItems = signal(COMMANDS);
  readonly dossierStats = signal(DOSSIER_STATS);
  readonly availability = signal(AVAILABILITY);
  readonly powers = signal(POWERS);
  readonly testimonials = signal(TESTIMONIALS);

  getSpecData(view: string): string {
    return SPEC_DATA[view] ?? 'Feature: Spec Verification\n  Scenario: Default\n    Given a route is opened\n    Then route-specific specification text is shown';
  }
}
