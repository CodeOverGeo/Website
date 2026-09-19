import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		title: 'Giovanni Rufino | Software Engineer',
		data: {
			description:
				'Giovanni Rufino is a Software Engineer in the Raleigh-Durham-Chapel Hill area building scalable backend systems, AI-assisted workflows, and polished developer experiences.'
		},
		loadComponent: () => import('./pages/boot-sequence/boot-sequence.component').then((m) => m.BootSequenceComponent)
	},
	{
		path: 'dashboard',
		title: 'Giovanni Rufino | Dashboard',
		data: {
			description:
				'Profile, stats, core strengths, and testimonials for Giovanni Rufino, a Software Engineer working on backend APIs, observability, and AI-assisted developer workflows.'
		},
		loadComponent: () => import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent)
	},
	{
		path: 'experience.cs',
		title: 'Giovanni Rufino | Experience',
		data: {
			description:
				'Work history of Giovanni Rufino as a git-style commit timeline: backend APIs and microservices at Relias, DevOps and feature-flag enablement, and AI-assisted refinement tooling.'
		},
		loadComponent: () => import('./pages/experience/experience.component').then((m) => m.ExperienceComponent)
	},
	{
		path: 'projects.py',
		title: 'Giovanni Rufino | Projects',
		data: {
			description:
				'Projects built by Giovanni Rufino, with the stack, problem, and outcome behind each one.'
		},
		loadComponent: () => import('./pages/projects/projects.component').then((m) => m.ProjectsComponent)
	},
	{
		path: 'about',
		title: 'Giovanni Rufino | About',
		data: {
			description:
				'About Giovanni Rufino: background, certifications, and interests behind the engineering work.'
		},
		loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent)
	},
	{
		path: 'about.json',
		redirectTo: 'about'
	},
	{
		path: 'blog.md',
		title: 'Giovanni Rufino | Blog',
		data: {
			description:
				'Writing by Giovanni Rufino on backend engineering, developer experience, and building with AI tooling.'
		},
		loadComponent: () => import('./pages/blog/blog.component').then((m) => m.BlogComponent)
	},
	{
		path: '**',
		redirectTo: 'dashboard'
	}
];
