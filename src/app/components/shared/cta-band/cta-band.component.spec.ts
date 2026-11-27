import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';

import { CtaBandComponent } from './cta-band.component';

describe('CtaBandComponent', () => {
  let fixture: ComponentFixture<CtaBandComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CtaBandComponent],
      providers: [provideRouter([])]
    });

    fixture = TestBed.createComponent(CtaBandComponent);
    fixture.componentRef.setInput('heading', 'Plan your next session');
    fixture.componentRef.setInput('body', 'Tailored AI talks and workshops.');
    fixture.componentRef.setInput('secondaryLabel', 'Read Playbook');
    fixture.componentRef.setInput('secondaryHref', '/ai');
    fixture.detectChanges();
  });

  it('renders heading, body, primary route CTA, and optional static secondary href', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('h2')?.textContent).toContain('Plan your next session');

    const buttons = Array.from(el.querySelectorAll<HTMLAnchorElement>('a.btn'));
    expect(buttons.length).toBe(2);
    expect(buttons[0].getAttribute('href')).toBe('/contact');
    expect(buttons[1].getAttribute('href')).toBe('/ai');
  });
});
