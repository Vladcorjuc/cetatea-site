// localStorage doesn't exist during server-side prerendering (Node has no
// browser storage) — these guard every access so Theme/Language services
// can run in both contexts without throwing.
export function citesteLocal(cheie: string): string | null {
  if (typeof localStorage === 'undefined') return null;
  return localStorage.getItem(cheie);
}

export function scrieLocal(cheie: string, valoare: string): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(cheie, valoare);
}
