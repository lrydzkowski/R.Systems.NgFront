import { TestBed } from '@angular/core/testing';

import { TableHeightCalculatorService } from './table-height-calculator.service';

describe('TableHeightCalculatorService', () => {
  let service: TableHeightCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableHeightCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
