import npm from '../../package.json';

export const environment = {
  production: true,
  version: npm.version,
  azure: {
    clientId: '',
    authority: '',
    redirectUri: '',
    postLogoutRedirectUrl: ''
  }
};
