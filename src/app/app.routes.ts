import { Routes } from '@angular/router';

// `data.description` feeds the <meta name="description"> tag per page
// (see SeoService) — keep each one under ~155 characters for search results.
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/acasa/acasa').then((m) => m.Acasa),
    title: 'Biserica Cetatea | Lisaura, Suceava',
    data: {
      description:
        'Biserica Penticostală Cetatea din Lisaura, Suceava. Program de duminică, grupuri de casă și resurse pentru comunitate. Vino așa cum ești.',
    },
  },
  {
    path: 'despre',
    loadComponent: () => import('./pages/despre/despre').then((m) => m.Despre),
    title: 'Despre noi | Biserica Cetatea',
    data: {
      description:
        'Cine suntem, scopul, viziunea și mărturisirea de credință a Bisericii Penticostale Cetatea din Lisaura, Suceava.',
    },
  },
  {
    path: 'comunitate',
    loadComponent: () => import('./pages/grupuri/grupuri').then((m) => m.Grupuri),
    title: 'Comunitate | Biserica Cetatea',
    data: {
      description:
        'Grupurile mici ale Bisericii Cetatea: tineret, familii, rugăciune, copii și mobilizare. Alătură-te unui grup aproape de tine.',
    },
  },
  { path: 'grupuri', redirectTo: 'comunitate', pathMatch: 'full' },
  {
    path: 'media',
    loadComponent: () => import('./pages/media/media').then((m) => m.Media),
    title: 'Media | Biserica Cetatea',
    data: {
      description: 'Predici, podcastul „Discuții la poarta Cetății” și articole ale Bisericii Cetatea.',
    },
  },
  {
    path: 'media/articole/:slug',
    loadComponent: () =>
      import('./pages/media/articol-detaliu/articol-detaliu').then((m) => m.ArticolDetaliu),
    title: 'Articol | Biserica Cetatea',
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
    title: 'Contact | Biserica Cetatea',
    data: {
      description:
        'Adresa, programul și datele de contact ale Bisericii Penticostale Cetatea din Lisaura, Suceava.',
    },
  },
  {
    path: 'doneaza',
    loadComponent: () => import('./pages/doneaza/doneaza').then((m) => m.Doneaza),
    title: 'Donează | Biserica Cetatea',
    data: {
      description: 'Susține lucrarea Bisericii Cetatea prin card, transfer bancar sau PayPal.',
    },
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
    title: 'Pagina nu a fost găsită | Biserica Cetatea',
  },
];
