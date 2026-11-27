import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cta-band',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cta-band.component.html',
  styleUrl: './cta-band.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CtaBandComponent {
  readonly kicker = input<string>('Next Step');
  readonly heading = input.required<string>();
  readonly body = input.required<string>();
  readonly primaryLabel = input<string>('Book a talk or workshop');
  readonly primaryRoute = input<string>('/contact');
  readonly secondaryLabel = input<string>('');
  readonly secondaryRoute = input<string>('');
  readonly secondaryHref = input<string>('');
}
