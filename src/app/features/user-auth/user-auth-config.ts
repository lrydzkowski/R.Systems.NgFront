import { MsalGuardConfiguration } from '@azure/msal-angular';
import { LogLevel, Configuration, BrowserCacheLocation, InteractionType } from '@azure/msal-browser';
import { environment } from 'src/environments/environment';

export const msalConfig: Configuration = {
  auth: {
    clientId: environment.azure.clientId,
    authority: environment.azure.authority,
    redirectUri: environment.azure.redirectUri,
    postLogoutRedirectUri: environment.azure.postLogoutRedirectUrl
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage
  }
};

export const msalGuardConfig: MsalGuardConfiguration = {
  interactionType: InteractionType.Redirect,
  loginFailedRoute: '/'
};

export const protectedResources: {[key: string]: {endpoint: string; scopes: string[]}} = {
  lexica: {
    endpoint: '/api/lexica/sets',
    scopes: ['api://b08bb24c-20e7-4f1e-b9d0-88ebdcec991b/app.access']
  }
};

export const loginRequest = {
  scopes: []
};
