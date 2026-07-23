import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Content } from '../../core/services/content';
import { Language } from '../../core/services/language';
import { PaginaGenerala, SiteSettings } from '../../core/models/content.model';

const ICOANE_RETELE: Record<string, string> = {
  Facebook: 'M13.5 9H15V6h-1.5C11.6 6 10 7.6 10 9.5V11H8v3h2v7h3v-7h2.2l.3-3H13v-1.2c0-.5.4-.8.9-.8Z',
  Instagram:
    'M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm0 5.8a2.3 2.3 0 1 1 0-4.6 2.3 2.3 0 0 1 0 4.6ZM16 4H8a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4Zm2.8 12a2.8 2.8 0 0 1-2.8 2.8H8A2.8 2.8 0 0 1 5.2 16V8A2.8 2.8 0 0 1 8 5.2h8A2.8 2.8 0 0 1 18.8 8v8ZM16.9 7a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8Z',
  Youtube:
    'M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C18 4.8 12 4.8 12 4.8s-6 0-7.7.5A2.7 2.7 0 0 0 2.4 7.2 28 28 0 0 0 2 12a28 28 0 0 0 .4 4.8 2.7 2.7 0 0 0 1.9 1.9c1.7.5 7.7.5 7.7.5s6 0 7.7-.5a2.7 2.7 0 0 0 1.9-1.9A28 28 0 0 0 22 12a28 28 0 0 0-.4-4.8ZM10 15V9l5.2 3-5.2 3Z',
  TikTok:
    'M16.5 3h-3v12.2a2.6 2.6 0 1 1-1.9-2.5v-3.1a5.7 5.7 0 1 0 4.9 5.6V9.2a7.5 7.5 0 0 0 4.3 1.4V7.6A4.5 4.5 0 0 1 16.5 3Z',
  Spotify:
    'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm3.9 13c-.2.3-.5.4-.8.2-2.2-1.3-5-1.6-8.3-.9-.3.1-.6-.1-.7-.4-.1-.3.1-.6.4-.7 3.6-.8 6.7-.5 9.2 1 .3.2.4.5.2.8Zm1.1-2.5c-.2.4-.6.5-1 .3-2.5-1.5-6.3-2-9.3-1.1-.4.1-.8-.1-.9-.5-.1-.4.1-.8.5-.9 3.4-1 7.6-.5 10.5 1.2.4.2.5.6.2 1Zm.1-2.6c-3-1.8-8-2-10.9-1.1-.5.1-1-.2-1.1-.6-.1-.5.2-1 .6-1.1 3.3-1 8.9-.8 12.4 1.3.4.3.6.9.3 1.3-.3.4-.9.5-1.3.2Z',
};

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  private readonly content = inject(Content);
  protected readonly i18n = inject(Language);

  protected readonly site = signal<SiteSettings | null>(null);
  protected readonly general = signal<PaginaGenerala | null>(null);
  protected readonly anAcesta = new Date().getFullYear();

  constructor() {
    this.content.getSiteSettings().subscribe((site) => this.site.set(site));
    effect(() => {
      this.content.getGeneral(this.i18n.lang()).subscribe((g) => this.general.set(g));
    });
  }

  iconaPentru(nume: string): string {
    return ICOANE_RETELE[nume] ?? '';
  }
}
