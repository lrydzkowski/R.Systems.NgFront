// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import npm from '../../package.json';

export const environment = {
  production: false,
  version: npm.version,
  azure: {
    clientId: '6fc01629-cb77-4320-90a8-2ca2a62d4f58',
    authority: 'https://login.microsoftonline.com/22b7f27f-c2ab-445e-89e7-66ea06fe91be',
    redirectUri: 'http://localhost:4200',
    postLogoutRedirectUrl: 'http://localhost:4200'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
