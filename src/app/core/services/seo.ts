import { DOCUMENT } from '@angular/common';
import { Service, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { SiteSettings } from '../models/content.model';

// Site origin used to build absolute canonical/Open Graph URLs.
const ORIGIN = 'https://bisericacetatea.ro';

// Updates <meta name="description">, the canonical link and Open Graph tags
// on every navigation, reading each route's `data.description`. Angular's
// Router already updates <title> itself via each route's `title` property.
@Service()
export class Seo {
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly document = inject(DOCUMENT);

  asculta(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.ultimaRutaActivata(this.route)),
        mergeMap((ruta) => ruta.data.pipe(map((data) => ({ data, ruta })))),
      )
      .subscribe(({ data, ruta }) => {
        const descriere = (data['description'] as string) ?? this.descriereImplicita();
        const url = `${ORIGIN}${this.router.url === '/' ? '/' : this.router.url}`;
        // Read the title from the route snapshot rather than document.title —
        // Angular's own TitleStrategy updates the latter on the same
        // NavigationEnd tick, in a subscriber order that isn't guaranteed.
        const titlu = ruta.snapshot.title ?? this.document.title;

        this.meta.updateTag({ name: 'description', content: descriere });
        this.meta.updateTag({ property: 'og:title', content: titlu });
        this.meta.updateTag({ property: 'og:description', content: descriere });
        this.meta.updateTag({ property: 'og:url', content: url });
        this.meta.updateTag({ name: 'twitter:title', content: titlu });
        this.meta.updateTag({ name: 'twitter:description', content: descriere });
        this.actualizeazaCanonical(url);
      });
  }

  private ultimaRutaActivata(ruta: ActivatedRoute): ActivatedRoute {
    let curenta = ruta;
    while (curenta.firstChild) curenta = curenta.firstChild;
    return curenta;
  }

  private descriereImplicita(): string {
    return 'Biserica Penticostală Cetatea din Lisaura, Suceava.';
  }

  private actualizeazaCanonical(url: string): void {
    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  // Schema.org structured data (JSON-LD) telling Google this is a church —
  // this is what enables address/hours to show directly in search results.
  // Kept in sync with the CMS-edited site settings rather than hardcoded.
  actualizeazaDateStructurate(site: SiteSettings): void {
    const existent = this.document.getElementById('date-structurate-biserica');
    existent?.remove();

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'date-structurate-biserica';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Church',
      name: site.denumireCompleta,
      url: ORIGIN,
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.adresa,
        addressLocality: site.oras,
        addressCountry: 'RO',
      },
      telephone: site.telefon,
      email: site.email,
      sameAs: site.retele.map((r) => r.link),
    });
    this.document.head.appendChild(script);
  }
}
