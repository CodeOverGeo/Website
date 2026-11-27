import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationStateService } from './services/navigation-state.service';
import { SeoService } from './services/seo.service';
import { SiteHeaderComponent } from './components/shell/site-header/site-header.component';
import { SiteFooterComponent } from './components/shell/site-footer/site-footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  constructor() {
    // Instantiated here so it observes the router's very first navigation.
    inject(NavigationStateService);
    inject(SeoService).init();
  }
}
