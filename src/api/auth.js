import axios from 'axios';
import { getToken, getUserInfo } from '../utils/auth/jwt';
import { readCookie } from '../utils/auth/cookie';

const { REACT_APP_EC_ONE_API_URL, REACT_APP_COOKIE_NAME } = process.env;

export const logout = () =>
  axios.post(`${REACT_APP_EC_ONE_API_URL}/auth/logout`, {
    token: getToken(),
    user: getUserInfo()
  });

export const login = () => {
  const cookie = {
    cookieName: JSON.parse(REACT_APP_COOKIE_NAME).api,
    token: readCookie()
  };
  return axios.post(`${REACT_APP_EC_ONE_API_URL}/auth/token`, cookie);
};
