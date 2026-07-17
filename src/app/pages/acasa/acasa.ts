import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardLucrare } from '../../shared/card-lucrare/card-lucrare';
import { Content } from '../../core/services/content';
import { Eveniment, PaginaAcasa, SiteSettings } from '../../core/models/content.model';

@Component({
  selector: 'app-acasa',
  imports: [CardLucrare, RouterLink],
  templateUrl: './acasa.html',
  styleUrl: './acasa.scss',
})
export class Acasa {
  private readonly content = inject(Content);

  protected readonly pagina = signal<PaginaAcasa | null>(null);
  protected readonly site = signal<SiteSettings | null>(null);
  protected readonly evenimente = signal<Eveniment[]>([]);

  constructor() {
    this.content.getPaginaAcasa().subscribe((pagina) => this.pagina.set(pagina));
    this.content.getSiteSettings().subscribe((site) => this.site.set(site));
    this.content.getEvenimente().subscribe((evenimente) => this.evenimente.set(evenimente));
  }

  formateazaData(data: string): string {
    return new Date(data).toLocaleDateString('ro-RO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
}
