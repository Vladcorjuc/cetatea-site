import { Eveniment, ProgramIntalnire, ZiSaptamana } from '../models/content.model';

const INDEX_ZI: Record<ZiSaptamana, number> = {
  Duminică: 0,
  Luni: 1,
  Marți: 2,
  Miercuri: 3,
  Joi: 4,
  Vineri: 5,
  Sâmbătă: 6,
};

function urmatoareaData(ziTinta: number, dinData: Date): Date {
  const rezultat = new Date(dinData);
  const diferenta = (ziTinta - rezultat.getDay() + 7) % 7;
  rezultat.setDate(rezultat.getDate() + diferenta);
  return rezultat;
}

// Turns the recurring weekly schedule (Setări generale → Program) into
// upcoming calendar entries, so changing the time in that one place updates
// the homepage calendar automatically instead of requiring a second, separate
// edit to a static events list.
export function genereazaOcurentePeriodice(
  programe: ProgramIntalnire[],
  locatie: string,
  ocurentePerProgram = 2,
): Eveniment[] {
  const rezultat: Eveniment[] = [];
  const azi = new Date();
  azi.setHours(0, 0, 0, 0);

  for (const program of programe) {
    const ziTinta = INDEX_ZI[program.zi];
    if (ziTinta === undefined) continue;
    // "-" (or blank) means the time isn't decided yet — skip generating
    // calendar entries for it rather than showing several "TBD" rows;
    // it still appears plainly in the footer/hero/contact summaries.
    if (!program.interval || program.interval.trim() === '-') continue;

    let cursor = urmatoareaData(ziTinta, azi);
    for (let i = 0; i < ocurentePerProgram; i++) {
      rezultat.push({
        titlu: program.titlu,
        data: cursor.toISOString().slice(0, 10),
        interval: program.interval,
        locatie,
      });
      cursor = new Date(cursor);
      cursor.setDate(cursor.getDate() + 7);
    }
  }

  return rezultat;
}
