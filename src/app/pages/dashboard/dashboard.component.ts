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

  readonly hero = simulateLoading(this.dataService.hero, 300, 800);
  readonly availability = simulateLoading(this.dataService.availability, 200, 500);
  readonly dossierStats = simulateLoading(this.dataService.dossierStats, 400, 900);
  readonly certifications = simulateLoading(this.dataService.about, 500, 1000);
  readonly powers = simulateLoading(this.dataService.powers, 700, 1200);
  readonly testimonials = simulateLoading(this.dataService.testimonials, 900, 1400);
}
