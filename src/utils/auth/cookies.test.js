import sinon from 'sinon';
import { expect } from 'chai';
import dotenv from 'dotenv';
import Cookies from 'universal-cookie';

dotenv.config();

import * as cookiesUtils from './cookie';

describe('Cookies utils', () => {
  const { REACT_APP_COOKIE_NAME } = process.env;
  const cookie = JSON.parse(REACT_APP_COOKIE_NAME);

  it('readCookie', () => {
    const spyCookies = sinon.stub(Cookies.prototype, 'get');
    cookiesUtils.readCookie();
    expect(spyCookies.calledOnce).to.be.true;
  });
  it('removeCookie', () => {
    const spyCookies = sinon.stub(Cookies.prototype, 'remove');
    cookiesUtils.removeCookie();
    expect(spyCookies.calledTwice).to.be.true;
    expect(
      spyCookies.getCalls()[0].calledWith(cookie.api, { domain: cookie.domain })
    ).to.be.true;
    expect(
      spyCookies
        .getCalls()[1]
        .calledWith(cookie.application, { domain: cookie.domain })
    ).to.be.true;
  });
});
