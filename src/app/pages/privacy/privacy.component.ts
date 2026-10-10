import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/** The text is the final, approved document. Change it only with a new approved version. */
@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './privacy.component.html',
  styleUrl: '../legal/legal-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivacyComponent {}
