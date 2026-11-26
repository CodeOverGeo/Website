import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CtaBandComponent } from '../../components/shared/cta-band/cta-band.component';

/**
 * AI Keynotes & Speaker Kit route shell (`/speaking`) — full organizer kit tracked in Issue #51.
 */
@Component({
  selector: 'app-speaking',
  standalone: true,
  imports: [RouterLink, CtaBandComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="stage-hero">
      <div class="container prose">
        <span class="stage-kicker">Event Organizer Kit · /speaking</span>
        <h1>Keynote Topics &amp; <span class="accent">Speaker Dossier</span></h1>
        <p class="hero-lead">
          Plain-language AI keynotes for small business centers, chambers of commerce, conferences, and leadership offsites — taught by a working software engineer and AI Chapter Lead.
        </p>
        <div class="cta-row">
          <a class="btn btn-primary" routerLink="/contact">Inquire about event dates</a>
          <a class="btn" href="/ai">Preview free attendee playbook</a>
        </div>
      </div>
    </section>

    <app-cta-band
      kicker="Raleigh-Durham, NC · In-Person &amp; Online"
      heading="Check speaking availability for your upcoming event"
      body="Includes customizable 30–60 minute keynotes, optional Q&amp;A, and the free AI Without the Hype starter playbook for attendees."
      primaryLabel="Book Giovanni to speak"
      primaryRoute="/contact"
    />
  `
})
export class SpeakingComponent {}
