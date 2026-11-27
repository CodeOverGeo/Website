import { SpeakerBio } from './content.models';

/**
 * Notion › Speaker Kit & Media Vault › Copy-Paste Speaker Bios. Locked 2026-11-26 (#46).
 * "Ten years" retail is a deliberate round number; do not recompute it from dates.
 */
export const SPEAKER_BIOS: readonly SpeakerBio[] = [
  {
    id: 'short',
    label: 'Short',
    targetWords: 50,
    paragraphs: [
      'Giovanni Rufino is a software engineer and AI Chapter Lead at Relias, where he walks departments through using AI in their daily work. Before software, he spent ten years leading retail and operations teams. He speaks to business owners and leaders about using AI practically and safely, without the hype.'
    ]
  },
  {
    id: 'standard',
    label: 'Standard',
    targetWords: 150,
    paragraphs: [
      'Giovanni Rufino is a software engineer and AI Chapter Lead at Relias. He builds production software with .NET, Angular and Azure. As AI Chapter Lead, he walks departments across the company through how to use AI tools in their own jobs, safely and well.',
      "Giovanni came to software after ten years leading retail and operations teams, including years as an assistant store manager at Lowe's. That background shapes how he teaches. He starts with the work people already do, not with the technology, and he explains AI in plain language.",
      'He gave the keynote "Putting AI to Work for You!" for the Mitchell Community College Small Business Center, and he wrote AI Without the Hype, a free starter playbook for owners and their teams. He holds Microsoft certifications in Azure development and Azure AI. Giovanni lives in North Carolina with his family and gives keynotes, workshops and one-on-one walkthroughs.'
    ]
  },
  {
    id: 'extended',
    label: 'Extended',
    targetWords: 300,
    paragraphs: [
      "Giovanni Rufino is a software engineer and AI Chapter Lead at Relias, where he builds production software with .NET, Angular and Azure. His recent work includes backend APIs for the company's AI initiatives and AI skills that help engineering teams turn technical documents into clear user stories. As AI Chapter Lead, he also walks departments across the company through how to use AI tools in their daily work.",
      "Giovanni spent ten years leading retail and operations teams. As an assistant store manager at Lowe's, he coached teams across service, logistics and store operations. Later, as a purchasing specialist at Creedmoor Forest Products, he helped raise operational uptime from 55 percent to 85 percent and led a safety program that passed 400 days without a recordable incident. He then completed an 800-hour software engineering program and joined Relias as an associate engineer in 2022.",
      'At Relias he became the go-to resource for feature flags, training teams during architecture migrations, before moving into AI work. He holds Microsoft certifications in Azure fundamentals, Azure development and Azure AI, and he builds his own apps, including ExtraPair, an iOS app for parents.',
      'That mix of operations and engineering shapes how Giovanni teaches. He knows that new technology only sticks when the people using it understand why it matters to their own work. His talks and workshops start with the tasks people already do, explain AI in plain language, and set simple rules for using it safely.',
      'He gave the keynote "Putting AI to Work for You!" for the Mitchell Community College Small Business Center, and he wrote AI Without the Hype, a free starter playbook for owners and their teams. Giovanni lives in North Carolina with his family. He offers keynote speeches, business workshops and one-on-one walkthroughs.'
    ]
  }
];
