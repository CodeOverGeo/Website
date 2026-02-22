import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  AboutSection,
  CommandPaletteItem,
  ExperienceCommit,
  HeroProfile,
  Project,
  SocialLinks,
  TerminalLine
} from '../models/portfolio.models';

const SOCIAL_LINKS: SocialLinks = {
  linkedin: 'https://linkedin.com/in/giovannirufino',
  x: 'https://x.com/CodeOverGeo',
  github: 'https://github.com/CodeOverGeo'
};

const HERO: HeroProfile = {
  name: 'Giovanni Rufino',
  title: 'Software Engineer',
  location: 'Raleigh-Durham-Chapel Hill Area',
  tagline: 'Building scalable backend systems, AI-assisted workflows, and polished developer experiences.'
};

const EXPERIENCE: ExperienceCommit[] = [
  {
    hash: 'f1a2b3c',
    date: 'Dec 2025 - Present',
    role: 'Software Engineer',
    company: 'Company',
    description: 'Created MCP-based AI skills that read technical docs, compare repository context, and generate user stories with Gherkin acceptance criteria for faster refinements.',
    branch: 'feature/ai-refinements',
    isMerge: false,
    skills: ['MCP', 'AI', 'Gherkin', 'Refinement', 'TypeScript']
  },
  {
    hash: 'a1b2c3d',
    date: 'Oct 2024 - Present',
    role: 'Software Engineer',
    company: 'Company',
    description: 'Delivered backend APIs for AI initiatives, optimized performance from 10s to <1.5s, and advanced observability and quality standards.',
    branch: 'main',
    isMerge: false,
    skills: ['C#', '.NET', 'SQL', 'Angular', 'Observability']
  },
  {
    hash: 'c5d6e7f',
    date: '2023 - 2024',
    role: 'DevOps Evangelist & Feature Flag Enablement',
    company: 'Company',
    description: 'Became a go-to LaunchDarkly resource, trained teams, and supported architecture migrations with practical implementation guidance.',
    branch: 'feature/devops',
    isMerge: true,
    skills: ['LaunchDarkly', 'DevOps', 'Azure', 'Microservices', 'Training']
  },
  {
    hash: 'e4f5g6h',
    date: 'Jul 2022 - Oct 2024',
    role: 'Associate Software Engineer',
    company: 'Company',
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
    title: 'AI Refinement MCP Server',
    description: 'Reads technical documents, compares repo context, and drafts refined user stories with Gherkin acceptance criteria.',
    stack: ['TypeScript', 'MCP', 'AI', 'Gherkin'],
    featured: true,
    specData: 'Given technical documentation is loaded, when repository context is compared, then structured user stories and acceptance criteria are generated.'
  },
  {
    title: 'Atlassian MCP Integration',
    description: 'Connected MCP workflows with project tracking to improve backlog quality and handoff clarity.',
    stack: ['TypeScript', 'MCP', 'Atlassian'],
    featured: true,
    specData: 'Given a backlog item, when the integration runs, then delivery metadata is synchronized for planning.'
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
  professional: 'Software engineer focused on backend systems, platform enablement, and AI-assisted delivery. Recognized for cross-team collaboration, mentorship, and measurable impact.',
  personal: 'Builder mindset with a practical, team-first approach to solving complex technical problems.',
  certifications: [
    { name: 'AZ-204 Azure Developer Associate', issuer: 'Microsoft', date: '2024' },
    { name: 'AI-900 Azure AI Fundamentals', issuer: 'Microsoft', date: '2024' },
    { name: 'DP-203 Data Engineering on Azure', issuer: 'Udemy', date: '2024' },
    { name: 'Introduction to Software Engineering', issuer: 'IBM', date: '2025' },
    { name: 'Introduction to Mobile App Development', issuer: 'Coursera', date: '2025' }
  ],
  interests: ['AI Engineering', 'Backend Development', 'Cloud Architecture', 'Mentorship', 'Developer Productivity'],
  education: [
    'Springboard - Computer Software Engineering (2021-2022)',
    'Johnson & Wales University - AS Business Management (2000-2003)'
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

const COMMANDS: CommandPaletteItem[] = [
  { label: 'Open Dashboard', route: '/dashboard', icon: 'dashboard', keywords: ['home', 'hero'] },
  { label: 'Open Experience', route: '/experience.cs', icon: 'commit', keywords: ['timeline', 'git', 'career'] },
  { label: 'Open Projects', route: '/projects.py', icon: 'code', keywords: ['apps', 'portfolio', 'featured'] },
  { label: 'Open About', route: '/about', icon: 'data_object', keywords: ['bio', 'json', 'profile'] },
  { label: 'ai --verify-specs', route: '', icon: 'terminal', keywords: ['ai', 'spec', 'gherkin'] }
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
  getHero(): Observable<HeroProfile> {
    return of(HERO);
  }

  getExperience(): Observable<ExperienceCommit[]> {
    return of(EXPERIENCE);
  }

  getProjects(): Observable<Project[]> {
    return of(PROJECTS);
  }

  getAbout(): Observable<AboutSection> {
    return of(ABOUT);
  }

  getSocialLinks(): Observable<SocialLinks> {
    return of(SOCIAL_LINKS);
  }

  getTerminalSequence(): Observable<TerminalLine[]> {
    return of(TERMINAL_SEQUENCE);
  }

  getCommandPaletteItems(): Observable<CommandPaletteItem[]> {
    return of(COMMANDS);
  }

  getSpecData(view: string): Observable<string> {
    return of(SPEC_DATA[view] ?? 'Feature: Spec Verification\n  Scenario: Default\n    Given a route is opened\n    Then route-specific specification text is shown');
  }
}
