import { msalConfig } from '@features/user-auth/user-auth-config';
import { IPublicClientApplication, LogLevel, PublicClientApplication } from '@azure/msal-browser';

export class MsalInstanceFactory {

  public static build(): IPublicClientApplication {
    return new PublicClientApplication(msalConfig);
  }

  public static loggerCallback(logLevel: LogLevel, message: string) {
    console.log(message);
  }
}

