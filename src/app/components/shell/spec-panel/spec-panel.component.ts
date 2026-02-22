import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { interval, take } from 'rxjs';
import { PortfolioDataService } from '../../../services/portfolio-data.service';
import { ShellUiService } from '../../../services/shell-ui.service';

@Component({
  selector: 'app-spec-panel',
  standalone: true,
  imports: [],
  templateUrl: './spec-panel.component.html',
  styleUrl: './spec-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpecPanelComponent {
  private readonly router = inject(Router);
  private readonly dataService = inject(PortfolioDataService);
  private readonly shellUiService = inject(ShellUiService);

  readonly isOpen = this.shellUiService.isSpecPanelOpen;
  readonly route = signal('/dashboard');
  readonly content = signal('');

  readonly panelTitle = computed(() => `Spec • ${this.route()}`);

  constructor() {
    this.route.set(this.router.url || '/dashboard');

    effect(() => {
      if (this.isOpen()) {
        this.loadSpec();
      }
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

  close(): void {
    this.shellUiService.closeSpecPanel();
  }

  loadSpec(): void {
    this.dataService.getSpecData(this.route()).subscribe((spec) => {
      this.content.set('');
      interval(14)
        .pipe(take(spec.length))
        .subscribe((index) => this.content.set(spec.slice(0, index + 1)));
    });
  }
}
