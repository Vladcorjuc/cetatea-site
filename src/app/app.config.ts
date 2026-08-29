import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    // Real paths (no #) instead of hash routing, so /despre, /contact etc.
    // are proper indexable URLs for search engines. GitHub Pages has no
    // server-side rewrites, so deploy.yml duplicates index.html as 404.html
    // to make deep links and refreshes work — see that file for details.
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    provideClientHydration(),
  ],
};
