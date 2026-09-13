import { DOCUMENT } from '@angular/common';
import { Service, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { SiteSettings } from '../models/content.model';

// Site origin used to build absolute canonical/Open Graph URLs.
export const ORIGIN = 'https://bisericacetatea.ro';

// Fallback Open Graph image for every route that doesn't set its own
// (e.g. an article's cover photo) — the site's badge/logo.
const IMAGINE_IMPLICITA = `${ORIGIN}/assets/logo/badge-terracotta.png`;

// Updates <meta name="description">, the canonical link and Open Graph tags
// on every navigation, reading each route's `data.description`. Angular's
// Router already updates <title> itself via each route's `title` property.
@Service()
export class Seo {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
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
        // Trailing slash matches the real prerendered file for each route
        // (e.g. despre/index.html) — the exact URL that returns 200 with no
        // redirect, so canonical/og:url always point straight at it.
        const cale = this.router.url.split(/[?#]/)[0];
        const url = `${ORIGIN}${cale === '/' ? '/' : `${cale}/`}`;
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
        // Reset to the default badge on every navigation — a page that has
        // its own image (e.g. an article's cover) overrides this right
        // after, via actualizeazaImagine().
        this.actualizeazaImagine(IMAGINE_IMPLICITA);
        this.actualizeazaCanonical(url);
      });
  }

  // Lets a page (e.g. an article with a cover photo) override the shared
  // preview image instead of always showing the site's generic badge.
  actualizeazaImagine(urlAbsolut: string): void {
    this.meta.updateTag({ property: 'og:image', content: urlAbsolut });
    this.meta.updateTag({ name: 'twitter:image', content: urlAbsolut });
  }

  // Same idea, but for the title/description — an article's route has a
  // static, generic title ("Articol | ...") since its real title only
  // exists once the content loads. Called once that happens, so a shared
  // link shows the article's own headline and summary instead.
  actualizeazaContinutArticol(titlu: string, descriere: string): void {
    this.title.setTitle(`${titlu} | Biserica Cetatea`);
    this.meta.updateTag({ name: 'description', content: descriere });
    this.meta.updateTag({ property: 'og:title', content: titlu });
    this.meta.updateTag({ property: 'og:description', content: descriere });
    this.meta.updateTag({ name: 'twitter:title', content: titlu });
    this.meta.updateTag({ name: 'twitter:description', content: descriere });
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
      telephone: site.telefoane[0],
      email: site.email,
      sameAs: site.retele.map((r) => r.link),
    });
    this.document.head.appendChild(script);
  }
}
