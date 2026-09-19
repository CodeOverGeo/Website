import {
  createEnvironmentInjector,
  EnvironmentInjector,
  PLATFORM_ID,
  runInInjectionContext,
  Signal,
  signal,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { NavigationStateService } from '../services/navigation-state.service';
import { simulateLoading } from './simulated-loading.util';

/** Stands in for the real service so these tests do not need a router. */
class FakeNavigationState {
  initial = false;

  isInitialNavigation(): boolean {
    return this.initial;
  }
}

describe('simulateLoading', () => {
  let navigationState: FakeNavigationState;

  /**
   * Runs `simulateLoading` in a throwaway injector so the test can destroy it
   * the way Angular destroys a component on navigation.
   */
  function loadIn<T>(
    source: Signal<T>,
    minMs: number,
    maxMs: number,
    platform: string = 'browser',
  ) {
    TestBed.configureTestingModule({
      providers: [
        { provide: PLATFORM_ID, useValue: platform },
        { provide: NavigationStateService, useValue: navigationState },
      ],
    });

    const injector = createEnvironmentInjector([], TestBed.inject(EnvironmentInjector));
    const result = runInInjectionContext(injector, () => simulateLoading(source, minMs, maxMs));

    return { result, injector };
  }

  beforeEach(() => {
    navigationState = new FakeNavigationState();
    vi.useFakeTimers();
    // Pin the delay to the top of the range so tests can advance an exact amount.
    vi.spyOn(Math, 'random').mockReturnValue(0.999);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('holds the source back until the delay elapses, then releases it', () => {
    const source = signal('ready');
    const { result } = loadIn(source, 100, 200);

    expect(result()).toBeNull();

    vi.advanceTimersByTime(199);
    expect(result()).toBeNull();

    vi.advanceTimersByTime(1);
    expect(result()).toBe('ready');
  });

  it('reflects a change to the source made after the delay elapsed', () => {
    const source = signal('first');
    const { result } = loadIn(source, 100, 200);

    vi.advanceTimersByTime(200);
    expect(result()).toBe('first');

    // The old implementation snapshotted the value inside the timeout, so this was missed.
    source.set('second');
    expect(result()).toBe('second');
  });

  it('reflects a change to the source made during the delay', () => {
    const source = signal('first');
    const { result } = loadIn(source, 100, 200);

    source.set('second');
    vi.advanceTimersByTime(200);

    expect(result()).toBe('second');
  });

  it('clears the pending timer when the injection context is destroyed', () => {
    const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout');
    const source = signal('ready');
    const { result, injector } = loadIn(source, 100, 200);

    injector.destroy();

    expect(clearTimeoutSpy).toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);

    vi.advanceTimersByTime(1000);
    expect(result()).toBeNull();
  });

  it('resolves synchronously with no timer when both bounds are zero', () => {
    const source = signal('ready');
    const { result } = loadIn(source, 0, 0);

    expect(result()).toBe('ready');
    expect(vi.getTimerCount()).toBe(0);
  });

  it('resolves synchronously during the initial navigation', () => {
    navigationState.initial = true;
    const source = signal('ready');
    const { result } = loadIn(source, 100, 200);

    expect(result()).toBe('ready');
    expect(vi.getTimerCount()).toBe(0);

    source.set('updated');
    expect(result()).toBe('updated');
  });

  it('resolves synchronously when prerendering on the server', () => {
    const source = signal('ready');
    const { result } = loadIn(source, 100, 200, 'server');

    expect(result()).toBe('ready');
    expect(vi.getTimerCount()).toBe(0);
  });
});
