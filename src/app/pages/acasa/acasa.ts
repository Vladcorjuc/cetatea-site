import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardLucrare } from '../../shared/card-lucrare/card-lucrare';
import { Content } from '../../core/services/content';
import { Language } from '../../core/services/language';
import { Eveniment, PaginaAcasa, SiteSettings } from '../../core/models/content.model';

@Component({
  selector: 'app-acasa',
  imports: [CardLucrare, RouterLink],
  templateUrl: './acasa.html',
  styleUrl: './acasa.scss',
})
export class Acasa {
  private readonly content = inject(Content);
  protected readonly i18n = inject(Language);

  protected readonly pagina = signal<PaginaAcasa | null>(null);
  protected readonly site = signal<SiteSettings | null>(null);
  protected readonly evenimente = signal<Eveniment[]>([]);

  constructor() {
    this.content.getSiteSettings().subscribe((site) => this.site.set(site));
    this.content.getEvenimente().subscribe((evenimente) => this.evenimente.set(evenimente));
    effect(() => {
      this.content.getPaginaAcasa(this.i18n.lang()).subscribe((pagina) => this.pagina.set(pagina));
    });
  }

  formateazaData(data: string): string {
    return new Date(data).toLocaleDateString(this.i18n.lang() === 'en' ? 'en-GB' : 'ro-RO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
}
