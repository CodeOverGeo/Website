import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { PortfolioDataService } from '../../services/portfolio-data.service';
import { SocialLinksComponent } from '../../components/shared/social-links/social-links.component';
import { simulateLoading } from '../../utils/simulated-loading.util';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SocialLinksComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  private readonly dataService = inject(PortfolioDataService);

  // The hero holds the <h1> that is this page's LCP element, so it never waits.
  // The rest stagger in just far enough apart to read as a sequence.
  readonly hero = simulateLoading(this.dataService.hero, 0, 0);
  readonly availability = simulateLoading(this.dataService.availability, 120, 220);
  readonly dossierStats = simulateLoading(this.dataService.dossierStats, 200, 320);
  readonly certifications = simulateLoading(this.dataService.about, 280, 420);
  readonly powers = simulateLoading(this.dataService.powers, 360, 520);
  readonly testimonials = simulateLoading(this.dataService.testimonials, 440, 620);
}
