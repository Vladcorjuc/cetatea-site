import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Language } from '../../core/services/language';
import { Theme } from '../../core/services/theme';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly i18n = inject(Language);
  protected readonly theme = inject(Theme);
  protected readonly meniuDeschis = signal(false);

  protected readonly linkuri = [
    { ruta: '/', cheie: 'nav.acasa', exact: true },
    { ruta: '/despre', cheie: 'nav.despre', exact: false },
    { ruta: '/comunitate', cheie: 'nav.comunitate', exact: false },
    { ruta: '/media', cheie: 'nav.media', exact: false },
    { ruta: '/contact', cheie: 'nav.contact', exact: false },
  ];

  toggleMeniu(): void {
    this.meniuDeschis.update((v) => !v);
  }

  inchideMeniu(): void {
    this.meniuDeschis.set(false);
  }
}
