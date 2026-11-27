import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  inject,
  input,
  signal
} from '@angular/core';

let nextId = 0;

/**
 * One-click clipboard copy (DESIGN.md §5.5). The result is announced through a polite
 * `role="status"` region and shown with an icon swap, never by colour alone.
 */
@Component({
  selector: 'app-copy-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button type="button" class="btn copy-button" (click)="copy()" [attr.aria-describedby]="statusId">
      <span class="copy-icon" aria-hidden="true">{{ state() === 'copied' ? '✓' : '⧉' }}</span>
      <span>{{ label() }}</span>
    </button>
    <span class="copy-status" role="status" [id]="statusId" [class.is-visible]="message()">{{ message() }}</span>
  `,
  styles: `
    :host {
      display: inline-flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5rem 0.875rem;
    }

    .copy-icon {
      font-family: var(--font-mono);
      inline-size: 1em;
      text-align: center;
    }

    .copy-status {
      font-size: 0.875rem;
      color: var(--text-muted);
      opacity: 0;
      transition: opacity 150ms ease;
    }

    .copy-status.is-visible {
      opacity: 1;
    }

    @media (prefers-reduced-motion: reduce) {
      .copy-status {
        transition: none;
      }
    }
  `
})
export class CopyButtonComponent {
  readonly text = input.required<string>();
  readonly label = input<string>('Copy');
  readonly copiedMessage = input<string>('Copied to clipboard');

  protected readonly statusId = `copy-status-${nextId++}`;
  protected readonly state = signal<'idle' | 'copied' | 'failed'>('idle');
  protected readonly message = signal('');

  private readonly document = inject(DOCUMENT);
  private resetTimer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.resetTimer));
  }

  async copy(): Promise<void> {
    const clipboard = this.document.defaultView?.navigator.clipboard;
    try {
      if (!clipboard) throw new Error('Clipboard API unavailable');
      await clipboard.writeText(this.text());
      this.show('copied', this.copiedMessage());
    } catch {
      this.show('failed', "Couldn't copy. Select the text and copy it by hand.");
    }
  }

  private show(state: 'copied' | 'failed', message: string): void {
    this.state.set(state);
    this.message.set(message);
    clearTimeout(this.resetTimer);
    // Clearing the message lets screen readers announce it again on the next copy.
    this.resetTimer = setTimeout(() => {
      this.state.set('idle');
      this.message.set('');
    }, 3000);
  }
}
