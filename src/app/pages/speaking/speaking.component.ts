import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { CtaBandComponent } from '../../components/shared/cta-band/cta-band.component';
import { KeynoteCardComponent } from '../../components/shared/keynote-card/keynote-card.component';
import { SectionHeadingComponent } from '../../components/shared/section-heading/section-heading.component';
import { SPEAKER_BIOS } from '../../content/bios.content';
import { KEYNOTES } from '../../content/keynotes.content';
import { HEADSHOTS, SPEAKER_REEL, SPEAKING_ENGAGEMENTS } from '../../content/speaking.content';
import { BioTabsComponent } from './bio-tabs/bio-tabs.component';

/**
 * AI Keynotes & Speaker Kit (`/speaking`), Issue #51.
 * The headshots and reel section renders only once `speaking.content.ts` has the files;
 * both are still missing in Notion, so nothing shows a placeholder.
 */
@Component({
  selector: 'app-speaking',
  standalone: true,
  imports: [
    RouterLink,
    BioTabsComponent,
    CtaBandComponent,
    KeynoteCardComponent,
    SectionHeadingComponent
  ],
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
          <a class="btn" routerLink="/speaking" fragment="bios">Copy speaker bios</a>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="keynotes-heading">
      <div class="container">
        <app-section-heading
          headingId="keynotes-heading"
          kicker="4 Keynote Topics"
          heading="Talks that turn AI curiosity into safe Monday habits"
        />
        <div class="bento-2">
          @for (keynote of keynotes; track keynote.id; let i = $index) {
            <app-keynote-card [keynote]="keynote" [number]="i + 1" />
          }
        </div>
      </div>
    </section>

    <section id="bios" class="section" aria-labelledby="bios-heading">
      <div class="container">
        <app-section-heading
          headingId="bios-heading"
          kicker="Approved Bios"
          heading="Copy-paste speaker bios"
          lead="Pick the length your program needs and copy it in one click."
        />
        <app-bio-tabs [bios]="bios" />
      </div>
    </section>

    <section class="section" [class.section-borderless]="!hasMedia" aria-labelledby="engagements-heading">
      <div class="container">
        <app-section-heading headingId="engagements-heading" kicker="Speaking" heading="Recent talks" />
        <ul class="engagements">
          @for (talk of engagements; track talk.title) {
            <li>
              @if (talk.href) {
                <a [href]="talk.href" target="_blank" rel="noopener">
                  <strong>{{ talk.title }}</strong>
                  <span class="sr-only">(opens in a new tab)</span>
                </a>
              } @else {
                <strong>{{ talk.title }}</strong>
              }
              <span class="muted">{{ talk.detail }}</span>
            </li>
          }
        </ul>
      </div>
    </section>

    @if (hasMedia) {
      <section id="media" class="section section-borderless" aria-labelledby="media-heading">
        <div class="container">
          <app-section-heading headingId="media-heading" kicker="Media" heading="Headshots &amp; reel" />
          <div class="bento-3">
            @for (shot of headshots; track shot.src) {
              <figure class="surface-card media-card">
                <img [src]="shot.src" [alt]="shot.alt" [width]="shot.width" [height]="shot.height" loading="lazy" />
                <figcaption>
                  <a class="btn" [href]="shot.src" download>Download {{ shot.label }}</a>
                </figcaption>
              </figure>
            }
            @if (reelUrl) {
              <div class="surface-card media-card">
                <iframe
                  [src]="reelUrl"
                  [title]="reel!.title"
                  loading="lazy"
                  allow="encrypted-media; picture-in-picture; fullscreen"
                ></iframe>
              </div>
            }
          </div>
        </div>
      </section>
    }

    <app-cta-band
      kicker="Book a keynote"
      heading="Check speaking availability for your upcoming event"
      body="Q&amp;A is optional, and attendees get the free AI Without the Hype starter playbook."
      primaryLabel="Book Giovanni to speak"
      primaryRoute="/contact"
      secondaryLabel="Preview the playbook"
      secondaryHref="/ai"
    />
  `,
  styles: `
    .engagements {
      list-style: none;
      padding: 0;
      margin: 2rem 0 0;
      display: grid;
      gap: 1rem;
      max-inline-size: 64ch;

      li {
        display: grid;
        gap: 0.25rem;
        padding-inline-start: 1rem;
        border-inline-start: 3px solid var(--accent-border);
      }
    }

    .media-card {
      margin: 0;

      img,
      iframe {
        inline-size: 100%;
        block-size: auto;
        border-radius: calc(var(--radius-card) - 0.5rem);
        border: 0;
      }

      iframe {
        aspect-ratio: 16 / 9;
      }
    }
  `
})
export class SpeakingComponent {
  protected readonly keynotes = KEYNOTES;
  protected readonly bios = SPEAKER_BIOS;
  protected readonly engagements = SPEAKING_ENGAGEMENTS;
  protected readonly headshots = HEADSHOTS;
  protected readonly reel = SPEAKER_REEL;
  protected readonly hasMedia = HEADSHOTS.length > 0 || SPEAKER_REEL !== null;

  /** Trusted: the URL comes from our own content file, never from user input. */
  protected readonly reelUrl = SPEAKER_REEL
    ? inject(DomSanitizer).bypassSecurityTrustResourceUrl(SPEAKER_REEL.embedUrl)
    : null;
}
