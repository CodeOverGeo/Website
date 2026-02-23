import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { simulateLoading } from '../../utils/simulated-loading.util';
import { RouterLink } from '@angular/router';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { HeroProfile } from '../../models/portfolio.models';
import { SocialLinksComponent } from '../../components/shared/social-links/social-links.component';

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
}
