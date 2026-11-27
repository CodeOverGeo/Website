import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';

import { SiteFooterComponent } from './site-footer.component';

describe('SiteFooterComponent', () => {
  let fixture: ComponentFixture<SiteFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SiteFooterComponent],
      providers: [provideRouter([])]
    });

    fixture = TestBed.createComponent(SiteFooterComponent);
    fixture.detectChanges();
  });

  it('renders preserved legal, playbook,engineering, and /llms.txt links', () => {
    const host = fixture.nativeElement as HTMLElement;
    const hrefs = Array.from(host.querySelectorAll<HTMLAnchorElement>('.footer-links a')).map(
      (a) => a.getAttribute('href')
    );

    expect(hrefs).toContain('/speaking');
    expect(hrefs).toContain('/engineering');
    expect(hrefs).toContain('/ai');
    expect(hrefs).toContain('/terms');
    expect(hrefs).toContain('/privacy');
    expect(hrefs).toContain('/llms.txt');
  });
});
