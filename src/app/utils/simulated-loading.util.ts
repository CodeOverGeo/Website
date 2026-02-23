import { Signal, signal } from '@angular/core';

export function simulateLoading<T>(sourceSignal: Signal<T>, minDelayMs: number, maxDelayMs: number): Signal<T | null> {
    const delayedSignal = signal<T | null>(null);

    const delay = Math.floor(Math.random() * (maxDelayMs - minDelayMs + 1)) + minDelayMs;

    setTimeout(() => {
        // We unwrap the value once the timer resolves
        delayedSignal.set(sourceSignal());
    }, delay);

    return delayedSignal;
}
