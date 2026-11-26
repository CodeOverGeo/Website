import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CtaBandComponent } from '../../components/shared/cta-band/cta-band.component';

/**
 * Talks & Workshops route shell (`/consulting`) — full offer buildout tracked in Issue #50.
 */
@Component({
  selector: 'app-consulting',
  standalone: true,
  imports: [RouterLink, CtaBandComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="stage-hero">
      <div class="container prose">
        <span class="stage-kicker">Talks &amp; Workshops</span>
        <h1>Hands-on AI teaching starting from <span class="accent">real work</span></h1>
        <p class="hero-lead">
          I teach people and teams how to use AI in the work they already do. Every session starts with your tools, your tasks and your questions, so people leave able to do something new the next morning.
        </p>
        <div class="cta-row">
          <a class="btn btn-primary" routerLink="/contact">Inquire about a session</a>
          <a class="btn" routerLink="/speaking">View keynote topics</a>
        </div>
      </div>
    </section>

    <app-cta-band
      kicker="Keynotes · Workshops · 1:1 Walkthroughs"
      heading="Ready to plan a session for your team or audience?"
      body="Tell me about your group, timeline, and the tools you already use."
      primaryLabel="Send an inquiry"
      primaryRoute="/contact"
      secondaryLabel="Explore Speaker Kit"
      secondaryRoute="/speaking"
    />
  `
})
export class ConsultingComponent {}
