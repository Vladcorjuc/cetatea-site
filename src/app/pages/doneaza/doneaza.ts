import { Component, effect, inject, signal } from '@angular/core';
import { Content } from '../../core/services/content';
import { Language } from '../../core/services/language';
import { PaginaDoneaza } from '../../core/models/content.model';

@Component({
  selector: 'app-doneaza',
  imports: [],
  templateUrl: './doneaza.html',
  styleUrl: './doneaza.scss',
})
export class Doneaza {
  private readonly content = inject(Content);
  protected readonly i18n = inject(Language);

  protected readonly pagina = signal<PaginaDoneaza | null>(null);
  protected readonly contCopiat = signal<string | null>(null);

  constructor() {
    effect(() => {
      this.content
        .getPaginaDoneaza(this.i18n.lang())
        .subscribe((pagina) => this.pagina.set(pagina));
    });
  }

  copiazaIban(iban: string): void {
    navigator.clipboard?.writeText(iban.replace(/\s+/g, ''));
    this.contCopiat.set(iban);
    setTimeout(() => {
      if (this.contCopiat() === iban) this.contCopiat.set(null);
    }, 2000);
  }
}
