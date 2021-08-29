import { TestBed } from '@angular/core/testing';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { jwtOptionsFactory } from '../jwt-options-factory';
import { JwtTokenService } from './jwt-token.service';

import { AnonymousGuardService } from './anonymous-guard.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AnonymousGuardService', () => {
  let service: AnonymousGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        JwtModule.forRoot({
          jwtOptionsProvider: {
            provide: JWT_OPTIONS,
            useFactory: jwtOptionsFactory,
            deps: [ JwtTokenService ]
          }
        })
      ]
    });
    service = TestBed.inject(AnonymousGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
