import { inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

/**
 * Tracks whether the router has finished its first navigation.
 *
 * Components created during that first navigation are the ones covered by the
 * prerendered HTML, so they must render the same content the static file already
 * shows. Anything created afterwards is a genuine in-app navigation.
 */
@Injectable({ providedIn: 'root' })
export class NavigationStateService {
  private readonly router = inject(Router);
  private readonly firstNavigationDone = signal(false);

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(() => this.firstNavigationDone.set(true));
  }

  isInitialNavigation(): boolean {
    return !this.firstNavigationDone();
  }
}
