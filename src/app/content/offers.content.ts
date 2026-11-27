import { Offer, ProofPoint } from './content.models';

/** Notion › Positioning & Page Copy › AI Consulting (`/consulting`) Copy. Locked 2026-11-26 (#46). */

export const CONSULTING_INTRO =
  'I teach people and teams how to use AI in the work they already do. Every session starts with your tools, your tasks and your questions, so people leave able to do something new the next morning.';

export const OFFERS: readonly Offer[] = [
  {
    id: 'keynote',
    title: 'Keynote Speeches',
    scope:
      'A talk built on one of my keynote topics, adjusted for your audience and event. Q&A is optional.',
    deliverables:
      'The talk, a one-page handout or the free /ai playbook for attendees, and a short follow-up resource list.',
    idealClient:
      'Conferences, Small Business Center events, chambers of commerce, company all-hands meetings and leadership offsites.'
  },
  {
    id: 'workshop',
    title: 'Business Workshops',
    scope:
      'A hands-on session built around the tools your team already has. We cover using AI safely, writing good prompts, checking the output, and doing real tasks from your own work during the session.',
    deliverables:
      'The session, practice exercises, a quick-reference sheet to keep, and a follow-up Q&A.',
    idealClient:
      'A department, a leadership team, or a small business staff that wants AI to be part of daily work.'
  },
  {
    id: 'walkthrough',
    title: 'One-on-One Walkthroughs',
    scope:
      'A private session on your own work. We go through your real tasks together, find the tools that fit your job, and cover the basics of safety and data handling.',
    deliverables: 'The session and a short written plan for what to try next.',
    idealClient:
      'An owner, executive or manager who wants private, paced help before rolling AI out to others.'
  }
];

export const HOW_IT_WORKS: readonly string[] = [
  'Send an inquiry through the contact page.',
  'We have a short call about your audience, goals and the tools you use.',
  'I tailor the talk or session to your group.',
  'You get the follow-up materials after the session.'
];

export const CONSULTING_PROOF_POINTS: readonly ProofPoint[] = [
  {
    lead: 'AI Chapter Lead at Relias,',
    detail: 'walking departments across the company through how to use AI in their jobs'
  },
  {
    lead: 'Gave the online keynote "Putting AI to Work for You!"',
    detail:
      'for the Mitchell Community College Small Business Center (October 2026), with Iredell County chambers of commerce as partners'
  },
  {
    lead: 'Author of the free AI Without the Hype starter playbook',
    detail: 'at /ai',
    href: '/ai'
  }
];

export const PRICING_RULE =
  'Prices are based on market value and are the same for every buyer.';
