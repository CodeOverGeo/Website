import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Numbered process steps. Real `<ol>` so screen readers announce "1 of 4". */
@Component({
  selector: 'app-steps-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ol class="steps">
      @for (step of steps(); track $index) {
        <li>{{ step }}</li>
      }
    </ol>
  `,
  styles: `
    .steps {
      list-style: none;
      counter-reset: step;
      padding: 0;
      margin: 2rem 0 0;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
      gap: 1.375rem;
    }

    li {
      counter-increment: step;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-card);
      padding: 1.375rem 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.875rem;
      text-wrap: pretty;
    }

    li::before {
      content: counter(step, decimal-leading-zero);
      font-family: var(--font-mono);
      font-size: 0.8125rem;
      font-weight: 500;
      color: var(--accent-primary);
      align-self: flex-start;
      padding: 0.2rem 0.65rem;
      border-radius: var(--radius-btn);
      background: var(--accent-soft);
      border: 1px solid var(--accent-border);
    }
  `
})
export class StepsListComponent {
  readonly steps = input.required<readonly string[]>();
}
