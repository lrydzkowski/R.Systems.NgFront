import { JwtTokenService } from './services/jwt-token.service';

export const jwtOptionsFactory = (jwtTokenService: JwtTokenService) => ({
  tokenGetter: () => jwtTokenService.getToken()
});
