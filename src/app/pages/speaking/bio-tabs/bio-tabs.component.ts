import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  signal,
  viewChildren
} from '@angular/core';
import { CopyButtonComponent } from '../../../components/shared/copy-button/copy-button.component';
import { SpeakerBio } from '../../../content/content.models';

export function countWords(paragraphs: readonly string[]): number {
  return paragraphs.join(' ').trim().split(/\s+/).length;
}

/**
 * Speaker bio tabs (DESIGN.md §5.5), following the WAI-ARIA tabs pattern:
 * roving tabindex, Left/Right/Home/End keys, tabs activate on focus.
 * Inactive panels use `hidden="until-found"` so find-in-page still reaches them;
 * a `beforematch` hit switches to that tab.
 */
@Component({
  selector: 'app-bio-tabs',
  standalone: true,
  imports: [CopyButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bio-tablist" role="tablist" aria-label="Speaker bio length" (keydown)="onKeydown($event)">
      @for (bio of bios(); track bio.id; let i = $index) {
        <button
          #tab
          type="button"
          role="tab"
          class="bio-tab"
          [id]="'bio-tab-' + bio.id"
          [attr.aria-selected]="i === active()"
          [attr.aria-controls]="'bio-panel-' + bio.id"
          [tabIndex]="i === active() ? 0 : -1"
          (click)="select(i)"
        >
          {{ bio.label }} <span class="mono">({{ bio.targetWords }} words)</span>
        </button>
      }
    </div>

    @for (bio of bios(); track bio.id; let i = $index) {
      <div
        role="tabpanel"
        class="bio-panel"
        [id]="'bio-panel-' + bio.id"
        [attr.aria-labelledby]="'bio-tab-' + bio.id"
        [attr.hidden]="i === active() ? null : 'until-found'"
        (beforematch)="select(i)"
      >
        <div class="bio-panel-card">
          <div class="bio-panel-header">
            <span class="bio-word-badge mono">{{ wordCount(bio) }} words</span>
            <app-copy-button [text]="plainText(bio)" [label]="'Copy ' + bio.label.toLowerCase() + ' bio'" />
          </div>
          <div class="prose">
            @for (paragraph of bio.paragraphs; track $index) {
              <p>{{ paragraph }}</p>
            }
          </div>
        </div>
      </div>
    }
  `,
  styles: `
    :host {
      display: block;
      margin-block-start: 2rem;
    }

    .bio-tablist {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem clamp(1rem, 3vw, 1.5rem);
      border-block-end: 1px solid var(--border-subtle);
      margin-block-end: 1.5rem;
    }

    .bio-tab {
      min-block-size: 2.875rem;
      padding: 0.5rem 0.125rem;
      background: none;
      border: 0;
      border-block-end: 3px solid transparent;
      margin-block-end: -1px;
      color: var(--text-muted);
      font: inherit;
      font-weight: 700;
      cursor: pointer;

      .mono {
        font-size: 0.8125rem;
        font-weight: 400;
      }

      /* Keep all three tabs on one row at phone widths; the panel badge still shows the count. */
      @media (max-width: 36rem) {
        .mono {
          display: none;
        }
      }

      &:hover {
        color: var(--text-primary);
      }

      &[aria-selected='true'] {
        color: var(--text-primary);
        border-block-end-color: var(--accent-primary);
      }
    }

    .bio-panel[hidden] {
      pointer-events: none;
    }

    .bio-panel-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-card);
      padding: clamp(1.25rem, 3vw, 1.75rem);
    }

    .bio-panel-header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem 1rem;
      margin-block-end: 1rem;
    }

    .bio-word-badge {
      font-size: 0.8125rem;
      color: var(--accent-primary);
      padding: 0.2rem 0.75rem;
      border-radius: var(--radius-btn);
      background: var(--accent-soft);
      border: 1px solid var(--accent-border);
    }

    .prose p:last-child {
      margin-block-end: 0;
    }
  `
})
export class BioTabsComponent {
  readonly bios = input.required<readonly SpeakerBio[]>();

  protected readonly active = signal(0);
  private readonly tabs = viewChildren<ElementRef<HTMLButtonElement>>('tab');

  protected readonly wordCount = (bio: SpeakerBio) => countWords(bio.paragraphs);
  protected readonly plainText = (bio: SpeakerBio) => bio.paragraphs.join('\n\n');

  select(index: number): void {
    this.active.set(index);
  }

  onKeydown(event: KeyboardEvent): void {
    const last = this.bios().length - 1;
    const current = this.active();
    const next =
      event.key === 'ArrowRight' ? (current === last ? 0 : current + 1)
      : event.key === 'ArrowLeft' ? (current === 0 ? last : current - 1)
      : event.key === 'Home' ? 0
      : event.key === 'End' ? last
      : null;
    if (next === null) return;
    event.preventDefault();
    this.select(next);
    this.tabs()[next]?.nativeElement.focus();
  }
}
