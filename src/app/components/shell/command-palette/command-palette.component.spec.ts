import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { CommandPaletteComponent } from './command-palette.component';

/**
 * These cover the keyboard entry point reported in issue #3: the palette opened
 * on Cmd+K but never took focus, so typing went nowhere.
 */
describe('CommandPaletteComponent', () => {
  let fixture: ComponentFixture<CommandPaletteComponent>;
  const strays: HTMLElement[] = [];

  /** Dispatches on `document`, which is where the component listens. */
  function press(key: string, init: KeyboardEventInit = {}): KeyboardEvent {
    const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...init });
    document.dispatchEvent(event);
    settle();
    return event;
  }

  /** Runs change detection and the render hooks the focus call is scheduled on. */
  function settle(): void {
    TestBed.tick();
  }

  function input(): HTMLInputElement | null {
    return document.querySelector<HTMLInputElement>('.palette-input');
  }

  /** Each option renders an icon span followed by a label span. */
  function optionLabels(): string[] {
    return Array.from(document.querySelectorAll('.palette-item')).map(
      (el) => el.querySelectorAll('span')[1].textContent!.trim(),
    );
  }

  /** A stand-in for the status-bar trigger, so focus has somewhere to return to. */
  function addTrigger(): HTMLButtonElement {
    const trigger = document.createElement('button');
    document.body.appendChild(trigger);
    strays.push(trigger);
    return trigger;
  }

  function openPalette(): void {
    press('k', { metaKey: true });
  }

  beforeEach(() => {
    // jsdom has no layout, so the component's scroll-into-view of the selected
    // option would throw during the render hooks these tests drive.
    Element.prototype.scrollIntoView ??= () => undefined;

    TestBed.configureTestingModule({
      imports: [CommandPaletteComponent],
      providers: [provideRouter([])],
    });

    fixture = TestBed.createComponent(CommandPaletteComponent);
    settle();
  });

  afterEach(() => {
    while (strays.length) {
      strays.pop()!.remove();
    }
  });

  it('moves focus into the search input when Cmd+K opens it', () => {
    expect(input()).toBeNull();

    openPalette();

    expect(input()).not.toBeNull();
    expect(document.activeElement).toBe(input());
  });

  it('opens on Ctrl+K as well', () => {
    press('k', { ctrlKey: true });

    expect(document.activeElement).toBe(input());
  });

  it('filters the command list from typed input, with no mouse interaction', () => {
    openPalette();
    expect(optionLabels().length).toBeGreaterThan(1);

    const field = input()!;
    field.value = 'proj';
    field.dispatchEvent(new Event('input'));
    settle();

    expect(optionLabels()).toEqual(['Open Projects']);
  });

  it('keeps Tab inside the palette', () => {
    openPalette();

    const event = press('Tab');

    expect(event.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(input());
  });

  it('keeps Shift+Tab inside the palette', () => {
    openPalette();

    const event = press('Tab', { shiftKey: true });

    expect(event.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(input());
  });

  it('leaves the options out of the tab order, per the combobox pattern', () => {
    openPalette();

    const options = Array.from(document.querySelectorAll<HTMLElement>('.palette-item'));
    expect(options.length).toBeGreaterThan(0);
    expect(options.every((option) => option.tabIndex === -1)).toBe(true);
  });

  it('restores focus to the element that was focused before it opened', () => {
    const trigger = addTrigger();
    trigger.focus();

    openPalette();
    expect(document.activeElement).toBe(input());

    press('Escape');

    expect(input()).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it('restores focus when a second Cmd+K closes it', () => {
    const trigger = addTrigger();
    trigger.focus();

    openPalette();
    openPalette();

    expect(input()).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it('points the combobox at the listbox it controls', () => {
    openPalette();

    const listbox = document.querySelector('[role="listbox"]')!;
    expect(listbox.id).toBeTruthy();
    expect(input()!.getAttribute('aria-controls')).toBe(listbox.id);
  });

  it('marks the palette as a modal dialog', () => {
    openPalette();

    const surface = document.querySelector('.palette')!;
    expect(surface.getAttribute('role')).toBe('dialog');
    expect(surface.getAttribute('aria-modal')).toBe('true');
  });

  it('clears a previous query when it reopens', () => {
    openPalette();
    const field = input()!;
    field.value = 'proj';
    field.dispatchEvent(new Event('input'));
    settle();

    press('Escape');
    openPalette();

    expect(input()!.value).toBe('');
    expect(optionLabels().length).toBeGreaterThan(1);
  });

  it('is not left open after the fixture renders', () => {
    expect(fixture.componentInstance.isOpen()).toBe(false);
  });
});
