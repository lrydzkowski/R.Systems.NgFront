import { ElementRef, Injectable } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MaxHeightCalculatorConfig } from '../models/max-height-calculator-config';
import { MaxHeightCalculatorMode } from '../models/max-height-calculator-mode';

@Injectable({
  providedIn: 'root'
})
export class MaxHeightCalculatorService {

  private readonly defaultMinHeightPx = 300;

  private config: MaxHeightCalculatorConfig | null = null;

  private windowResizeSubscription: Subscription | null = null;

  constructor() {
    this.handleWindowResizeEvent();
  }

  destroy(): void {
    if (this.windowResizeSubscription === null) {
      return;
    }
    this.windowResizeSubscription.unsubscribe();
  }

  handleWindowResizeEvent(): void {
    this.windowResizeSubscription = fromEvent(window, 'resize').pipe(debounceTime(100))
      .subscribe({
        next: () => {
          this.setElementHeight();
        }
      });
  }

  init(config: MaxHeightCalculatorConfig): void {
    this.config = config;
    setTimeout(() => {
      this.setElementHeight();
    }, 0);
  }

  setElementHeight(): void {
    const nativeElement = this.config?.elementRef?.nativeElement;
    if (nativeElement === null) {
      return;
    }
    const offsets = nativeElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const staticHeight = this.getStaticReservedHeight();
    const maxHeightPx = windowHeight - offsets.top - staticHeight;
    if (maxHeightPx < this.getMinHeight()) {
      nativeElement.style.height = 'auto';
      return;
    }
    switch (this.config?.mode) {
      case MaxHeightCalculatorMode.Height:
        nativeElement.style.height = `${maxHeightPx}px`;
        break;
      default:
        nativeElement.style.maxHeight = `${maxHeightPx}px`;
        break;
    }
  }

  private getStaticReservedHeight(): number {
    const windowWidth = window.innerWidth;
    if (windowWidth < 576 && typeof this.config?.staticReservedHeight.sm === 'number') {
      return this.config?.staticReservedHeight.sm;
    }
    if (windowWidth < 768 && typeof this.config?.staticReservedHeight.md === 'number') {
      return this.config?.staticReservedHeight.md;
    }
    if (typeof this.config?.staticReservedHeight.lg === 'number') {
      return this.config?.staticReservedHeight.lg;
    }
    return 0;
  }

  private getMinHeight(): number {
    if (this.config?.minHeightPx) {
      return this.config.minHeightPx;
    }
    return this.defaultMinHeightPx;
  }
}
