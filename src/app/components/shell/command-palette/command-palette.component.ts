import { afterNextRender, afterRenderEffect, ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, Injector, signal, viewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { PortfolioDataService } from '../../../services/portfolio-data.service';
import { CommandPaletteItem } from '../../../models/portfolio.models';
import { ShellUiService } from '../../../services/shell-ui.service';
import { captureFocusOrigin, restoreFocus, trapTab } from '../../../utils/focus-trap.util';

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

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);

  readonly paletteOptions = viewChildren<ElementRef<HTMLElement>>('paletteOption');

  /** Where focus sat before the palette opened, so close() can hand it back. */
  private focusOrigin: HTMLElement | null = null;

  readonly isOpen = signal(false);
  readonly query = signal('');
  readonly selectedIndex = signal(0);
  readonly items = this.dataService.commandPaletteItems;

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
    afterRenderEffect(() => {
      const idx = this.selectedIndex();
      const option = this.paletteOptions()[idx];
      option?.nativeElement.scrollIntoView({ block: 'nearest' });
    });

    effect(() => {
      if (this.shellUiService.isCommandPaletteOpen()) {
        this.open();
        this.shellUiService.closeCommandPalette();
      }
    });
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

    if (event.key === 'Tab') {
      const surface = this.surfaceElement();
      if (surface) {
        trapTab(event, surface);
      }
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
    if (item.actionId === 'MAILTO') {
      window.location.href = 'mailto:giovannirufino@gmail.com';
      this.close();
      return;
    }

    if (item.actionId === 'VERIFY_SPECS') {
      this.shellUiService.openSpecPanel();
      this.close();
      return;
    }

    if (item.actionId === 'DOWNLOAD_RESUME') {
      const link = document.createElement('a');
      link.href = '/Giovanni_Rufino_Resume.pdf';
      link.download = 'Giovanni_Rufino_Resume.pdf';
      link.click();
      this.close();
      return;
    }

    if (item.route) {
      this.router.navigate([item.route]);
    }
    this.close();
  }

  close(): void {
    if (!this.isOpen()) {
      return;
    }

    this.isOpen.set(false);
    this.query.set('');
    this.selectedIndex.set(0);

    const origin = this.focusOrigin;
    this.focusOrigin = null;
    restoreFocus(origin);
  }

  private open(): void {
    if (this.isOpen()) {
      return;
    }

    this.focusOrigin = captureFocusOrigin();
    this.isOpen.set(true);

    // The input does not exist until the render this call just triggered, so the
    // focus has to wait for it. Keying off the open transition rather than off
    // every render leaves the user's own focus moves inside the palette alone.
    afterNextRender(() => this.inputElement()?.focus(), { injector: this.injector });
  }

  /**
   * Read from the DOM rather than from a view query: both callers run at the
   * moment the palette is created, which is earlier than a query for an element
   * inside the `@if` block resolves.
   */
  private inputElement(): HTMLInputElement | null {
    return this.host.nativeElement.querySelector<HTMLInputElement>('.palette-input');
  }

  private surfaceElement(): HTMLElement | null {
    return this.host.nativeElement.querySelector<HTMLElement>('.palette');
  }

  private toggleOpen(): void {
    if (this.isOpen()) {
      this.close();
      return;
    }

    this.open();
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
