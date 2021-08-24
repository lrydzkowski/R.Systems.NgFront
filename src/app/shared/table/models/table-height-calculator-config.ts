import { ElementRef } from '@angular/core';

export interface TableHeightCalculatorConfig {
  containerRef: ElementRef;
  staticReservedHeight: {
    sm?: number;
    md?: number;
    lg?: number;
  };
  tableMinHeightPx?: number;
}
