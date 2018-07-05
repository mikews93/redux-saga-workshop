import dotenv from 'dotenv';
import Cookies from 'universal-cookie';

dotenv.config();

// const {
//   REACT_APP_COOKIE_NAME
// } = process.env;

const cookie = {
  api: ".AspNet.ApiCookie",
  application: ".AspNet.ApplicationCookie",
  domain: ".evercheck.com"
};
const cookies = new Cookies();

const readCookie = () => cookies.get(cookie.api);

const removeCookie = () => {
  cookies.remove(cookie.api, {
    domain: cookie.domain
  });
  cookies.remove(cookie.application, {
    domain: cookie.domain
  });
};

export {
  readCookie,
  removeCookie
};