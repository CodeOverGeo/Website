import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ShellUiService {
  readonly isSpecPanelOpen = signal(false);

  openSpecPanel(): void {
    this.isSpecPanelOpen.set(true);
  }

  closeSpecPanel(): void {
    this.isSpecPanelOpen.set(false);
  }
}
