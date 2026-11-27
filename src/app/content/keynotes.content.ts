import { Keynote } from './content.models';

/** Notion › Speaker Kit & Media Vault › Keynote Topics. Locked 2026-11-26 (#46). */
export const KEYNOTES: readonly Keynote[] = [
  {
    id: 'ai-without-the-hype',
    title: 'AI Without the Hype: What a Small Business Can Do Monday Morning',
    idealAudience: 'Small business owners, Small Business Center events, chambers of commerce',
    abstract:
      'Most AI advice is written for companies with tech teams and big budgets. Small businesses need something else: a few uses that save real time this week, with tools they may already pay for. In this talk, Giovanni Rufino walks through everyday tasks where AI helps a small business today, such as drafting customer emails, summarizing documents and planning the week. He also covers the limits: what not to share, how to check the answers, and when to skip AI entirely. Owners leave with a short list of things to try on Monday and a free starter playbook to keep.',
    takeaways: [
      'Three to five AI uses that fit a small business with no technical staff',
      'Simple rules for what information never goes into an AI tool',
      'A habit for checking AI output before it reaches a customer'
    ]
  },
  {
    id: 'curiosity-to-habit',
    title: 'From Curiosity to Habit: Getting a Whole Organization Using AI',
    idealAudience: 'Executives, HR and training leaders, operations heads',
    abstract:
      "Buying AI licenses is easy. Getting people to use them well is harder. Most rollouts stall after the first demo, because people can't see how AI fits their own job. As an AI Chapter Lead at Relias, Giovanni Rufino walks department after department through using AI in their daily work. This talk shares what he has learned: start with the tasks people already do, show results on their own work, give clear rules about data, and make it safe to ask basic questions. Leaders leave with a practical plan to move their teams from curiosity to everyday use.",
    takeaways: [
      'Why AI rollouts stall after the demo, and how to keep them going',
      'A department-by-department approach that starts from real work',
      'How to set clear data rules without scaring people away from the tools'
    ]
  },
  {
    id: 'sales-floor-to-codebase',
    title: 'From the Sales Floor to the Codebase',
    idealAudience: 'General conference keynotes, workforce development events, leadership events',
    abstract:
      "Giovanni Rufino spent ten years leading retail and operations teams, including years as an assistant store manager at Lowe's, before he became a software engineer. Today he helps teams at Relias adopt AI. This talk connects the two careers. On a sales floor, new systems only work when the people using them understand why and feel ready. The same is true for AI. Giovanni shares stories from both worlds and what they teach about introducing any new technology to people who are already busy. Audiences leave with a people-first way to lead change in their own organizations.",
    takeaways: [
      'Why people, not tools, decide whether new technology sticks',
      'Lessons from retail leadership that apply directly to AI adoption',
      'How career changers bring an advantage to technical work'
    ]
  },
  {
    id: 'trust-but-check',
    title: 'Trust, but Check: Using AI When Mistakes Are Expensive',
    idealAudience:
      'Compliance-minded industries, leadership teams, managers responsible for quality',
    abstract:
      'AI tools are fast and confident, and sometimes wrong. For teams where a mistake costs money, trust or safety, that is a real risk. In this talk, Giovanni Rufino, a software engineer and AI Chapter Lead at Relias, explains in plain language why AI makes mistakes and how to catch them. He covers what data should stay out of AI tools, how to check output before anyone relies on it, and how to write short, usable rules a team will follow. Leaders leave able to say yes to AI for the right tasks while keeping their people and customers safe.',
    takeaways: [
      'Why AI tools get things wrong, explained without jargon',
      'A simple checking routine for AI output in high-stakes work',
      'How to write a one-page AI use policy people will follow'
    ]
  }
];
