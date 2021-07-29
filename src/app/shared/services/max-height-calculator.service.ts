import { ElementRef, Injectable } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MaxHeightCalculatorService {

  private elementRef: ElementRef | null = null;

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
      })
  }

  init(elementRef: ElementRef): void {
    this.elementRef = elementRef;
    this.setElementHeight();
  }

  setElementHeight(): void {
    const nativeElement = this.elementRef?.nativeElement;
    if (nativeElement === null) {
      return;
    }
    const offsets = nativeElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const maxHeight = windowHeight - offsets.top - 29;
    nativeElement.style.maxHeight = `${maxHeight}px`;
  }
}
