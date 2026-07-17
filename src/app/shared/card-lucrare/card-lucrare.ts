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
}
