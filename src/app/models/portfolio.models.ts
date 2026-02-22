export interface HeroProfile {
  name: string;
  title: string;
  location: string;
  tagline: string;
}

export interface SocialLinks {
  linkedin: string;
  x: string;
  github: string;
}

export interface ExperienceCommit {
  hash: string;
  date: string;
  role: string;
  description: string;
  branch: string;
  isMerge: boolean;
  company: string;
  skills: string[];
}

export interface Project {
  title: string;
  description: string;
  stack: string[];
  featured: boolean;
  specData: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface AboutSection {
  professional: string;
  personal: string;
  certifications: Certification[];
  interests: string[];
  socialLinks: SocialLinks;
  education: string[];
}

export type TerminalLineType = 'init' | 'load' | 'pass' | 'ok' | 'exec';

export interface TerminalLine {
  prefix: string;
  text: string;
  type: TerminalLineType;
}

export interface CommandPaletteItem {
  label: string;
  route: string;
  icon: string;
  keywords: string[];
}
