import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PortfolioDataService } from '../../../services/portfolio-data.service';
import { SocialLinks } from '../../../models/portfolio.models';

@Component({
  selector: 'app-social-links',
  standalone: true,
  imports: [],
  templateUrl: './social-links.component.html',
  styleUrl: './social-links.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialLinksComponent {
  private readonly dataService = inject(PortfolioDataService);

  readonly links = this.dataService.socialLinks;
}
