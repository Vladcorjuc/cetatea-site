import { Component, effect, inject, signal } from '@angular/core';
import { Content } from '../../core/services/content';
import { Language } from '../../core/services/language';
import { PaginaContact, SiteSettings } from '../../core/models/content.model';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly content = inject(Content);
  protected readonly i18n = inject(Language);

  protected readonly pagina = signal<PaginaContact | null>(null);
  protected readonly site = signal<SiteSettings | null>(null);

  constructor() {
    this.content.getSiteSettings().subscribe((site) => this.site.set(site));
    effect(() => {
      this.content
        .getPaginaContact(this.i18n.lang())
        .subscribe((pagina) => this.pagina.set(pagina));
    });
  }
}
