import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CtaBandComponent } from '../../components/shared/cta-band/cta-band.component';

/**
 * Articles & AI Explainers route shell (`/writing`) — content migration tracked in Issue #54.
 * Existing Dev.to feed endpoint: `https://dev.to/api/articles?username=giovanni_rufinogeo_77b`.
 */
@Component({
  selector: 'app-writing',
  standalone: true,
  imports: [CtaBandComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="stage-hero">
      <div class="container prose">
        <span class="stage-kicker">Articles &amp; AI Explainers · /writing</span>
        <h1>Practical notes on <span class="accent">AI &amp; software</span></h1>
        <p class="hero-lead">
          Plain-English guides for business owners and technical deep dives on backend engineering, observability, and AI workflows.
        </p>
        <div class="cta-row">
          <a class="btn btn-primary" href="/ai">Read the Free AI Starter Playbook</a>
        </div>
      </div>
    </section>

    <app-cta-band
      kicker="Live Training"
      heading="Want these lessons tailored to your team's daily tools?"
      body="Book a keynote or hands-on business workshop built around real tasks."
      primaryLabel="Book a talk or workshop"
      primaryRoute="/contact"
      secondaryLabel="See Keynote Topics"
      secondaryRoute="/speaking"
    />
  `
})
export class WritingComponent {}
