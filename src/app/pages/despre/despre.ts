import { Component, computed, effect, inject, signal } from '@angular/core';
import { CeCredem } from '../../shared/ce-credem/ce-credem';
import { Content } from '../../core/services/content';
import { Language } from '../../core/services/language';
import { ObiectivValoare, PaginaDespre } from '../../core/models/content.model';

interface ValoareCuIndex {
  item: ObiectivValoare;
  index: number;
}

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
  protected readonly valoareActiva = signal<number | null>(null);

  // Split the values into two independent columns so opening one only pushes
  // the items below it within its own column (no full-width jump).
  protected readonly coloane = computed<ValoareCuIndex[][]>(() => {
    const obiective = this.pagina()?.obiective ?? [];
    const cuIndex = obiective.map((item, index) => ({ item, index }));
    const jumatate = Math.ceil(cuIndex.length / 2);
    return [cuIndex.slice(0, jumatate), cuIndex.slice(jumatate)];
  });

  constructor() {
    effect(() => {
      this.content.getPaginaDespre(this.i18n.lang()).subscribe((pagina) => this.pagina.set(pagina));
    });
  }

  comutaValoare(index: number): void {
    this.valoareActiva.update((curent) => (curent === index ? null : index));
  }
}
