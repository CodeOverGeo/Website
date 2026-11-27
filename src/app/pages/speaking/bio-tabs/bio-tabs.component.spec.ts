import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { BioTabsComponent, countWords } from './bio-tabs.component';
import { SPEAKER_BIOS } from '../../../content/bios.content';

describe('BioTabsComponent', () => {
  let fixture: ComponentFixture<BioTabsComponent>;
  let el: HTMLElement;
  const tabs = () => Array.from(el.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
  const panels = () => Array.from(el.querySelectorAll<HTMLElement>('[role="tabpanel"]'));
  const key = (k: string) => {
    el.querySelector('[role="tablist"]')!.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true }));
    fixture.detectChanges();
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [BioTabsComponent] });
    fixture = TestBed.createComponent(BioTabsComponent);
    fixture.componentRef.setInput('bios', SPEAKER_BIOS);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('keeps the Notion word counts (50 / 149 / 293)', () => {
    expect(SPEAKER_BIOS.map((b) => countWords(b.paragraphs))).toEqual([50, 149, 293]);
  });

  it('wires tabs and panels together and starts on the short bio', () => {
    expect(tabs().map((t) => t.getAttribute('aria-selected'))).toEqual(['true', 'false', 'false']);
    expect(tabs().map((t) => t.tabIndex)).toEqual([0, -1, -1]);
    for (const [i, tab] of tabs().entries()) {
      expect(tab.getAttribute('aria-controls')).toBe(panels()[i].id);
      expect(panels()[i].getAttribute('aria-labelledby')).toBe(tab.id);
    }
    expect(panels().map((p) => p.getAttribute('hidden'))).toEqual([null, 'until-found', 'until-found']);
  });

  it('switches on click', () => {
    tabs()[2].click();
    fixture.detectChanges();
    expect(tabs()[2].getAttribute('aria-selected')).toBe('true');
    expect(panels()[2].hasAttribute('hidden')).toBe(false);
    expect(panels()[0].getAttribute('hidden')).toBe('until-found');
  });

  it('moves with arrow keys (wrapping), Home and End, and focuses the new tab', () => {
    key('ArrowLeft');
    expect(tabs()[2].getAttribute('aria-selected')).toBe('true');
    expect(document.activeElement).toBe(tabs()[2]);
    key('ArrowRight');
    expect(tabs()[0].getAttribute('aria-selected')).toBe('true');
    key('End');
    expect(tabs()[2].getAttribute('aria-selected')).toBe('true');
    key('Home');
    expect(tabs()[0].getAttribute('aria-selected')).toBe('true');
  });

  it('opens a hidden panel when find-in-page matches inside it', () => {
    panels()[1].dispatchEvent(new Event('beforematch'));
    fixture.detectChanges();
    expect(tabs()[1].getAttribute('aria-selected')).toBe('true');
  });

  it('gives each panel a copy button for its own bio', () => {
    const labels = panels().map((p) => p.querySelector('app-copy-button button span:last-child')?.textContent?.trim());
    expect(labels).toEqual(['Copy short bio', 'Copy standard bio', 'Copy extended bio']);
  });
});
