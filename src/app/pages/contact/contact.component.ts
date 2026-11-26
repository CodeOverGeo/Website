import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SocialLinksComponent } from '../../components/shared/social-links/social-links.component';

/**
 * Routed Contact Intake shell (`/contact`) — 3-track intent form tracked in Issue #53.
 */
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [SocialLinksComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="stage-hero section-borderless">
      <div class="container prose">
        <span class="stage-kicker">Inquiries &amp; Booking · /contact</span>
        <h1>Start a <span class="accent">conversation</span></h1>
        <p class="hero-lead">
          Inquire about booking an AI keynote, scheduling a hands-on business workshop or one-on-one walkthrough, or connecting about engineering opportunities.
        </p>
        <div class="cta-row">
          <a class="btn btn-primary" href="mailto:grufino@georufino.com">Email grufino&#64;georufino.com</a>
        </div>
        <div style="margin-block-start: 2rem;">
          <app-social-links />
        </div>
      </div>
    </section>
  `
})
export class ContactComponent {}
