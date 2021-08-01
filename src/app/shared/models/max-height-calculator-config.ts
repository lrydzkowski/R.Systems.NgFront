import { ElementRef } from "@angular/core";

export interface MaxHeightCalculatorConfig {
  elementRef: ElementRef;
  staticReservedHeight: {
    sm?: number,
    md?: number,
    lg?: number
  }
}
