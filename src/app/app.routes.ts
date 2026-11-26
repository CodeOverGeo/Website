import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Giovanni Rufino | Practical AI Keynotes & Workshops',
    data: {
      description:
        'Practical AI keynotes, business workshops, and one-on-one walkthroughs taught by Giovanni Rufino, a software engineer and AI Chapter Lead at Relias.'
    },
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: 'consulting',
    title: 'Talks & Workshops | Giovanni Rufino',
    data: {
      description:
        'Keynote speeches, hands-on business workshops, and private one-on-one AI walkthroughs built around the work your team already does.'
    },
    loadComponent: () => import('./pages/consulting/consulting.component').then((m) => m.ConsultingComponent)
  },
  {
    path: 'speaking',
    title: 'AI Keynotes & Speaker Kit | Giovanni Rufino',
    data: {
      description:
        'Event organizer speaker kit for Giovanni Rufino: four AI keynote topics, 50/150/300-word speaker bios, headshots, and booking details.'
    },
    loadComponent: () => import('./pages/speaking/speaking.component').then((m) => m.SpeakingComponent)
  },
  {
    path: 'engineering',
    title: 'Engineering & Technical Background | Giovanni Rufino',
    data: {
      description:
        'Production software engineering background of Giovanni Rufino: .NET, Angular, Azure, MCP AI skills, Cortex Gold services, and shipped apps.'
    },
    loadComponent: () => import('./pages/engineering/engineering.component').then((m) => m.EngineeringComponent)
  },
  {
    path: 'writing',
    title: 'Writing & AI Explainers | Giovanni Rufino',
    data: {
      description:
        'Articles and plain-language explainers by Giovanni Rufino on practical AI habits, backend engineering, and developer workflows.'
    },
    loadComponent: () => import('./pages/writing/writing.component').then((m) => m.WritingComponent)
  },
  {
    path: 'contact',
    title: 'Contact & Booking | Giovanni Rufino',
    data: {
      description:
        'Book Giovanni Rufino for an AI keynote, business workshop, one-on-one walkthrough, or connect regarding engineering opportunities.'
    },
    loadComponent: () => import('./pages/contact/contact.component').then((m) => m.ContactComponent)
  },
  {
    path: 'terms',
    title: 'Giovanni Rufino | Terms and Conditions',
    data: {
      description:
        'Terms and Conditions for "AI Without the Hype: The Full Playbook," the ebook by Giovanni Rufino.'
    },
    loadComponent: () => import('./pages/terms/terms.component').then((m) => m.TermsComponent)
  },
  {
    path: 'privacy',
    title: 'Giovanni Rufino | Privacy Policy',
    data: {
      description:
        'How georufino.com, mentoring session bookings, and ebook sales handle your information.'
    },
    loadComponent: () => import('./pages/privacy/privacy.component').then((m) => m.PrivacyComponent)
  },
  // Transitional SPA redirects (CDN-edge HTTP 301s wired in firebase.json in #57)
  { path: 'dashboard', redirectTo: '', pathMatch: 'full' },
  { path: 'experience.cs', redirectTo: 'engineering', pathMatch: 'full' },
  { path: 'projects.py', redirectTo: 'engineering', pathMatch: 'full' },
  { path: 'about', redirectTo: 'engineering', pathMatch: 'full' },
  { path: 'about.json', redirectTo: 'engineering', pathMatch: 'full' },
  { path: 'blog.md', redirectTo: 'writing', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];
