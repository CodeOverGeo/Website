import { computed, DestroyRef, inject, PLATFORM_ID, Signal, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { NavigationStateService } from '../services/navigation-state.service';

export function simulateLoading<T>(
  sourceSignal: Signal<T>,
  minDelayMs: number,
  maxDelayMs: number,
): Signal<T | null> {
  const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  // Prerendering has no timer loop to wait on, and on the first client render the
  // prerendered markup is already on screen — replaying the fake latency there would
  // either bake the skeleton into the static HTML or blank out content the visitor
  // can already see. The effect still plays on every in-app navigation.
  if (!isBrowser || inject(NavigationStateService).isInitialNavigation()) {
    return sourceSignal;
  }

  const delay = Math.floor(Math.random() * (maxDelayMs - minDelayMs + 1)) + minDelayMs;

  // A zero delay would still cost a macrotask, flashing the loader for one frame.
  if (delay <= 0) {
    return sourceSignal;
  }

  const ready = signal(false);

  const timer = setTimeout(() => ready.set(true), delay);

  // Without this, navigating away mid-delay leaves the timer writing to a destroyed component.
  inject(DestroyRef).onDestroy(() => clearTimeout(timer));

  // Derived rather than snapshotted, so a later change to the source still reaches the view.
  return computed(() => (ready() ? sourceSignal() : null));
}
