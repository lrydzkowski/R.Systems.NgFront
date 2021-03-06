import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { MockDataApiService } from './mock-data-api.service';

describe('MockDataApiService', () => {
  let service: MockDataApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ]
    });
    service = TestBed.inject(MockDataApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
