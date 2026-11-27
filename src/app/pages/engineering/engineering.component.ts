import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CtaBandComponent } from '../../components/shared/cta-band/cta-band.component';

/**
 * Engineering & Technical Background route shell (`/engineering`) — full buildout tracked in Issue #52.
 * Structured career, project, and certification data available in `PortfolioDataService`.
 */
@Component({
  selector: 'app-engineering',
  standalone: true,
  imports: [CtaBandComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="stage-hero">
      <div class="container prose">
        <span class="stage-kicker">Engineering Record · /engineering</span>
        <h1>Production software behind <span class="accent">every talk</span></h1>
        <p class="hero-lead">
          My talks come from daily engineering work. I build production software at Relias with .NET, Angular and Azure, and I serve as an AI Chapter Lead there.
        </p>
        <ul class="mono-chips" aria-label="Core technical stack">
          <li>C# / .NET</li>
          <li>Angular</li>
          <li>TypeScript</li>
          <li>SQL</li>
          <li>Azure (AZ-900 · AZ-204 · AI-900)</li>
          <li>MCP</li>
          <li>Swift / SwiftUI</li>
        </ul>
        <div class="cta-row">
          <a class="btn btn-primary" href="/Giovanni_Rufino_Resume.pdf" target="_blank" rel="noopener">
            Download Resume (PDF)
          </a>
          <a class="btn" href="https://github.com/CodeOverGeo" target="_blank" rel="noopener noreferrer">
            GitHub Profile
          </a>
        </div>
      </div>
    </section>

    <app-cta-band
      kicker="Engineering &amp; Recruiting"
      heading="Evaluating technical background or architecture experience?"
      body="Reach out directly for engineering roles, advisory conversations, or technical speaking."
      primaryLabel="Get in touch"
      primaryRoute="/contact"
    />
  `
})
export class EngineeringComponent {}
