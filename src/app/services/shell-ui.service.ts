import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ShellUiService {
  readonly isSpecPanelOpen = signal(false);
  readonly isCommandPaletteOpen = signal(false);

  openSpecPanel(): void {
    this.isSpecPanelOpen.set(true);
  }

  closeSpecPanel(): void {
    this.isSpecPanelOpen.set(false);
  }

  toggleCommandPalette(): void {
    this.isCommandPaletteOpen.update(v => !v);
  }

  closeCommandPalette(): void {
    this.isCommandPaletteOpen.set(false);
  }
}
