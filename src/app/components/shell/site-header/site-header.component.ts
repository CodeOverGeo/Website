import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';

export interface PrimaryNavItem {
  readonly label: string;
  readonly route: string;
  readonly exact?: boolean;
}

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './site-header.component.html',
  styleUrl: './site-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteHeaderComponent {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  private readonly headerEl = viewChild<ElementRef<HTMLElement>>('headerRoot');
  private readonly innerEl = viewChild<ElementRef<HTMLElement>>('headerInner');
  private readonly menuEl = viewChild<ElementRef<HTMLElement>>('siteMenu');

  readonly isWide = signal(true);
  readonly isMeasuring = signal(false);

  readonly navItems: readonly PrimaryNavItem[] = [
    { label: 'Home', route: '/', exact: true },
    { label: 'Speaking', route: '/speaking' },
    { label: 'Talks & Workshops', route: '/consulting' },
    { label: 'Engineering', route: '/engineering' },
    { label: 'Writing', route: '/writing' }
  ];

  constructor() {
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.closePopoverIfOpen());

    afterNextRender(() => {
      this.setupResponsiveNav();
    });
  }

  private closePopoverIfOpen(): void {
    const menu = this.menuEl()?.nativeElement;
    if (!menu || !menu.hasAttribute('popover')) return;
    try {
      const open = menu.matches(':popover-open') || menu.classList.contains(':popover-open');
      if (open && typeof (menu as HTMLElement & { hidePopover?: () => void }).hidePopover === 'function') {
        (menu as HTMLElement & { hidePopover: () => void }).hidePopover();
      }
    } catch {
      // Ignore environments (e.g. jsdom) that lack :popover-open selector support
    }
  }

  private setupResponsiveNav(): void {
    const header = this.headerEl()?.nativeElement;
    const inner = this.innerEl()?.nativeElement;
    const menu = this.menuEl()?.nativeElement;
    if (!header || !inner || !menu || typeof ResizeObserver === 'undefined') {
      return;
    }

    if (typeof HTMLElement !== 'undefined' && !Object.hasOwn(HTMLElement.prototype, 'popover')) {
      const cdnUrl = 'https://unpkg.com/@oddbird/popover-polyfill@latest/dist/popover.min.js';
      import(/* @vite-ignore */ cdnUrl).catch(() => undefined);
    }

    let lastCollapsedWidth = 0;

    const syncLayout = (): void => {
      const currentlyWide = header.classList.contains('is-wide');
      const width = header.clientWidth;

      if (!currentlyWide && width <= lastCollapsedWidth) {
        return;
      }

      let wasOpen = false;
      if (!currentlyWide && menu.hasAttribute('popover')) {
        try {
          wasOpen = menu.matches(':popover-open') || menu.classList.contains(':popover-open');
        } catch {
          wasOpen = false;
        }
      }

      this.isMeasuring.set(true);
      header.classList.add('is-measuring', 'is-wide');
      menu.removeAttribute('popover');

      const fits = inner.scrollWidth <= inner.clientWidth;

      if (fits) {
        lastCollapsedWidth = 0;
        this.isWide.set(true);
      } else {
        header.classList.remove('is-wide');
        menu.setAttribute('popover', 'auto');
        lastCollapsedWidth = width;
        this.isWide.set(false);
        if (wasOpen && typeof (menu as HTMLElement & { showPopover?: () => void }).showPopover === 'function') {
          try {
            (menu as HTMLElement & { showPopover: () => void }).showPopover();
          } catch {
            // Ignore top-layer timing edge cases
          }
        }
      }

      requestAnimationFrame(() => {
        header.classList.remove('is-measuring');
        this.isMeasuring.set(false);
      });
    };

    const ro = new ResizeObserver(() => syncLayout());
    ro.observe(header);
    ro.observe(menu);
    syncLayout();

    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(() => syncLayout()).catch(() => undefined);
    }

    this.destroyRef.onDestroy(() => ro.disconnect());
  }
}
