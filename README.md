# Biserica Cetatea — site

Site-ul Bisericii Penticostale Cetatea din Lisaura, Suceava.
Construit cu Angular; tot conținutul (texte, imagini, predici, podcast,
articole, evenimente) este separat de cod și editabil de persoane
non-tehnice prin panoul de administrare Decap CMS de la `/admin/`.

## Structură

- `src/app/` — codul aplicației (pagini, componente, serviciul de conținut)
- `public/content/` — **tot conținutul editabil** (JSON + Markdown)
- `public/admin/` — panoul de administrare Decap CMS
- `public/assets/` — logo, imagini încărcate
- `scripts/build-articles-index.mjs` — generează automat indexul articolelor
- `.github/workflows/deploy.yml` — publicare automată pe GitHub Pages

## Dezvoltare locală

```bash
npm install
npm start          # http://localhost:4200
```

## Publicare

Vezi [SETUP.md](SETUP.md) pentru pașii unici de configurare (GitHub Pages +
autentificarea panoului de administrare). După configurare, orice push pe
`main` — inclusiv salvările din panoul de administrare — publică automat
site-ul.
