import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MarkdownPipe } from '../../../core/pipes/markdown-pipe';
import { Content } from '../../../core/services/content';
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

  protected readonly articol = signal<Articol | null>(null);

  constructor() {
    this.route.paramMap
      .pipe(switchMap((params) => this.content.getArticol(params.get('slug') ?? '')))
      .subscribe({
        next: (articol) => this.articol.set(articol),
        error: () => this.router.navigate(['/media']),
      });
  }

  formateazaData(data: string): string {
    if (!data) return '';
    return new Date(data).toLocaleDateString('ro-RO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
}
