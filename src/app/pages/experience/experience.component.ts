import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { simulateLoading } from '../../utils/simulated-loading.util';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { ExperienceCommit } from '../../models/portfolio.models';
import { VisibilityDirective } from '../../directives/visibility.directive';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [VisibilityDirective],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceComponent {
  private readonly dataService = inject(PortfolioDataService);
  readonly commits = simulateLoading(this.dataService.experience, 600, 1200);
}
