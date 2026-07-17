export interface SiteSettings {
  numeBiserica: string;
  denumireCompleta: string;
  motto: string;
  adresa: string;
  oras: string;
  email: string;
  telefon: string;
  programDuminica: ProgramIntalnire[];
  retele: RetelSociala[];
}

export interface ProgramIntalnire {
  titlu: string;
  interval: string;
}

export interface RetelSociala {
  nume: 'Facebook' | 'Instagram' | 'Youtube' | 'TikTok' | 'Spotify';
  link: string;
}

export interface CardLucrare {
  titlu: string;
  text: string;
  linkText: string;
  linkRuta: string;
}

export interface PaginaAcasa {
  heroEyebrow: string;
  heroTitluLinia1: string;
  heroTitluLinia2: string;
  heroSubtitlu: string;
  heroButonText: string;
  heroButonRuta: string;
  heroImagine: string;
  misiuneTitlu: string;
  misiuneText: string;
  carduri: CardLucrare[];
  evenimenteTitlu: string;
}

export interface EroareModel {
  titlu: string;
  text: string;
}

export interface ObiectivValoare {
  text: string;
}

export interface ArticolCredinta {
  titlu: string;
  text: string;
}

export interface PaginaDespre {
  titlu: string;
  cineSuntemTitlu: string;
  cineSuntemText: string;
  scopTitlu: string;
  scopText: string;
  viziuneTitlu: string;
  viziuneText: string;
  obiectiveTitlu: string;
  obiective: ObiectivValoare[];
  ceCredemTitlu: string;
  ceCredemVerset: string;
  ceCredemVersetReferinta: string;
  ceCredem: ArticolCredinta[];
}

export interface Grup {
  titlu: string;
  descriere: string;
  program: string;
  imagine: string;
}

export interface PaginaGrupuri {
  titlu: string;
  introText: string;
  grupuri: Grup[];
}

export interface ResursaMedia {
  titlu: string;
  data: string;
  link: string;
  descriere: string;
  thumbnail?: string;
}

export interface Eveniment {
  titlu: string;
  data: string;
  interval: string;
  locatie: string;
}

export interface ArticolRezumat {
  slug: string;
  titlu: string;
  data: string;
  coperta?: string;
  rezumat: string;
}

export interface Articol extends ArticolRezumat {
  continut: string;
}

export interface PaginaContact {
  titlu: string;
  introText: string;
}
