import { describe, expect, it } from 'vitest';
import { routes } from './app.routes';

describe('Application routes', () => {
  it('includes all target redesign routes and preserved legal routes', () => {
    const paths = routes.map((r) => r.path);
    for (const expected of ['', 'consulting', 'speaking', 'engineering', 'writing', 'contact', 'terms', 'privacy']) {
      expect(paths).toContain(expected);
    }
  });

  it('redirects legacy portfolio routes without looping the wildcard to /dashboard', () => {
    const redirectMap = new Map(routes.filter((r) => r.redirectTo !== undefined).map((r) => [r.path, r.redirectTo]));
    expect(redirectMap.get('dashboard')).toBe('');
    expect(redirectMap.get('experience.cs')).toBe('engineering');
    expect(redirectMap.get('projects.py')).toBe('engineering');
    expect(redirectMap.get('about')).toBe('engineering');
    expect(redirectMap.get('about.json')).toBe('engineering');
    expect(redirectMap.get('blog.md')).toBe('writing');
    expect(redirectMap.get('**')).toBe('');
  });
});
