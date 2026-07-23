import { Component, effect, inject, signal } from '@angular/core';
import { Content } from '../../core/services/content';
import { Language } from '../../core/services/language';
import { PaginaGrupuri } from '../../core/models/content.model';

@Component({
  selector: 'app-grupuri',
  imports: [],
  templateUrl: './grupuri.html',
  styleUrl: './grupuri.scss',
})
export class Grupuri {
  private readonly content = inject(Content);
  protected readonly i18n = inject(Language);

  protected readonly pagina = signal<PaginaGrupuri | null>(null);

  constructor() {
    effect(() => {
      this.content
        .getPaginaComunitate(this.i18n.lang())
        .subscribe((pagina) => this.pagina.set(pagina));
    });
  }
}
