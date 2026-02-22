import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-status-bar',
  standalone: true,
  imports: [],
  templateUrl: './status-bar.component.html',
  styleUrl: './status-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusBarComponent {
  private readonly router = inject(Router);
  readonly currentRoute = signal('/dashboard');

  readonly showBar = computed(() => this.currentRoute() !== '/');

  constructor() {
    this.currentRoute.set(this.router.url || '/dashboard');
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute.set(event.urlAfterRedirects);
      }
    });
  }
}
