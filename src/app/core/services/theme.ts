import { Service, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'cetatea-theme';

@Service()
export class Theme {
  readonly mode = signal<ThemeMode>(this.readInitial());

  constructor() {
    this.apply(this.mode());
  }

  set(mode: ThemeMode): void {
    this.mode.set(mode);
    localStorage.setItem(STORAGE_KEY, mode);
    this.apply(mode);
  }

  toggle(): void {
    this.set(this.mode() === 'light' ? 'dark' : 'light');
  }

  private apply(mode: ThemeMode): void {
    document.documentElement.setAttribute('data-theme', mode);
  }

  private readInitial(): ThemeMode {
    // Light is the default; dark is opt-in via the toggle.
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'dark' ? 'dark' : 'light';
  }
}
