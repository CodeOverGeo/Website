import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import {
  captureFocusOrigin,
  getFocusableElements,
  restoreFocus,
  trapTab,
} from './focus-trap.util';

describe('focus-trap util', () => {
  let container: HTMLElement;

  /** Builds a surface shaped like the command palette: one input, options that Tab skips. */
  function buildPalette(): { input: HTMLInputElement; option: HTMLButtonElement } {
    container.innerHTML = `
      <input class="palette-input" />
      <div role="listbox">
        <button role="option" tabindex="-1">Open Projects</button>
      </div>
    `;
    return {
      input: container.querySelector('input')!,
      option: container.querySelector('button')!,
    };
  }

  function tabEvent(shiftKey = false): KeyboardEvent {
    return new KeyboardEvent('keydown', { key: 'Tab', shiftKey, bubbles: true, cancelable: true });
  }

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe('getFocusableElements', () => {
    it('skips elements the browser itself skips on Tab', () => {
      const { input } = buildPalette();

      expect(getFocusableElements(container)).toEqual([input]);
    });

    it('skips disabled controls', () => {
      container.innerHTML = '<button disabled>Nope</button><a href="#x">Yes</a>';

      expect(getFocusableElements(container)).toEqual([container.querySelector('a')]);
    });
  });

  describe('trapTab', () => {
    it('wraps to the first element when Tab would leave the container', () => {
      const { input } = buildPalette();
      input.focus();

      const event = tabEvent();
      trapTab(event, container);

      expect(event.defaultPrevented).toBe(true);
      expect(document.activeElement).toBe(input);
    });

    it('wraps to the last element on Shift+Tab', () => {
      container.innerHTML = '<button id="a">A</button><button id="b">B</button>';
      const [first, last] = getFocusableElements(container);
      first.focus();

      const event = tabEvent(true);
      trapTab(event, container);

      expect(event.defaultPrevented).toBe(true);
      expect(document.activeElement).toBe(last);
    });

    it('leaves Tab alone when it would land on another element inside the container', () => {
      container.innerHTML = '<button id="a">A</button><button id="b">B</button>';
      const [first] = getFocusableElements(container);
      first.focus();

      const event = tabEvent();
      trapTab(event, container);

      expect(event.defaultPrevented).toBe(false);
    });

    it('pulls focus back in when it has already escaped the container', () => {
      const { input } = buildPalette();
      const outside = document.createElement('button');
      document.body.appendChild(outside);
      outside.focus();

      const event = tabEvent();
      trapTab(event, container);

      expect(event.defaultPrevented).toBe(true);
      expect(document.activeElement).toBe(input);
      outside.remove();
    });

    it('swallows Tab when the container holds nothing focusable', () => {
      container.innerHTML = '<p>Nothing to focus</p>';

      const event = tabEvent();
      trapTab(event, container);

      expect(event.defaultPrevented).toBe(true);
    });
  });

  describe('captureFocusOrigin / restoreFocus', () => {
    it('round-trips focus through an overlay', () => {
      const trigger = document.createElement('button');
      container.appendChild(trigger);
      trigger.focus();

      const origin = captureFocusOrigin();
      document.body.focus();
      restoreFocus(origin);

      expect(document.activeElement).toBe(trigger);
    });

    it('reports nothing to restore when focus sat on the body', () => {
      expect(captureFocusOrigin()).toBeNull();
    });

    it('skips an origin that has left the document', () => {
      const trigger = document.createElement('button');
      container.appendChild(trigger);
      trigger.focus();
      const origin = captureFocusOrigin();
      trigger.remove();

      expect(() => restoreFocus(origin)).not.toThrow();
      expect(document.activeElement).toBe(document.body);
    });
  });
});
