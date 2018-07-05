import dotenv from 'dotenv';

import { removeCookie } from './cookie';
import { removeToken } from './jwt';
import featureToggles from '../../featureToggles';
import * as auth from '../../api/auth';

dotenv.config();

const { REACT_APP_ACCOUNTS_LOGOUT, REACT_APP_ACCOUNTS_LOGIN } = process.env;

const login = () => {
  return auth.login();
};

const logout = () => {
  if (featureToggles.isEnabled('ec_token_blacklist')) {
    auth.logout();
  }
  removeToken();
  removeCookie();
  window.location.replace(`${REACT_APP_ACCOUNTS_LOGOUT}`);
};

const relogin = () => {
  removeToken();
  const returnUrl = encodeURIComponent(window.location.href);
  window.location.replace(`${REACT_APP_ACCOUNTS_LOGIN}?ReturnUrl=${returnUrl}`);
};

export { login, logout, relogin };
