import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { AboutSection } from '../../models/portfolio.models';
import { SocialLinksComponent } from '../../components/shared/social-links/social-links.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [JsonPipe, SocialLinksComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {
  private readonly dataService = inject(PortfolioDataService);

  readonly about = signal<AboutSection | null>(null);
  readonly isRaw = signal(false);
  readonly expanded = signal<Record<string, boolean>>({
    professional: true,
    personal: true,
    certifications: true,
    interests: true
  });

  readonly toggledLabel = computed(() => (this.isRaw() ? 'Show Formatted' : 'Show Raw JSON'));

  constructor() {
    this.dataService.getAbout().subscribe((value) => this.about.set(value));
  }

  toggleMode(): void {
    this.isRaw.update((value) => !value);
  }

  toggleSection(section: string): void {
    this.expanded.update((value) => ({ ...value, [section]: !value[section] }));
  }
}
