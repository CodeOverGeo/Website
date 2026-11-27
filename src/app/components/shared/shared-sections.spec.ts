import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { OfferCardComponent } from './offer-card/offer-card.component';
import { ProofBarComponent } from './proof-bar/proof-bar.component';
import { SectionHeadingComponent } from './section-heading/section-heading.component';
import { StepsListComponent } from './steps-list/steps-list.component';
import { OFFERS } from '../../content/offers.content';

function render<T>(cmp: Type<T>, inputs: Record<string, unknown>): HTMLElement {
  TestBed.configureTestingModule({ imports: [cmp] });
  const fixture = TestBed.createComponent(cmp);
  for (const [k, v] of Object.entries(inputs)) fixture.componentRef.setInput(k, v);
  fixture.detectChanges();
  return fixture.nativeElement;
}

describe('Shared section components', () => {
  it('SectionHeading renders kicker, id-bearing h2 and omits an empty lead', () => {
    const el = render(SectionHeadingComponent, { heading: 'How it works', kicker: 'Process', headingId: 'p-h' });
    expect(el.querySelector('h2#p-h')?.textContent).toBe('How it works');
    expect(el.querySelector('.stage-kicker')?.textContent).toBe('Process');
    expect(el.querySelector('p')).toBeNull();
  });

  it('SectionHeading renders no id attribute when none is given', () => {
    const el = render(SectionHeadingComponent, { heading: 'X' });
    expect(el.querySelector('h2')?.hasAttribute('id')).toBe(false);
  });

  it('OfferCard is a surface card with title, scope and footer', () => {
    const el = render(OfferCardComponent, { offer: OFFERS[1] });
    expect(el.classList).toContain('surface-card');
    expect(el.querySelector('h3')?.textContent).toBe('Business Workshops');
    expect(el.querySelectorAll('dd')[1].textContent).toBe(OFFERS[1].idealClient);
  });

  it('StepsList renders an ordered list in order', () => {
    const el = render(StepsListComponent, { steps: ['a', 'b', 'c'] });
    expect(Array.from(el.querySelectorAll('ol > li')).map((li) => li.textContent?.trim())).toEqual(['a', 'b', 'c']);
  });

  it('ProofBar links only items with an href', () => {
    const el = render(ProofBarComponent, {
      items: [
        { lead: 'Lead', detail: 'one' },
        { lead: 'Author', detail: 'two', href: '/ai' }
      ]
    });
    expect(el.querySelector('section')?.getAttribute('aria-label')).toBe('Credentials');
    const links = el.querySelectorAll('a');
    expect(links.length).toBe(1);
    expect(links[0].getAttribute('href')).toBe('/ai');
  });
});
