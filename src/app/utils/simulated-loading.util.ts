import { inject, PLATFORM_ID, Signal, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { NavigationStateService } from '../services/navigation-state.service';

export function simulateLoading<T>(sourceSignal: Signal<T>, minDelayMs: number, maxDelayMs: number): Signal<T | null> {
    const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

    // Prerendering has no timer loop to wait on, and on the first client render the
    // prerendered markup is already on screen — replaying the fake latency there would
    // either bake the skeleton into the static HTML or blank out content the visitor
    // can already see. The effect still plays on every in-app navigation.
    if (!isBrowser || inject(NavigationStateService).isInitialNavigation()) {
        return signal<T | null>(sourceSignal());
    }

    const delayedSignal = signal<T | null>(null);

    const delay = Math.floor(Math.random() * (maxDelayMs - minDelayMs + 1)) + minDelayMs;

    setTimeout(() => {
        // We unwrap the value once the timer resolves
        delayedSignal.set(sourceSignal());
    }, delay);

    return delayedSignal;
}
