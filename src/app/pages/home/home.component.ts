import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CtaBandComponent } from '../../components/shared/cta-band/cta-band.component';
import { ProofBarComponent } from '../../components/shared/proof-bar/proof-bar.component';
import { PROOF_STRIP } from '../../content/proof.content';

/**
 * Home route shell (`/`) — full section buildout tracked in Issue #49.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CtaBandComponent, ProofBarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="stage-hero stage-hero-centered">
      <div class="container">
        <div class="stage-hero-inner">
          <span class="stage-kicker">AI keynotes, workshops and walkthroughs</span>
          <h1>Practical AI, taught by someone who <span class="accent">builds it</span></h1>
          <p class="hero-lead">
            I'm Giovanni Rufino, a software engineer and AI Chapter Lead at Relias. My talks and workshops help business owners, leaders and teams use AI in their real work, safely and without the hype.
          </p>
          <div class="cta-row">
            <a class="btn btn-primary" routerLink="/contact">Book a talk or workshop</a>
            <a class="btn" routerLink="/speaking">See keynote topics →</a>
          </div>
        </div>
      </div>
    </section>

    <app-proof-bar [items]="proofStrip" />

    <app-cta-band
      kicker="Book or Read First"
      heading="Bring practical AI to your next event or team session"
      body="Explore ready-to-book keynote topics, hands-on workshops, and the free starter playbook."
      primaryLabel="Book a talk or workshop"
      primaryRoute="/contact"
      secondaryLabel="Read /ai Playbook"
      secondaryHref="/ai"
    />
  `
})
export class HomeComponent {
  protected readonly proofStrip = PROOF_STRIP;
}
