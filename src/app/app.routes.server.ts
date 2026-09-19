import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Every route is prerendered at build time, so Firebase Hosting serves real
 * markup to crawlers and link unfurlers without running a server.
 */
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
