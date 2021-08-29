import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { UserAuthApiService } from './user-auth-api.service';

describe('UserAuthApiService', () => {
  let service: UserAuthApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ]
    });
    service = TestBed.inject(UserAuthApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
