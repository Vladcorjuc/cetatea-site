import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Language } from '../../core/services/language';

@Component({
  selector: 'app-donate-button',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './donate-button.html',
  styleUrl: './donate-button.scss',
})
export class DonateButton {
  protected readonly i18n = inject(Language);
}
