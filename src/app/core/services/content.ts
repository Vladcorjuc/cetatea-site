import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Articol,
  ArticolRezumat,
  Eveniment,
  PaginaAcasa,
  PaginaContact,
  PaginaDespre,
  PaginaGrupuri,
  ResursaMedia,
  SiteSettings,
} from '../models/content.model';

// Every method reads a static JSON/Markdown file under public/content/.
// Those files are the single source of truth for site text and are the
// same files the Decap CMS admin panel (/admin) edits — nothing here is
// hardcoded, so a content change never requires touching this service.
@Service()
export class Content {
  private readonly http = inject(HttpClient);

  getSiteSettings(): Observable<SiteSettings> {
    return this.http.get<SiteSettings>('content/site.json');
  }

  getPaginaAcasa(): Observable<PaginaAcasa> {
    return this.http.get<PaginaAcasa>('content/pagini/acasa.json');
  }

  getPaginaDespre(): Observable<PaginaDespre> {
    return this.http.get<PaginaDespre>('content/pagini/despre.json');
  }

  getPaginaGrupuri(): Observable<PaginaGrupuri> {
    return this.http.get<PaginaGrupuri>('content/pagini/grupuri.json');
  }

  getPaginaContact(): Observable<PaginaContact> {
    return this.http.get<PaginaContact>('content/pagini/contact.json');
  }

  getPredici(): Observable<ResursaMedia[]> {
    return this.http
      .get<{ predici: ResursaMedia[] }>('content/media/predici.json')
      .pipe(map((raspuns) => raspuns.predici));
  }

  getPodcast(): Observable<ResursaMedia[]> {
    return this.http
      .get<{ episoade: ResursaMedia[] }>('content/media/podcast.json')
      .pipe(map((raspuns) => raspuns.episoade));
  }

  getEvenimente(): Observable<Eveniment[]> {
    return this.http
      .get<{ evenimente: Eveniment[] }>('content/evenimente.json')
      .pipe(map((raspuns) => raspuns.evenimente));
  }

  getArticole(): Observable<ArticolRezumat[]> {
    return this.http.get<ArticolRezumat[]>('content/articole/index.json');
  }

  getArticol(slug: string): Observable<Articol> {
    return this.http
      .get(`content/articole/${slug}.md`, { responseType: 'text' })
      .pipe(map((raw) => this.parseArticol(slug, raw)));
  }

  private parseArticol(slug: string, raw: string): Articol {
    const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
    const frontmatter: Record<string, string> = {};

    if (match) {
      for (const line of match[1].split('\n')) {
        const separatorIndex = line.indexOf(':');
        if (separatorIndex === -1) continue;
        const key = line.slice(0, separatorIndex).trim();
        const value = line
          .slice(separatorIndex + 1)
          .trim()
          .replace(/^['"]|['"]$/g, '');
        frontmatter[key] = value;
      }
    }

    return {
      slug,
      titlu: frontmatter['titlu'] ?? slug,
      data: frontmatter['data'] ?? '',
      coperta: frontmatter['coperta'],
      rezumat: frontmatter['rezumat'] ?? '',
      continut: (match ? match[2] : raw).trim(),
    };
  }
}
