import { protectedResources } from '@features/user-auth/user-auth-config';
import { MsalInterceptorConfiguration } from '@azure/msal-angular';
import { InteractionType } from '@azure/msal-browser';

export class MsalInterceptorConfigFactory {

  public static build(): MsalInterceptorConfiguration {
    const protectedResourceMap = new Map<string, Array<string>>();
    for (const key in protectedResources) {
      if (Object.prototype.hasOwnProperty.call(protectedResources, key)) {
        const protectedResource = protectedResources[key];
        protectedResourceMap.set(protectedResource.endpoint, protectedResource.scopes);
      }
    }

    return {
      interactionType: InteractionType.Redirect,
      protectedResourceMap
    };
  }
}
