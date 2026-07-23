import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/acasa/acasa').then((m) => m.Acasa),
    title: 'Biserica Cetatea | Lisaura, Suceava',
  },
  {
    path: 'despre',
    loadComponent: () => import('./pages/despre/despre').then((m) => m.Despre),
    title: 'Despre noi | Biserica Cetatea',
  },
  {
    path: 'comunitate',
    loadComponent: () => import('./pages/grupuri/grupuri').then((m) => m.Grupuri),
    title: 'Comunitate | Biserica Cetatea',
  },
  { path: 'grupuri', redirectTo: 'comunitate', pathMatch: 'full' },
  {
    path: 'media',
    loadComponent: () => import('./pages/media/media').then((m) => m.Media),
    title: 'Media | Biserica Cetatea',
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
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
    title: 'Pagina nu a fost găsită | Biserica Cetatea',
  },
];
