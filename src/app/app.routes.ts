import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./pages/boot-sequence/boot-sequence.component').then((m) => m.BootSequenceComponent)
	},
	{
		path: 'dashboard',
		loadComponent: () => import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent)
	},
	{
		path: 'experience.cs',
		loadComponent: () => import('./pages/experience/experience.component').then((m) => m.ExperienceComponent)
	},
	{
		path: 'projects.py',
		loadComponent: () => import('./pages/projects/projects.component').then((m) => m.ProjectsComponent)
	},
	{
		path: 'about',
		loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent)
	},
	{
		path: 'about.json',
		redirectTo: 'about'
	},
	{
		path: '**',
		redirectTo: 'dashboard'
	}
];
