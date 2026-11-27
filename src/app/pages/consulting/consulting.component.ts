import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CtaBandComponent } from '../../components/shared/cta-band/cta-band.component';
import { OfferCardComponent } from '../../components/shared/offer-card/offer-card.component';
import { SectionHeadingComponent } from '../../components/shared/section-heading/section-heading.component';
import { StepsListComponent } from '../../components/shared/steps-list/steps-list.component';
import {
  CONSULTING_INTRO,
  CONSULTING_PROOF_POINTS,
  HOW_IT_WORKS,
  OFFERS,
  PRICING_RULE
} from '../../content/offers.content';

/**
 * Talks & Workshops (`/consulting`), Issue #50.
 * Teaching offers only (keynotes, workshops, 1:1 walkthroughs). Never add build or prototype tiers.
 * Per-offer format and pricing are still TBD in Notion, so they are deliberately not shown.
 */
@Component({
  selector: 'app-consulting',
  standalone: true,
  imports: [
    RouterLink,
    CtaBandComponent,
    OfferCardComponent,
    SectionHeadingComponent,
    StepsListComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="stage-hero">
      <div class="container prose">
        <span class="stage-kicker">Talks &amp; Workshops</span>
        <h1>Hands-on AI teaching starting from <span class="accent">real work</span></h1>
        <p class="hero-lead">{{ intro }}</p>
        <div class="cta-row">
          <a class="btn btn-primary" routerLink="/contact">Inquire about a session</a>
          <a class="btn" routerLink="/speaking">View keynote topics</a>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="offers-heading">
      <div class="container">
        <app-section-heading
          headingId="offers-heading"
          kicker="Talks & Teaching"
          heading="Sessions built around your team's real work"
        />
        <div class="bento-3">
          @for (offer of offers; track offer.id) {
            <app-offer-card [offer]="offer" />
          }
        </div>
        <p class="muted pricing-note">{{ pricingRule }}</p>
      </div>
    </section>

    <section class="section" aria-labelledby="process-heading">
      <div class="container">
        <app-section-heading headingId="process-heading" kicker="Process" heading="How it works" />
        <app-steps-list [steps]="steps" />
      </div>
    </section>

    <section class="section section-borderless" aria-labelledby="proof-heading">
      <div class="container">
        <app-section-heading headingId="proof-heading" kicker="Background" heading="Why work with me" />
        <ul class="proof-list">
          @for (point of proofPoints; track point.lead) {
            <li>
              @if (point.href) {
                <a [href]="point.href"><strong>{{ point.lead }}</strong> {{ point.detail }}</a>
              } @else {
                <strong>{{ point.lead }}</strong> {{ point.detail }}
              }
            </li>
          }
        </ul>
        <p class="engineering-link">
          <a routerLink="/engineering">See the engineering work behind the teaching →</a>
        </p>
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
  `,
  styles: `
    .pricing-note {
      margin-block: 1.5rem 0;
      font-size: 0.9375rem;
    }

    .proof-list {
      list-style: none;
      padding: 0;
      margin: 2rem 0 0;
      display: grid;
      gap: 1rem;
      max-inline-size: 64ch;

      li {
        padding-inline-start: 1rem;
        border-inline-start: 3px solid var(--accent-border);
        color: var(--text-muted);
        text-wrap: pretty;
      }

      strong {
        color: var(--text-primary);
      }
    }

    .engineering-link {
      margin-block: 1.75rem 0;
    }
  `
})
export class ConsultingComponent {
  protected readonly intro = CONSULTING_INTRO;
  protected readonly offers = OFFERS;
  protected readonly steps = HOW_IT_WORKS;
  protected readonly proofPoints = CONSULTING_PROOF_POINTS;
  protected readonly pricingRule = PRICING_RULE;
}
