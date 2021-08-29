import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BreadcrumbHandlerService } from './breadcrumb-handler.service';

describe('BreadcrumbHandlerService', () => {
  let service: BreadcrumbHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ]
    });
    service = TestBed.inject(BreadcrumbHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
