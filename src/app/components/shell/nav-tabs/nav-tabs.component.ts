import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';

type TabItem = { label: string; route: string; extClass: string };

@Component({
  selector: 'app-nav-tabs',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-tabs.component.html',
  styleUrl: './nav-tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavTabsComponent {
  private readonly router = inject(Router);
  readonly currentRoute = signal(this.router.url || '/');
  readonly isMenuOpen = signal(false);

  readonly tabs: TabItem[] = [
    { label: '~/dashboard', route: '/dashboard', extClass: 'file-home' },
    { label: 'experience.cs', route: '/experience.cs', extClass: 'file-cs' },
    { label: 'projects.py', route: '/projects.py', extClass: 'file-py' },
    { label: 'about.json', route: '/about', extClass: 'file-json' }
  ];

  readonly showTabs = computed(() => this.currentRoute() !== '/');

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute.set(event.urlAfterRedirects);
        this.isMenuOpen.set(false);
      }
    });
  }

  toggleMenu(): void {
    this.isMenuOpen.update((value) => !value);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
