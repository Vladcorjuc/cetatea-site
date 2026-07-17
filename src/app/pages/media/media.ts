import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Content } from '../../core/services/content';
import { ArticolRezumat, ResursaMedia } from '../../core/models/content.model';

type SectiuneMedia = 'predici' | 'podcast' | 'articole';

@Component({
  selector: 'app-media',
  imports: [RouterLink],
  templateUrl: './media.html',
  styleUrl: './media.scss',
})
export class Media {
  private readonly content = inject(Content);

  protected readonly sectiune = signal<SectiuneMedia>('predici');
  protected readonly predici = signal<ResursaMedia[]>([]);
  protected readonly podcast = signal<ResursaMedia[]>([]);
  protected readonly articole = signal<ArticolRezumat[]>([]);

  protected readonly sectiuni: { id: SectiuneMedia; text: string }[] = [
    { id: 'predici', text: 'Predici' },
    { id: 'podcast', text: 'Podcast' },
    { id: 'articole', text: 'Articole' },
  ];

  constructor() {
    this.content.getPredici().subscribe((predici) => this.predici.set(predici));
    this.content.getPodcast().subscribe((podcast) => this.podcast.set(podcast));
    this.content.getArticole().subscribe((articole) => this.articole.set(articole));
  }

  selecteaza(sectiune: SectiuneMedia): void {
    this.sectiune.set(sectiune);
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
