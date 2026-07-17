# Pași de publicare — Biserica Cetatea

Site-ul este gata și funcționează local. Pașii de mai jos sunt necesari o
singură dată, pentru publicarea pe internet și activarea panoului de
administrare. Necesită un cont GitHub (gratuit).

## 1. Creează repo-ul pe GitHub și urcă codul

1. Intră pe [github.com/new](https://github.com/new) și creează un repo numit
   `cetatea-site` (public — necesar pentru GitHub Pages gratuit).
2. În terminal, din folderul proiectului:

   ```bash
   git remote add origin https://github.com/NUME_UTILIZATOR/cetatea-site.git
   git push -u origin main
   ```

## 2. Activează GitHub Pages

1. În repo → **Settings → Pages**.
2. La „Build and deployment” → **Source**, alege **GitHub Actions**.
3. La următorul push (sau din tab-ul **Actions** → „Deploy pe GitHub Pages” →
   „Run workflow”), site-ul se publică automat la:
   `https://NUME_UTILIZATOR.github.io/cetatea-site/`

## 3. Activează panoul de administrare (Decap CMS)

Panoul se află la `https://NUME_UTILIZATOR.github.io/cetatea-site/admin/`.
Ca editorii să se poată autentifica cu GitHub, e nevoie de un mic „proxy OAuth”
(GitHub Pages nu poate face singur acest pas). Cea mai simplă variantă
gratuită: **Cloudflare Workers**.

1. **Creează o aplicație OAuth pe GitHub**: Settings (profil) → Developer
   settings → OAuth Apps → New OAuth App:
   - Homepage URL: `https://NUME_UTILIZATOR.github.io/cetatea-site/`
   - Authorization callback URL: `https://NUMELE-WORKERULUI.workers.dev/callback`
   - Notează **Client ID** și generează un **Client Secret**.
2. **Pornește proxy-ul OAuth** pe un cont gratuit Cloudflare, folosind un
   proiect gata făcut, de ex.
   [sterlingwes/decap-proxy](https://github.com/sterlingwes/decap-proxy)
   (sau orice „decap cms github oauth provider”). Setează `GITHUB_CLIENT_ID` și
   `GITHUB_CLIENT_SECRET` ca variabile secrete ale worker-ului.
3. **Completează configurația CMS-ului** în `public/admin/config.yml`:
   - `repo: NUME_UTILIZATOR/cetatea-site`
   - `base_url: https://NUMELE-WORKERULUI.workers.dev`
4. Commit + push. De acum, orice editor cu drept de scriere pe repo se poate
   loga la `/admin/` și poate modifica textele, imaginile, predicile,
   podcastul, articolele și evenimentele — fără să atingă codul. Fiecare
   salvare din panou face automat un commit, iar site-ul se republică singur.

### Testare locală a panoului (opțional)

```bash
npx decap-server        # într-un terminal
npm start               # în alt terminal
```

și decomentează `local_backend: true` din `public/admin/config.yml`
(nu uita să-l comentezi la loc înainte de push).

## 4. Ce mai rămâne de completat (conținut, nu cod)

Toate se pot face din panoul de administrare sau editând fișierele din
`public/content/`:

- **Date reale de contact**: email, telefon, link-uri Facebook/YouTube etc.
  (momentan sunt valori de exemplu în `public/content/site.json`).
- **Coordonatele exacte pe hartă**: în `src/app/pages/contact/contact.html`
  este un embed OpenStreetMap centrat aproximativ pe Lisaura — înlocuiește
  coordonatele din URL cu cele exacte ale bisericii.
- **Imagini**: pozele pentru hero, grupuri, predici (căile de tip
  `assets/images/...` sunt momentan goale — se pot urca din panou, care le
  salvează în `public/assets/uploads/`).
- **Textele „Ce credem”**: cele 7 articole de credință sunt formulări
  generale penticostale de pornire — verificați-le și adaptați-le.

## Domeniu propriu (opțional, mai târziu)

Dacă biserica își ia un domeniu (ex. `bisericacetatea.ro`), în Settings →
Pages se adaugă „Custom domain”, iar în workflow (`.github/workflows/deploy.yml`)
base-href-ul devine `/` în loc de numele repo-ului.
