import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MarkdownPipe } from '../../../core/pipes/markdown-pipe';
import { Content } from '../../../core/services/content';
import { Language } from '../../../core/services/language';
import { ORIGIN, Seo } from '../../../core/services/seo';
import { Articol } from '../../../core/models/content.model';

@Component({
  selector: 'app-articol-detaliu',
  imports: [RouterLink, MarkdownPipe],
  templateUrl: './articol-detaliu.html',
  styleUrl: './articol-detaliu.scss',
})
export class ArticolDetaliu {
  private readonly content = inject(Content);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly seo = inject(Seo);
  protected readonly i18n = inject(Language);

  protected readonly articol = signal<Articol | null>(null);

  constructor() {
    this.route.paramMap
      .pipe(switchMap((params) => this.content.getArticol(params.get('slug') ?? '')))
      .subscribe({
        next: (articol) => {
          this.articol.set(articol);
          // Sharing an article should show its own title/summary, not the
          // route's generic static ones ("Articol | ..." + the church's
          // default blurb).
          this.seo.actualizeazaContinutArticol(articol.titlu, articol.rezumat);
          // Sharing an article should show its own cover photo, not the
          // site's generic badge.
          if (articol.coperta) {
            const absolut = articol.coperta.startsWith('http')
              ? articol.coperta
              : `${ORIGIN}/${articol.coperta.replace(/^\//, '')}`;
            this.seo.actualizeazaImagine(absolut);
          }
        },
        error: () => this.router.navigate(['/media']),
      });
  }

  formateazaData(data: string): string {
    if (!data) return '';
    return new Date(data).toLocaleDateString(this.i18n.lang() === 'en' ? 'en-GB' : 'ro-RO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
}
