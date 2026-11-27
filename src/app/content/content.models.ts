/**
 * Shapes for the site copy in `src/app/content/`.
 * Source of truth for the copy itself is the Notion "georufino.com Redesign Hub"
 * (local backup: `docs/notion-redesign-hub.md`). Change copy there first.
 */

/** One of the three paid teaching offers. Talks and teaching only, never build work. */
export interface Offer {
  readonly id: 'keynote' | 'workshop' | 'walkthrough';
  readonly title: string;
  readonly scope: string;
  readonly deliverables: string;
  readonly idealClient: string;
}

export interface Keynote {
  readonly id: string;
  readonly title: string;
  readonly idealAudience: string;
  readonly abstract: string;
  readonly takeaways: readonly [string, string, string];
}

export interface SpeakerBio {
  readonly id: 'short' | 'standard' | 'extended';
  readonly label: string;
  /** Target word count from Notion (50 / 150 / 300). */
  readonly targetWords: number;
  /** One string per paragraph. */
  readonly paragraphs: readonly string[];
}

/** A credential line. `lead` renders bold; `href` makes the whole line a link. */
export interface ProofPoint {
  readonly lead: string;
  readonly detail: string;
  readonly href?: string;
}

export interface EngineeringProject {
  readonly title: string;
  readonly summary: string;
}

export interface Certification {
  readonly code: string;
  readonly name: string;
  readonly year: number;
}

export interface SpeakingEngagement {
  readonly title: string;
  readonly detail: string;
  readonly href?: string;
}

export interface Headshot {
  readonly label: string;
  /** Path under `public/`, e.g. `/media/giovanni-rufino-portrait.jpg`. */
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

export interface SpeakerReel {
  readonly title: string;
  /** Privacy-friendly embed URL, e.g. `https://www.youtube-nocookie.com/embed/<id>`. */
  readonly embedUrl: string;
}
