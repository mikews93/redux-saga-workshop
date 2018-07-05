import axios from 'axios';

import { getToken } from './jwt';
import { relogin } from './auth';

axios.interceptors.request.use(config => {
  config.headers = { Authorization: `Bearer ${getToken()}` };
  return config;
});

axios.interceptors.response.use(
  response => response,
  err => {
    const { response } = err;
    if (response.status === 401) {
      const { data: { attributes: { errorCode } } } = response;

      if (errorCode === 'TOKEN_EXPIRED_ERROR') {
        console.log('The token has expired, relogin');
        return relogin();
      } else if (errorCode === 'TOKEN_ERROR') {
        console.log('Invalid signature has changed');
        return relogin();
      }
    }

    return Promise.reject(err);
  }
);
