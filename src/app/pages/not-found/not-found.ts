import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Language } from '../../core/services/language';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFound {
  protected readonly i18n = inject(Language);
}
