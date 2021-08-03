import { TestBed } from '@angular/core/testing';

import { BreadcrumbHandlerService } from './breadcrumb-handler.service';

describe('BreadcrumbHandlerService', () => {
  let service: BreadcrumbHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreadcrumbHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
