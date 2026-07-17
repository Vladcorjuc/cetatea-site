import { Component, inject, signal } from '@angular/core';
import { Content } from '../../core/services/content';
import { PaginaGrupuri } from '../../core/models/content.model';

@Component({
  selector: 'app-grupuri',
  imports: [],
  templateUrl: './grupuri.html',
  styleUrl: './grupuri.scss',
})
export class Grupuri {
  private readonly content = inject(Content);

  protected readonly pagina = signal<PaginaGrupuri | null>(null);

  constructor() {
    this.content.getPaginaGrupuri().subscribe((pagina) => this.pagina.set(pagina));
  }
}
