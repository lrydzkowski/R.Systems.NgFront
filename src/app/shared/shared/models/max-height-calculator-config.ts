import { ElementRef } from "@angular/core";
import { MaxHeightCalculatorMode } from "./max-height-calculator-mode";

export interface MaxHeightCalculatorConfig {
  elementRef: ElementRef;
  staticReservedHeight: {
    sm?: number,
    md?: number,
    lg?: number
  };
  mode: MaxHeightCalculatorMode;
  minHeightPx?: number;
}
