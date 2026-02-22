import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PortfolioDataService } from '../../../services/portfolio-data.service';
import { CommandPaletteItem } from '../../../models/portfolio.models';
import { ShellUiService } from '../../../services/shell-ui.service';

@Component({
  selector: 'app-command-palette',
  standalone: true,
  imports: [],
  templateUrl: './command-palette.component.html',
  styleUrl: './command-palette.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown)': 'onDocumentKeydown($event)'
  }
})
export class CommandPaletteComponent {
  private readonly router = inject(Router);
  private readonly dataService = inject(PortfolioDataService);
  private readonly shellUiService = inject(ShellUiService);

  readonly isOpen = signal(false);
  readonly query = signal('');
  readonly selectedIndex = signal(0);
  readonly items = signal<CommandPaletteItem[]>([]);

  readonly filteredItems = computed(() => {
    const value = this.query().toLowerCase().trim();
    if (!value) {
      return this.items();
    }

    return this.items()
      .map((item) => ({ item, score: this.getItemScore(item, value) }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((entry) => entry.item);
  });

  constructor() {
    this.dataService.getCommandPaletteItems().subscribe((items) => this.items.set(items));
  }

  onDocumentKeydown(event: KeyboardEvent): void {
    const isPaletteShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
    if (isPaletteShortcut) {
      event.preventDefault();
      this.toggleOpen();
      return;
    }

    if (!this.isOpen()) {
      return;
    }

    if (event.key === 'Escape') {
      this.close();
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.selectedIndex.update((value) => Math.min(value + 1, Math.max(this.filteredItems().length - 1, 0)));
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.selectedIndex.update((value) => Math.max(value - 1, 0));
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      const item = this.filteredItems()[this.selectedIndex()];
      if (item) {
        this.execute(item);
      }
    }
  }

  onQueryInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.query.set(target.value);
    this.selectedIndex.set(0);
  }

  execute(item: CommandPaletteItem): void {
    if (item.label === 'ai --verify-specs') {
      this.shellUiService.openSpecPanel();
      this.close();
      return;
    }

    this.router.navigate([item.route]);
    this.close();
  }

  close(): void {
    this.isOpen.set(false);
    this.query.set('');
    this.selectedIndex.set(0);
  }

  private toggleOpen(): void {
    this.isOpen.update((value) => !value);
    if (!this.isOpen()) {
      this.query.set('');
      this.selectedIndex.set(0);
    }
  }

  private getItemScore(item: CommandPaletteItem, query: string): number {
    const label = item.label.toLowerCase();
    const keywordText = item.keywords.join(' ').toLowerCase();

    if (label === query) {
      return 100;
    }

    if (label.startsWith(query)) {
      return 80;
    }

    if (label.includes(query)) {
      return 60;
    }

    if (keywordText.includes(query)) {
      return 45;
    }

    let sequenceIdx = 0;
    for (const char of label) {
      if (char === query[sequenceIdx]) {
        sequenceIdx += 1;
        if (sequenceIdx === query.length) {
          return 25;
        }
      }
    }

    return 0;
  }
}
