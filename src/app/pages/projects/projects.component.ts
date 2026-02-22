import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
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
  readonly projects = this.dataService.projects;

  readonly sorted = computed(() => {
    const items = [...this.projects()];
    return items.sort((a, b) => Number(b.featured) - Number(a.featured));
  });


}
