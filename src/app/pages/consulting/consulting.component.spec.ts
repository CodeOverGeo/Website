import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';

import { ConsultingComponent } from './consulting.component';
import { HOW_IT_WORKS, OFFERS } from '../../content/offers.content';

describe('ConsultingComponent (/consulting)', () => {
  let fixture: ComponentFixture<ConsultingComponent>;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConsultingComponent],
      providers: [provideRouter([])]
    });
    fixture = TestBed.createComponent(ConsultingComponent);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('has exactly one h1', () => {
    expect(el.querySelectorAll('h1').length).toBe(1);
  });

  it('renders the three teaching offers with includes and audience', () => {
    const cards = el.querySelectorAll('app-offer-card');
    expect(cards.length).toBe(3);
    const titles = Array.from(el.querySelectorAll('app-offer-card h3')).map((h) => h.textContent?.trim());
    expect(titles).toEqual(OFFERS.map((o) => o.title));
    for (const card of Array.from(cards)) {
      expect(Array.from(card.querySelectorAll('dt')).map((d) => d.textContent?.trim())).toEqual(['Includes', 'For']);
    }
  });

  it('renders the four-step process as an ordered list', () => {
    const steps = el.querySelectorAll('ol li');
    expect(steps.length).toBe(4);
    expect(steps[0].textContent?.trim()).toBe(HOW_IT_WORKS[0]);
  });

  it('labels every content section by its heading', () => {
    for (const section of Array.from(el.querySelectorAll('section[aria-labelledby]'))) {
      const id = section.getAttribute('aria-labelledby')!;
      expect(el.querySelector(`#${id}`)?.tagName).toBe('H2');
    }
  });

  it('links to contact, speaking, engineering and the /ai playbook', () => {
    const hrefs = Array.from(el.querySelectorAll('a')).map((a) => a.getAttribute('href'));
    for (const expected of ['/contact', '/speaking', '/engineering', '/ai']) {
      expect(hrefs).toContain(expected);
    }
  });

  it('never shows TBD pricing or offers build work', () => {
    const text = el.textContent ?? '';
    expect(text).not.toMatch(/\bTBD\b/);
    expect(text).not.toMatch(/\b(prototyp\w*|implementation|we build|build it for you)\b/i);
  });
});
