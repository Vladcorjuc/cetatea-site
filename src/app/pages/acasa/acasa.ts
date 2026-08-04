import { Component, computed, effect, inject, signal } from '@angular/core';
import { CardLucrare } from '../../shared/card-lucrare/card-lucrare';
import { Content } from '../../core/services/content';
import { Language } from '../../core/services/language';
import { Eveniment, PaginaAcasa, SiteSettings } from '../../core/models/content.model';
import { ICOANE_RETELE } from '../../core/data/social-icons';
import { genereazaOcurentePeriodice } from '../../core/utils/program.util';

@Component({
  selector: 'app-acasa',
  imports: [CardLucrare],
  templateUrl: './acasa.html',
  styleUrl: './acasa.scss',
})
export class Acasa {
  private readonly content = inject(Content);
  protected readonly i18n = inject(Language);

  protected readonly pagina = signal<PaginaAcasa | null>(null);
  protected readonly site = signal<SiteSettings | null>(null);
  protected readonly evenimenteSpeciale = signal<Eveniment[]>([]);

  // Recurring services (Setări generale → Program) are turned into upcoming
  // calendar entries automatically and merged with any one-off special
  // events, so the schedule only ever needs to be edited in one place.
  protected readonly evenimente = computed<Eveniment[]>(() => {
    const site = this.site();
    if (!site) return this.evenimenteSpeciale();

    const ocurente = genereazaOcurentePeriodice(
      site.programDuminica,
      `${site.adresa}, ${site.oras}`,
    );

    return [...ocurente, ...this.evenimenteSpeciale()].sort((a, b) =>
      a.data.localeCompare(b.data),
    );
  });

  constructor() {
    this.content.getSiteSettings().subscribe((site) => this.site.set(site));
    this.content
      .getEvenimente()
      .subscribe((evenimente) => this.evenimenteSpeciale.set(evenimente));
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

  scrollToCalendar(event: Event): void {
    event.preventDefault();

    document.getElementById('calendar')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  iconaPentru(nume: string): string {
    return ICOANE_RETELE[nume] ?? '';
  }
}
