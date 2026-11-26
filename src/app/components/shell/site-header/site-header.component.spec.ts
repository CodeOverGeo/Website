import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { Component } from '@angular/core';
import { beforeEach, describe, expect, it } from 'vitest';

import { SiteHeaderComponent } from './site-header.component';

@Component({ standalone: true, template: '' })
class StubPageComponent {}

describe('SiteHeaderComponent', () => {
  let fixture: ComponentFixture<SiteHeaderComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SiteHeaderComponent],
      providers: [
        provideRouter([
          { path: '', component: StubPageComponent },
          { path: 'speaking', component: StubPageComponent },
          { path: 'consulting', component: StubPageComponent },
          { path: 'engineering', component: StubPageComponent },
          { path: 'writing', component: StubPageComponent },
          { path: 'contact', component: StubPageComponent }
        ])
      ]
    });

    fixture = TestBed.createComponent(SiteHeaderComponent);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('renders a single semantic Primary nav landmark with all 5 routes plus Book a Talk CTA', () => {
    const host = fixture.nativeElement as HTMLElement;
    const nav = host.querySelector('nav[aria-label="Primary"]');
    expect(nav).not.toBeNull();

    const links = Array.from(host.querySelectorAll<HTMLAnchorElement>('#site-menu a')).map((el) =>
      el.textContent!.trim()
    );
    expect(links).toEqual(['Home', 'Speaking', 'Talks & Workshops', 'Engineering', 'Writing', 'Book a Talk']);
  });

  it('provides a declarative popover menu button targeting #site-menu', () => {
    const host = fixture.nativeElement as HTMLElement;
    const btn = host.querySelector<HTMLButtonElement>('.menu-button');
    expect(btn).not.toBeNull();
    expect(btn!.getAttribute('type')).toBe('button');
    expect(btn!.getAttribute('popovertarget')).toBe('site-menu');
    expect(btn!.getAttribute('aria-controls')).toBe('site-menu');
  });

  it('marks the active route with aria-current="page"', async () => {
    await router.navigateByUrl('/speaking');
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const active = host.querySelector<HTMLAnchorElement>('#site-menu a[aria-current="page"]');
    expect(active).not.toBeNull();
    expect(active!.textContent!.trim()).toBe('Speaking');
  });
});
