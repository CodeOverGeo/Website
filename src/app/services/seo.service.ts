import { DOCUMENT, inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

export const SITE_URL = 'https://georufino.com';

export const DEFAULT_TITLE = 'Giovanni Rufino | Software Engineer';

export const DEFAULT_DESCRIPTION =
  'Giovanni Rufino is a Software Engineer in the Raleigh-Durham-Chapel Hill area building scalable backend systems, AI-assisted workflows, and polished developer experiences.';

const OG_IMAGE = `${SITE_URL}/og-image.png`;

/** Route `data` shape consumed by `SeoService`. */
export interface SeoRouteData {
  description?: string;
}

/**
 * Keeps the description, canonical link, and Open Graph / Twitter tags in sync
 * with the active route. Runs during prerendering too, so each emitted HTML
 * file ships its own metadata.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly document = inject(DOCUMENT);

  private initialized = false;

  init(): void {
    if (this.initialized) return;
    this.initialized = true;

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.update(event.urlAfterRedirects));
  }

  private update(url: string): void {
    const snapshot = this.deepestSnapshot();
    const title = snapshot.title ?? DEFAULT_TITLE;
    const description = (snapshot.data as SeoRouteData).description ?? DEFAULT_DESCRIPTION;
    const canonical = this.canonicalUrl(url);

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });

    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: canonical });
    this.meta.updateTag({ property: 'og:image', content: OG_IMAGE });

    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: OG_IMAGE });

    this.setCanonical(canonical);
  }

  private deepestSnapshot(): ActivatedRouteSnapshot {
    let snapshot = this.activatedRoute.snapshot;
    while (snapshot.firstChild) {
      snapshot = snapshot.firstChild;
    }
    return snapshot;
  }

  /** Absolute URL without query string or fragment. */
  private canonicalUrl(url: string): string {
    const path = url.split(/[?#]/)[0];
    return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  }

  private setCanonical(href: string): void {
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', href);
  }
}
