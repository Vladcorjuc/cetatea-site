import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardLucrare as CardLucrareModel } from '../../core/models/content.model';

@Component({
  selector: 'app-card-lucrare',
  imports: [RouterLink],
  templateUrl: './card-lucrare.html',
  styleUrl: './card-lucrare.scss',
})
export class CardLucrare {
  readonly card = input.required<CardLucrareModel>();

  // A linkRuta starting with "#" scrolls to that section on the current
  // page instead of navigating (e.g. "#calendar").
  get esteAncora(): boolean {
    return this.card().linkRuta.startsWith('#');
  }

  scrolleaza(event: Event): void {
    event.preventDefault();
    const id = this.card().linkRuta.slice(1);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
