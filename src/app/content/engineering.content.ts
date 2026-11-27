import { Certification, EngineeringProject } from './content.models';

/**
 * Notion › Positioning & Page Copy › Engineering Background (`/engineering`) Copy. Locked 2026-11-26 (#46).
 * This page is technical credibility for the teaching, not a build-for-hire offer.
 */

export const ENGINEERING_INTRO =
  'My talks come from daily engineering work. I build production software at Relias with .NET, Angular and Azure, and I serve as an AI Chapter Lead there. This page is the technical record behind the teaching.';

export const ENGINEERING_PROJECTS: readonly EngineeringProject[] = [
  {
    title: 'Refinement AI skill',
    summary:
      'MCP-based AI skills that read technical docs, compare repository context, and draft user stories with Gherkin acceptance criteria for faster refinements.'
  },
  {
    title: 'Backend APIs for AI initiatives',
    summary: 'Delivered APIs at Relias and cut response times from 10 seconds to under 1.5 seconds.'
  },
  {
    title: 'Service quality and feature flags',
    summary:
      'Took a microservice to "Gold" status in Cortex for observability and quality, and became a go-to LaunchDarkly resource who trained teams during architecture migrations.'
  },
  {
    title: 'ExtraPair',
    summary:
      'A native iOS and iPadOS app, live on the App Store, that helps parents keep daycare supplies stocked, with shared iCloud lists and Home Screen widgets.'
  }
];

export const CORE_STACK: readonly string[] = [
  'C#',
  '.NET',
  'Angular',
  'TypeScript',
  'SQL',
  'Azure',
  'Swift and SwiftUI',
  'MCP'
];

export const CERTIFICATIONS: readonly Certification[] = [
  { code: 'AZ-900', name: 'Azure Fundamentals', year: 2023 },
  { code: 'AZ-204', name: 'Azure Developer Associate', year: 2024 },
  { code: 'AI-900', name: 'Azure AI Fundamentals', year: 2024 }
];
