import {
  Component,
  DestroyRef,
  ElementRef,
  effect,
  inject,
  signal,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Content } from '../../core/services/content';
import { Language } from '../../core/services/language';
import { PaginaContact, SiteSettings } from '../../core/models/content.model';

const LOCATIE: [number, number] = [47.642124, 26.299658];
const LINK_GOOGLE_MAPS = 'https://maps.app.goo.gl/zjdwqVvvi1XmwBLU6';

// Same pin shape as the brand terracotta, drawn inline so there are no
// image assets for Leaflet to resolve through the bundler.
const PIN_SVG = `
  <svg viewBox="0 0 32 44" width="32" height="44" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 1C8 1 1.5 7.4 1.5 15.3c0 10.6 12.3 26.4 13.9 28.3.3.4.9.4 1.2 0 1.6-1.9 13.9-17.7 13.9-28.3C30.5 7.4 24 1 16 1Z"
      fill="#d6673b" stroke="#ffffff" stroke-width="2"/>
    <circle cx="16" cy="15.5" r="5.5" fill="#ffffff"/>
  </svg>`;

// ViewEncapsulation.None: Leaflet builds its own DOM at runtime, which
// Angular's per-component style scoping would otherwise not reach.
@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss', '../../../../node_modules/leaflet/dist/leaflet.css'],
  encapsulation: ViewEncapsulation.None,
})
export class Contact {
  private readonly content = inject(Content);
  protected readonly i18n = inject(Language);

  protected readonly pagina = signal<PaginaContact | null>(null);
  protected readonly site = signal<SiteSettings | null>(null);
  protected readonly linkGoogleMaps = LINK_GOOGLE_MAPS;

  private readonly harta = viewChild<ElementRef<HTMLElement>>('harta');
  private hartaInitializata = false;

  constructor() {
    this.content.getSiteSettings().subscribe((site) => this.site.set(site));
    effect(() => {
      this.content
        .getPaginaContact(this.i18n.lang())
        .subscribe((pagina) => this.pagina.set(pagina));
    });

    // The map container only exists once the page content has rendered, and
    // Leaflet needs a real DOM — so this runs in the browser only, never
    // during prerendering.
    const destroyRef = inject(DestroyRef);
    effect(() => {
      const element = this.harta()?.nativeElement;
      if (!element || this.hartaInitializata || typeof window === 'undefined') return;
      this.hartaInitializata = true;

      void import('leaflet').then((L) => {
        // On a phone a one-finger drag would pan the map and trap the page
        // scroll (it's 420px tall) — so there, dragging is left to the page
        // and the map is moved/zoomed by pinching with two fingers instead.
        const map = L.map(element, {
          scrollWheelZoom: false,
          dragging: !L.Browser.mobile,
        }).setView(LOCATIE, 16);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>',
        }).addTo(map);

        const deschide = () => window.open(LINK_GOOGLE_MAPS, '_blank', 'noopener');

        L.marker(LOCATIE, {
          icon: L.divIcon({
            html: PIN_SVG,
            className: 'harta-pin',
            iconSize: [32, 44],
            iconAnchor: [16, 43],
          }),
          title: this.i18n.t('contact.deschideHarta'),
          keyboard: true,
        })
          .addTo(map)
          .on('click', deschide);

        // A plain click on the map (not a drag/pan) opens it in Google Maps too.
        map.on('click', deschide);

        destroyRef.onDestroy(() => map.remove());
      });
    });
  }
}
