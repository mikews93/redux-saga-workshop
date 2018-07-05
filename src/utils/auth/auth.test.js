import { stub } from 'sinon';
import { expect } from 'chai';
import * as cookieUtils from './cookie';
import * as jwtUtils from './jwt';
import dotenv from 'dotenv';
import * as authUtils from './auth';
import featureToggles from '../../featureToggles';
import * as auth from '../../api/auth';

dotenv.config();

describe('Auth utils', () => {
  const { REACT_APP_ACCOUNTS_LOGOUT } = process.env;
  let stubRemoveToken,
    stubReplace,
    stubAuthLogout,
    stubAuthLogin,
    stubFeatureToggle;
  beforeEach(() => {
    stubAuthLogout = stub(auth, 'logout');
    stubAuthLogin = stub(auth, 'login');
    stubFeatureToggle = stub(featureToggles, 'isEnabled');
  });
  afterEach(() => {
    stubAuthLogin.restore();
    stubAuthLogout.restore();
    stubFeatureToggle.restore();
  });
  it('login', () => {
    stubAuthLogin.returns(Promise.resolve());
    const result = authUtils.login();
    expect(result).to.be.a('promise');
  });
  it('logout', () => {
    stubRemoveToken = stub(jwtUtils, 'removeToken');
    stubFeatureToggle.returns(true);
    const stubRemoveCookie = stub(cookieUtils, 'removeCookie');
    stubReplace = stub(global.window.location, 'replace');
    authUtils.logout();
    expect(stubRemoveToken.calledOnce).to.be.true;
    expect(stubRemoveCookie.calledOnce).to.be.true;
    expect(stubReplace.calledOnce).to.be.true;
    expect(stubReplace.calledWith(`${REACT_APP_ACCOUNTS_LOGOUT}`)).to.be.true;
    expect(stubAuthLogout.called).to.be.true;
  });
  it('should not call logout endpoint on api when feature is not available', () => {
    stubFeatureToggle.returns(false);
    stubAuthLogout.returns(false);
    authUtils.logout();
    expect(stubAuthLogout.calledOnce).to.be.false;
  });
  it('Relogin', () => {
    stubRemoveToken.reset();
    stubReplace.reset();
    authUtils.relogin();
    expect(stubRemoveToken.calledOnce).to.be.true;
    expect(stubReplace.calledOnce).to.be.true;
  });
});
