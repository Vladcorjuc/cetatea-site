import { Component, input, signal } from '@angular/core';
import { ArticolCredinta } from '../../core/models/content.model';

@Component({
  selector: 'app-ce-credem',
  imports: [],
  templateUrl: './ce-credem.html',
  styleUrl: './ce-credem.scss',
})
export class CeCredem {
  readonly articole = input.required<ArticolCredinta[]>();
  protected readonly indexActiv = signal(0);

  selecteaza(index: number): void {
    this.indexActiv.set(index);
  }
}
