import { Headshot, SpeakerReel, SpeakingEngagement } from './content.models';

/** Notion › Speaker Kit & Media Vault › Media & Proof Assets › Past speaking engagements. */
export const SPEAKING_ENGAGEMENTS: readonly SpeakingEngagement[] = [
  {
    title: '"Putting AI to Work for You!"',
    detail: 'Online keynote for the Mitchell Community College Small Business Center, October 30, 2026',
    href: 'https://www.ncsbc.net/workshop.aspx?ekey=330460078'
  },
  {
    title: 'Internal AI walkthroughs',
    detail: 'For Relias departments'
  }
];

/**
 * Downloadable speaker media. Both are still unchecked in Notion, so these are empty and the
 * /speaking media section stays off the page. Add the files under `public/media/` and fill these in
 * to turn it on. Ask before adding any partner logos.
 */
export const HEADSHOTS: readonly Headshot[] = [];
export const SPEAKER_REEL: SpeakerReel | null = null;
