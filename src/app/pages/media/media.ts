import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Content } from '../../core/services/content';
import { Language } from '../../core/services/language';
import { ArticolRezumat, ResursaMedia, SectiuneMediaId } from '../../core/models/content.model';

const ETICHETE: Record<SectiuneMediaId, string> = {
  predici: 'media.predici',
  podcast: 'media.podcast',
  articole: 'media.articole',
};

const ORDINE_IMPLICITA: SectiuneMediaId[] = ['predici', 'podcast', 'articole'];

@Component({
  selector: 'app-media',
  imports: [RouterLink],
  templateUrl: './media.html',
  styleUrl: './media.scss',
})
export class Media {
  private readonly content = inject(Content);
  protected readonly i18n = inject(Language);

  protected readonly sectiune = signal<SectiuneMediaId>('predici');
  protected readonly predici = signal<ResursaMedia[]>([]);
  protected readonly podcast = signal<ResursaMedia[]>([]);
  protected readonly articole = signal<ArticolRezumat[]>([]);
  protected readonly sectiuni = signal<{ id: SectiuneMediaId; cheie: string }[]>(
    ORDINE_IMPLICITA.map((id) => ({ id, cheie: ETICHETE[id] })),
  );

  constructor() {
    this.content.getPredici().subscribe((predici) => this.predici.set(predici));
    this.content.getPodcast().subscribe((podcast) => this.podcast.set(podcast));
    this.content.getArticole().subscribe((articole) => this.articole.set(articole));
    this.content.getOrdineMedia().subscribe({
      next: (raspuns) => {
        const ordine = raspuns.ordine?.length ? raspuns.ordine : ORDINE_IMPLICITA;
        this.sectiuni.set(ordine.map((id) => ({ id, cheie: ETICHETE[id] })));
        this.sectiune.set(ordine[0]);
      },
      error: () => {
        // File missing/unreachable — fall back to the default order.
      },
    });
  }

  selecteaza(sectiune: SectiuneMediaId): void {
    this.sectiune.set(sectiune);
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
