import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Keynote } from '../../../content/content.models';

/** Bento card for one keynote: number, title, audience, abstract, three takeaways (DESIGN.md §5.4). */
@Component({
  selector: 'app-keynote-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'surface-card' },
  template: `
    <div>
      <span class="keynote-number mono">Keynote {{ number().toString().padStart(2, '0') }}</span>
      <h3>{{ keynote().title }}</h3>
      <p class="audience"><strong>For:</strong> {{ keynote().idealAudience }}</p>
      <p class="muted">{{ keynote().abstract }}</p>
    </div>
    <div class="card-foot">
      <p class="takeaway-label"><strong>Attendees leave with</strong></p>
      <ol class="takeaways">
        @for (takeaway of keynote().takeaways; track $index) {
          <li>{{ takeaway }}</li>
        }
      </ol>
    </div>
  `,
  styles: `
    :host {
      display: flex;
    }

    .keynote-number {
      display: block;
      font-size: 0.8125rem;
      color: var(--accent-primary);
      margin-block-end: 0.5rem;
    }

    h3 {
      margin-block-start: 0;
      text-wrap: balance;
    }

    .audience {
      font-size: 0.9375rem;
      color: var(--text-muted);

      strong {
        color: var(--text-primary);
      }
    }

    .takeaway-label {
      margin: 0 0 0.5rem;
    }

    .takeaways {
      margin: 0;
      padding-inline-start: 1.25rem;
      display: grid;
      gap: 0.375rem;
    }
  `
})
export class KeynoteCardComponent {
  readonly keynote = input.required<Keynote>();
  /** 1-based position in the list. */
  readonly number = input.required<number>();
}
