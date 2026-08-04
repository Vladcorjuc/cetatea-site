import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { DonateButton } from './shared/donate-button/donate-button';
import { Seo } from './core/services/seo';
import { Content } from './core/services/content';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, DonateButton],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly seo = inject(Seo);
  private readonly content = inject(Content);

  constructor() {
    this.seo.asculta();
    this.content
      .getSiteSettings()
      .subscribe((site) => this.seo.actualizeazaDateStructurate(site));
  }
}
