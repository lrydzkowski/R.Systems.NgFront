import { TestBed } from '@angular/core/testing';

import { MaxHeightCalculatorService } from './max-height-calculator.service';

describe('MaxHeightCalculatorService', () => {
  let service: MaxHeightCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaxHeightCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
