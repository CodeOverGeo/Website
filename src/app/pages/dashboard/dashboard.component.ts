import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { SocialLinksComponent } from '../../components/shared/social-links/social-links.component';
import { simulateLoading } from '../../utils/simulated-loading.util';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, SocialLinksComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  private readonly dataService = inject(PortfolioDataService);

  readonly hero = simulateLoading(this.dataService.hero, 1000, 1800);
  readonly availability = simulateLoading(this.dataService.availability, 1000, 1500);
  readonly dossierStats = simulateLoading(this.dataService.dossierStats, 1200, 2000);
  readonly certifications = simulateLoading(this.dataService.about, 1400, 2200);
  readonly powers = simulateLoading(this.dataService.powers, 1600, 2400);
  readonly testimonials = simulateLoading(this.dataService.testimonials, 1800, 2500);
}
