import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Content } from '../../core/services/content';
import { Language } from '../../core/services/language';
import { PaginaGenerala, SiteSettings } from '../../core/models/content.model';
import { ICOANE_RETELE } from '../../core/data/social-icons';

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
