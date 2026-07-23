import { Service, signal } from '@angular/core';

export type Lang = 'ro' | 'en';

// Static UI strings (site chrome: navigation, buttons, section labels).
// Page copy comes from public/content/{lang}/*.json instead — this is only
// the developer-owned interface text that isn't edited through the CMS.
const DICTIONARY: Record<Lang, Record<string, string>> = {
  ro: {
    'nav.acasa': 'Acasă',
    'nav.despre': 'Despre noi',
    'nav.comunitate': 'Comunitate',
    'nav.media': 'Media',
    'nav.contact': 'Contact',
    'header.menu': 'Comută meniul',
    'header.theme': 'Comută tema întunecată',
    'header.language': 'Schimbă limba',
    'acasa.cineSuntem': 'Cine suntem',
    'acasa.calendar': 'Calendar',
    'acasa.faraEvenimente': 'Nu sunt evenimente programate momentan.',
    'despre.eyebrow': 'Despre noi',
    'despre.obiectiveSubtitlu': 'Cum trăim credința împreună',
    'despre.ceCredemSubtitlu': 'Mărturisirea noastră de credință',
    'comunitate.eyebrow': 'Comunitate',
    'media.eyebrow': 'Resurse',
    'media.titlu': 'Media',
    'media.predici': 'Predici',
    'media.podcast': 'Podcast',
    'media.articole': 'Articole',
    'media.faraPredici': 'Nu sunt predici disponibile momentan.',
    'media.faraPodcast': 'Nu sunt episoade disponibile momentan.',
    'media.faraArticole': 'Nu sunt articole publicate momentan.',
    'media.inapoi': '← Înapoi la Media',
    'contact.eyebrow': 'Vino la Cetatea',
    'contact.adresa': 'Adresă',
    'contact.email': 'Email',
    'contact.telefon': 'Telefon',
    'contact.program': 'Program',
    'contact.harta': 'Harta — Lisaura, Suceava',
    'footer.contact': 'Contact',
    'footer.program': 'Program',
    'footer.urmareste': 'Urmărește-ne',
    'notFound.titlu': 'Pagina nu a fost găsită',
    'notFound.text': 'Se pare că pagina căutată nu există sau a fost mutată.',
    'notFound.buton': 'Înapoi acasă',
  },
  en: {
    'nav.acasa': 'Home',
    'nav.despre': 'About',
    'nav.comunitate': 'Community',
    'nav.media': 'Media',
    'nav.contact': 'Contact',
    'header.menu': 'Toggle menu',
    'header.theme': 'Toggle dark theme',
    'header.language': 'Change language',
    'acasa.cineSuntem': 'Who we are',
    'acasa.calendar': 'Calendar',
    'acasa.faraEvenimente': 'No events scheduled at the moment.',
    'despre.eyebrow': 'About us',
    'despre.obiectiveSubtitlu': 'How we live out our faith together',
    'despre.ceCredemSubtitlu': 'Our statement of faith',
    'comunitate.eyebrow': 'Community',
    'media.eyebrow': 'Resources',
    'media.titlu': 'Media',
    'media.predici': 'Sermons',
    'media.podcast': 'Podcast',
    'media.articole': 'Articles',
    'media.faraPredici': 'No sermons available at the moment.',
    'media.faraPodcast': 'No episodes available at the moment.',
    'media.faraArticole': 'No articles published at the moment.',
    'media.inapoi': '← Back to Media',
    'contact.eyebrow': 'Come to Cetatea',
    'contact.adresa': 'Address',
    'contact.email': 'Email',
    'contact.telefon': 'Phone',
    'contact.program': 'Schedule',
    'contact.harta': 'Map — Lisaura, Suceava',
    'footer.contact': 'Contact',
    'footer.program': 'Schedule',
    'footer.urmareste': 'Follow us',
    'notFound.titlu': 'Page not found',
    'notFound.text': 'The page you are looking for does not exist or has been moved.',
    'notFound.buton': 'Back home',
  },
};

const STORAGE_KEY = 'cetatea-lang';

@Service()
export class Language {
  readonly lang = signal<Lang>(this.readInitial());

  constructor() {
    document.documentElement.lang = this.lang();
  }

  set(lang: Lang): void {
    this.lang.set(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }

  toggle(): void {
    this.set(this.lang() === 'ro' ? 'en' : 'ro');
  }

  // Reads the lang signal so template bindings re-evaluate on language change.
  t(key: string): string {
    return DICTIONARY[this.lang()][key] ?? key;
  }

  private readInitial(): Lang {
    // Romanian is the primary language; English is opt-in via the switcher.
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'en' ? 'en' : 'ro';
  }
}
