import { TestBed } from '@angular/core/testing';

import { TimezoneOffsetInterceptor } from './timezone-offset.interceptor';

describe('TimezoneOffsetInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TimezoneOffsetInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TimezoneOffsetInterceptor = TestBed.inject(TimezoneOffsetInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
