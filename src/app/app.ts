import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { DonateButton } from './shared/donate-button/donate-button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, DonateButton],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
