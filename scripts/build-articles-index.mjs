// Regenerates public/content/articole/index.json from the Markdown files in
// that same folder. Runs automatically before `npm start` / `npm run build`
// (see package.json) so a non-technical editor adding/removing an article
// through the Decap CMS admin never has to touch this file by hand.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';

const articoleDir = join(process.cwd(), 'public', 'content', 'articole');

const files = readdirSync(articoleDir).filter((f) => f.endsWith('.md'));

const articole = files
  .map((file) => {
    const raw = readFileSync(join(articoleDir, file), 'utf-8');
    const { data } = matter(raw);
    return {
      slug: file.replace(/\.md$/, ''),
      titlu: data.titlu ?? file,
      data: data.data ?? '',
      coperta: data.coperta ?? '',
      rezumat: data.rezumat ?? '',
    };
  })
  .sort((a, b) => (a.data < b.data ? 1 : -1));

writeFileSync(join(articoleDir, 'index.json'), JSON.stringify(articole, null, 2) + '\n');

console.log(`[build-articles-index] wrote ${articole.length} article(s) to index.json`);
