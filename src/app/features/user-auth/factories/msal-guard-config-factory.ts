import { msalGuardConfig } from '@features/user-auth/user-auth-config';
import { MsalGuardConfiguration } from '@azure/msal-angular';

export class MsalGuardConfigFactory {

  public static build(): MsalGuardConfiguration {
    return msalGuardConfig;
  }
}
