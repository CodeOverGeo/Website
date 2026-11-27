import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ProofPoint } from '../../../content/content.models';

/** Full-bleed credential band (DESIGN.md §5.3). Uses the global `.proof-bar` / `.proof-items` styles. */
@Component({
  selector: 'app-proof-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="proof-bar" [attr.aria-label]="label()">
      <div class="container">
        <ul class="proof-items">
          @for (item of items(); track item.lead) {
            <li>
              @if (item.href) {
                <a [href]="item.href"><strong>{{ item.lead }}</strong> {{ item.detail }}</a>
              } @else {
                <strong>{{ item.lead }}</strong> {{ item.detail }}
              }
            </li>
          }
        </ul>
      </div>
    </section>
  `
})
export class ProofBarComponent {
  readonly items = input.required<readonly ProofPoint[]>();
  readonly label = input<string>('Credentials');
}
