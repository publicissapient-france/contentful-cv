// Source: https://auth0.com/docs/quickstart/spa/vuejs/01-login

import {getInstance} from './index';

export const authGuard = (to, from, next) => {
  const authService = getInstance();

  const fn = () => {
    if (authService.isAuthenticated) {
      return next();
    }
    authService.loginWithRedirect({appState: {targetUrl: to.fullPath}});
  };

  if (!authService.loading) {
    return fn();
  }

  authService.$watch('loading', loading => {
    if (loading === false) {
      return fn();
    }
  });
};
