import { Component, inject, signal } from '@angular/core';
import { CeCredem } from '../../shared/ce-credem/ce-credem';
import { Content } from '../../core/services/content';
import { PaginaDespre } from '../../core/models/content.model';

@Component({
  selector: 'app-despre',
  imports: [CeCredem],
  templateUrl: './despre.html',
  styleUrl: './despre.scss',
})
export class Despre {
  private readonly content = inject(Content);

  protected readonly pagina = signal<PaginaDespre | null>(null);

  constructor() {
    this.content.getPaginaDespre().subscribe((pagina) => this.pagina.set(pagina));
  }
}
