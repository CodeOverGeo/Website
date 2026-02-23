import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { simulateLoading } from '../../utils/simulated-loading.util';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { Project } from '../../models/portfolio.models';
import { VisibilityDirective } from '../../directives/visibility.directive';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [VisibilityDirective],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent {
  private readonly dataService = inject(PortfolioDataService);
  readonly projects = simulateLoading(this.dataService.projects, 800, 1500);

  readonly sorted = computed(() => {
    const raw = this.projects();
    if (!raw) return null;
    const items = [...raw];
    return items.sort((a, b) => Number(b.featured) - Number(a.featured));
  });


}
