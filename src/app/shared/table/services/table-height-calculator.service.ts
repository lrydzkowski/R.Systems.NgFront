import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TableHeightCalculatorConfig } from '../models/table-height-calculator-config';

@Injectable({
  providedIn: 'root'
})
export class TableHeightCalculatorService {

  private readonly defaultTableMaxHeightPx = 10000;

  private readonly defaultTableMinHeightPx = 200;

  tableMaxHeightPx: number = this.defaultTableMaxHeightPx;

  private config: TableHeightCalculatorConfig | null = null;

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
          this.setTableMaxHeight();
        }
      })
  }

  init(config: TableHeightCalculatorConfig): void {
    this.config = config;
    setTimeout(() => {
      this.setTableMaxHeight();
    }, 0);
  }

  setTableMaxHeight(): void {
    const containerNativeElement = this.config?.containerRef?.nativeElement;
    if (containerNativeElement === null) {
      return;
    }
    const offsets = containerNativeElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    let tableMaxHeightPx = windowHeight
      - offsets.top
      - this.getTablePartsHeight(containerNativeElement)
      - this.getStaticReservedHeight();
    if (tableMaxHeightPx < this.getTableMinHeight()) {
      tableMaxHeightPx = this.defaultTableMaxHeightPx;
    }
    this.tableMaxHeightPx = tableMaxHeightPx;
  }

  private getTablePartsHeight(containerNativeElement: any): number {
    let height = 0;
    const classNames: string[] = ['p-datatable-scrollable-header', 'p-paginator-bottom'];
    for (const className of classNames) {
      const elements = containerNativeElement.getElementsByClassName(className);
      for (const element of elements) {
        height += element.offsetHeight;
      }
    }
    return height;
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

  private getTableMinHeight(): number {
    if (this.config?.tableMinHeightPx) {
      return this.config.tableMinHeightPx;
    }
    return this.defaultTableMinHeightPx;
  }
}
