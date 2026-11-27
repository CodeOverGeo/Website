import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Offer } from '../../../content/content.models';

/** Bento card for one teaching offer: scope up top, "Includes" / "For" footer (DESIGN.md §5.4). */
@Component({
  selector: 'app-offer-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'surface-card' },
  template: `
    <div>
      <h3>{{ offer().title }}</h3>
      <p class="muted">{{ offer().scope }}</p>
    </div>
    <dl class="card-foot offer-foot">
      <div>
        <dt>Includes</dt>
        <dd>{{ offer().deliverables }}</dd>
      </div>
      <div>
        <dt>For</dt>
        <dd>{{ offer().idealClient }}</dd>
      </div>
    </dl>
  `,
  styles: `
    :host {
      display: flex;
    }

    h3 {
      margin-block-start: 0;
    }

    .offer-foot {
      display: grid;
      gap: 0.625rem;
    }

    dt {
      color: var(--text-primary);
      font-weight: 700;
    }

    dd {
      margin: 0;
    }
  `
})
export class OfferCardComponent {
  readonly offer = input.required<Offer>();
}
