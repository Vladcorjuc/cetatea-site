import { Component, effect, inject, signal } from '@angular/core';
import { CeCredem } from '../../shared/ce-credem/ce-credem';
import { Content } from '../../core/services/content';
import { Language } from '../../core/services/language';
import { PaginaDespre } from '../../core/models/content.model';

@Component({
  selector: 'app-despre',
  imports: [CeCredem],
  templateUrl: './despre.html',
  styleUrl: './despre.scss',
})
export class Despre {
  private readonly content = inject(Content);
  protected readonly i18n = inject(Language);

  protected readonly pagina = signal<PaginaDespre | null>(null);

  constructor() {
    effect(() => {
      this.content.getPaginaDespre(this.i18n.lang()).subscribe((pagina) => this.pagina.set(pagina));
    });
  }
}
