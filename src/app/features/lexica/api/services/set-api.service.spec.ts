import { TestBed } from '@angular/core/testing';

import { SetApiService } from './set-api.service';

describe('SetApiService', () => {
  let service: SetApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
