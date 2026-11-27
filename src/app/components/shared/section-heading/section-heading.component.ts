import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Section intro: mono kicker pill, `h2`, optional muted lead (DESIGN.md §3).
 * Pass `headingId` so the parent `<section>` can point `aria-labelledby` at the heading.
 */
@Component({
  selector: 'app-section-heading',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="prose">
      @if (kicker()) {
        <span class="stage-kicker">{{ kicker() }}</span>
      }
      <h2 [attr.id]="headingId() || null">{{ heading() }}</h2>
      @if (lead()) {
        <p class="muted">{{ lead() }}</p>
      }
    </div>
  `
})
export class SectionHeadingComponent {
  readonly kicker = input<string>('');
  readonly heading = input.required<string>();
  readonly lead = input<string>('');
  readonly headingId = input<string>('');
}
