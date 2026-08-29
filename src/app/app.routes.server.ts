import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { RenderMode, ServerRoute } from '@angular/ssr';

// Every article slug becomes its own static, real 200-status page at build
// time — read from the same index the content:index script already
// generates (see scripts/build-articles-index.mjs), which runs before this.
function sluguriArticole(): { slug: string }[] {
  try {
    const raw = readFileSync(
      join(process.cwd(), 'public', 'content', 'articole', 'index.json'),
      'utf-8',
    );
    return (JSON.parse(raw) as { slug: string }[]).map(({ slug }) => ({ slug }));
  } catch {
    return [];
  }
}

export const serverRoutes: ServerRoute[] = [
  {
    path: 'media/articole/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return sluguriArticole();
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
