import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./pages/boot-sequence/boot-sequence.component').then((m) => m.BootSequenceComponent)
	},
	{
		path: 'dashboard',
		title: 'Giovanni Rufino | Dashboard',
		loadComponent: () => import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent)
	},
	{
		path: 'experience.cs',
		title: 'Giovanni Rufino | Experience',
		loadComponent: () => import('./pages/experience/experience.component').then((m) => m.ExperienceComponent)
	},
	{
		path: 'projects.py',
		title: 'Giovanni Rufino | Projects',
		loadComponent: () => import('./pages/projects/projects.component').then((m) => m.ProjectsComponent)
	},
	{
		path: 'about',
		title: 'Giovanni Rufino | About',
		loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent)
	},
	{
		path: 'about.json',
		redirectTo: 'about'
	},
	{
		path: 'blog.md',
		title: 'Giovanni Rufino | Blog',
		loadComponent: () => import('./pages/blog/blog.component').then((m) => m.BlogComponent)
	},
	{
		path: '**',
		redirectTo: 'dashboard'
	}
];
