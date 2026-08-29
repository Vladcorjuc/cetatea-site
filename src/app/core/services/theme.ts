import { DOCUMENT } from '@angular/common';
import { Service, inject, signal } from '@angular/core';
import { citesteLocal, scrieLocal } from '../utils/storage.util';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'cetatea-theme';

@Service()
export class Theme {
  private readonly document = inject(DOCUMENT);

  readonly mode = signal<ThemeMode>(this.readInitial());

  constructor() {
    this.apply(this.mode());
  }

  set(mode: ThemeMode): void {
    this.mode.set(mode);
    scrieLocal(STORAGE_KEY, mode);
    this.apply(mode);
  }

  toggle(): void {
    this.set(this.mode() === 'light' ? 'dark' : 'light');
  }

  private apply(mode: ThemeMode): void {
    this.document.documentElement.setAttribute('data-theme', mode);
  }

  private readInitial(): ThemeMode {
    // Light is the default; dark is opt-in via the toggle.
    const saved = citesteLocal(STORAGE_KEY);
    return saved === 'dark' ? 'dark' : 'light';
  }
}
