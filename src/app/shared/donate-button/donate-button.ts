import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Language } from '../../core/services/language';

@Component({
  selector: 'app-donate-button',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './donate-button.html',
  styleUrl: './donate-button.scss',
})
export class DonateButton {
  protected readonly i18n = inject(Language);

  // On desktop, :hover already reveals the label — this only matters for
  // touch, where there's no hover: tapping the heart toggles the label
  // open/closed, and tapping the (now-visible) label navigates.
  protected readonly deschis = signal(false);

  private xStart = 0;

  comuta(event: MouseEvent): void {
    this.deschis.update((v) => !v);
    // On touch, tapping the button leaves it focused — and CSS also keeps
    // the label expanded on :focus-within (for keyboard users), so without
    // this the button would never visually close on a phone even after
    // the state above flips back to closed.
    (event.currentTarget as HTMLElement).blur();
  }

  inchide(): void {
    this.deschis.set(false);
  }

  // A swipe is a second way to open/close on touch, alongside tapping the
  // heart — dragging left (toward the middle of the screen) opens it,
  // dragging right (back toward the edge it's merged with) closes it.
  onTouchStart(event: TouchEvent): void {
    this.xStart = event.touches[0].clientX;
  }

  onTouchEnd(event: TouchEvent): void {
    const xEnd = event.changedTouches[0].clientX;
    const delta = xEnd - this.xStart;
    const prag = 24;

    if (delta < -prag) {
      this.deschis.set(true);
      // A real swipe shouldn't also register as a tap on the label
      // underneath the finger (which would navigate away unintentionally).
      event.preventDefault();
    } else if (delta > prag) {
      this.deschis.set(false);
      event.preventDefault();
    }
  }
}
