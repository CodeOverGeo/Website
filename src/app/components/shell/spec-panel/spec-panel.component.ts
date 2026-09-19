import { afterNextRender, ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, Injector, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { interval, Subscription, take } from 'rxjs';
import { PortfolioDataService } from '../../../services/portfolio-data.service';
import { ShellUiService } from '../../../services/shell-ui.service';
import { captureFocusOrigin, restoreFocus } from '../../../utils/focus-trap.util';

@Component({
  selector: 'app-spec-panel',
  standalone: true,
  imports: [],
  templateUrl: './spec-panel.component.html',
  styleUrl: './spec-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'onEscape()'
  }
})
export class SpecPanelComponent {
  private readonly router = inject(Router);
  private readonly dataService = inject(PortfolioDataService);
  private readonly shellUiService = inject(ShellUiService);

  readonly isOpen = this.shellUiService.isSpecPanelOpen;
  readonly route = signal('/dashboard');
  readonly content = signal('');

  readonly panelTitle = computed(() => `Spec • ${this.route()}`);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);

  private typewriterSubscription?: Subscription;

  /** Where focus sat before the panel opened, so closing can hand it back. */
  private focusOrigin: HTMLElement | null = null;

  /** Mirrors isOpen() so the effect can tell an open transition from a close one. */
  private wasOpen = false;

  constructor() {
    this.route.set(this.router.url || '/dashboard');

    // The panel is opened from the command palette as well as from its own
    // trigger, so focus handling lives with the open/close transition rather
    // than with any one caller.
    effect(() => {
      const open = this.isOpen();
      if (open === this.wasOpen) {
        return;
      }
      this.wasOpen = open;

      if (open) {
        this.focusOrigin = captureFocusOrigin();
        this.loadSpec();
        // The panel only exists from the render this open triggers onward.
        afterNextRender(
          () => this.host.nativeElement.querySelector<HTMLButtonElement>('.close-btn')?.focus(),
          { injector: this.injector },
        );
        return;
      }

      const origin = this.focusOrigin;
      this.focusOrigin = null;
      restoreFocus(origin);
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.route.set(event.urlAfterRedirects);
        if (this.isOpen()) {
          this.loadSpec();
        }
      }
    });
  }

  onEscape(): void {
    if (this.isOpen()) {
      this.close();
    }
  }

  close(): void {
    this.shellUiService.closeSpecPanel();
  }

  loadSpec(): void {
    this.typewriterSubscription?.unsubscribe();
    const spec = this.dataService.getSpecData(this.route());
    this.content.set('');
    this.typewriterSubscription = interval(14)
      .pipe(take(spec.length))
      .subscribe((index) => this.content.set(spec.slice(0, index + 1)));
  }
}
