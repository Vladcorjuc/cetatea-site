import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Content } from '../../core/services/content';
import { SiteSettings } from '../../core/models/content.model';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly content = inject(Content);

  protected readonly site = signal<SiteSettings | null>(null);
  protected readonly meniuDeschis = signal(false);

  protected readonly linkuri = [
    { ruta: '/', text: 'Acasă' },
    { ruta: '/despre', text: 'Despre noi' },
    { ruta: '/grupuri', text: 'Grupuri' },
    { ruta: '/media', text: 'Media' },
    { ruta: '/contact', text: 'Contact' },
  ];

  constructor() {
    this.content.getSiteSettings().subscribe((site) => this.site.set(site));
  }

  toggleMeniu(): void {
    this.meniuDeschis.update((v) => !v);
  }

  inchideMeniu(): void {
    this.meniuDeschis.set(false);
  }
}
