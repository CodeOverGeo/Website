import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';

import { SpeakingComponent } from './speaking.component';
import { KEYNOTES } from '../../content/keynotes.content';

describe('SpeakingComponent (/speaking)', () => {
  let fixture: ComponentFixture<SpeakingComponent>;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [SpeakingComponent], providers: [provideRouter([])] });
    fixture = TestBed.createComponent(SpeakingComponent);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('has exactly one h1', () => {
    expect(el.querySelectorAll('h1').length).toBe(1);
  });

  it('renders all four keynotes with three takeaways each', () => {
    const cards = el.querySelectorAll('app-keynote-card');
    expect(cards.length).toBe(4);
    expect(Array.from(cards).map((c) => c.querySelector('h3')?.textContent?.trim())).toEqual(KEYNOTES.map((k) => k.title));
    for (const card of Array.from(cards)) {
      expect(card.querySelectorAll('ol li').length).toBe(3);
    }
  });

  it('has a #bios anchor target holding the bio tabs', () => {
    expect(el.querySelector('section#bios app-bio-tabs')).not.toBeNull();
  });

  it('links the hero bio button to the #bios fragment', () => {
    const hrefs = Array.from(el.querySelectorAll('a')).map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('/speaking#bios');
    expect(hrefs).toContain('/contact');
  });

  it('opens the external event page in a new tab safely and says so', () => {
    const ext = el.querySelector<HTMLAnchorElement>('a[href^="https://"]')!;
    expect(ext.target).toBe('_blank');
    expect(ext.rel).toContain('noopener');
    expect(ext.textContent).toContain('opens in a new tab');
  });

  it('shows no media placeholders while headshots and reel are missing', () => {
    expect(el.querySelector('#media')).toBeNull();
    expect(el.querySelector('img, iframe')).toBeNull();
  });

  it('labels every content section by its h2', () => {
    for (const section of Array.from(el.querySelectorAll('section[aria-labelledby]'))) {
      expect(el.querySelector(`#${section.getAttribute('aria-labelledby')}`)?.tagName).toBe('H2');
    }
  });

  it('does not promise a talk length or format that Notion has not set', () => {
    expect(el.textContent).not.toMatch(/\d+\s*[–-]\s*\d+\s*minute/i);
  });
});
