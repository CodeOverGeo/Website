/**
 * Elements a Tab press can reach. Options inside a listbox are deliberately
 * excluded via `tabindex="-1"` on the markup side — the ARIA combobox pattern
 * moves through them with `aria-activedescendant`, not with Tab.
 */
const NOT_SKIPPED = ':not([tabindex="-1"]):not([inert])';

const FOCUSABLE_SELECTOR = [
  `a[href]${NOT_SKIPPED}`,
  `button:not([disabled])${NOT_SKIPPED}`,
  `input:not([disabled])${NOT_SKIPPED}`,
  `select:not([disabled])${NOT_SKIPPED}`,
  `textarea:not([disabled])${NOT_SKIPPED}`,
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
}

/**
 * Keeps Tab and Shift+Tab inside `container` for a modal surface. Call it from a
 * keydown handler once the key is known to be Tab; it consumes the event only
 * when focus would otherwise leave.
 */
export function trapTab(event: KeyboardEvent, container: HTMLElement): void {
  const focusable = getFocusableElements(container);

  // Nothing to land on, so the only correct move is to keep focus where it is
  // rather than let the browser walk into the page behind the backdrop.
  if (focusable.length === 0) {
    event.preventDefault();
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active = document.activeElement;
  const escaping = !(active instanceof HTMLElement) || !container.contains(active);

  if (event.shiftKey) {
    if (escaping || active === first) {
      event.preventDefault();
      last.focus();
    }
    return;
  }

  if (escaping || active === last) {
    event.preventDefault();
    first.focus();
  }
}

/**
 * Returns the element to restore focus to when an overlay closes, or null when
 * there is nothing worth restoring (focus sat on `<body>` before opening, as it
 * does when the palette is opened by its keyboard shortcut).
 */
export function captureFocusOrigin(): HTMLElement | null {
  const active = document.activeElement;
  if (!(active instanceof HTMLElement) || active === document.body) {
    return null;
  }
  return active;
}

/**
 * Restores focus to `origin` if it is still in the document. An element that has
 * been removed since the overlay opened is silently skipped.
 */
export function restoreFocus(origin: HTMLElement | null): void {
  if (origin && origin.isConnected) {
    origin.focus();
  }
}
