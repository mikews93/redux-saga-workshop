import sinon from 'sinon';
import axios from 'axios';
import { expect } from 'chai';

import './axios.interceptors';
import * as jwtUtils from './jwt';
import * as authUtils from './auth';

describe('Axios interceptors', () => {
  let sandbox;
  let server;
  let stubRelogin;
  let spyConsole;

  beforeAll(() => {
    stubRelogin = sinon.stub(authUtils, 'relogin');
    spyConsole = sinon.stub(console, 'log');
  });
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    server = sandbox.useFakeServer();
    stubRelogin.reset();
    spyConsole.reset();
  });
  afterEach(() => {
    server.restore();
    sandbox.restore();
  });

  it('Authorization interceptor', done => {
    const stubGetToken = sinon.stub(jwtUtils, 'getToken');
    stubGetToken.returns('token');
    setTimeout(
      () => server.respond([200, { 'Content-Type': 'application/json' }, '[]']),
      0
    );
    axios.get('someUrl').then(res => {
      expect(res.request.requestHeaders).to.include({
        Authorization: 'Bearer token'
      });
      done();
    });
  });

  it('Auth error: `TOKEN_EXPIRED_ERROR` interceptor', done => {
    stubRelogin.returns({});
    setTimeout(
      () =>
        server.respond([
          401,
          { 'Content-Type': 'application/json' },
          JSON.stringify({ attributes: { errorCode: 'TOKEN_EXPIRED_ERROR' } })
        ]),
      0
    );
    axios.get('someUrl').then(res => {
      expect(stubRelogin.calledOnce).to.be.true;
      expect(spyConsole.calledWith('The token has expired, relogin')).to.be
        .true;
      done();
    });
  });
  it('Auth error: `TOKEN_EXPIRED_ERROR` interceptor', done => {
    stubRelogin.returns({});
    setTimeout(
      () =>
        server.respond([
          401,
          { 'Content-Type': 'application/json' },
          JSON.stringify({ attributes: { errorCode: 'TOKEN_ERROR' } })
        ]),
      0
    );
    axios.get('someUrl').then(res => {
      expect(stubRelogin.calledOnce).to.be.true;
      expect(spyConsole.calledWith('Invalid signature has changed')).to.be.true;
      done();
    });
  });
  it('Auth default errors interceptor', done => {
    stubRelogin.returns({});
    setTimeout(
      () =>
        server.respond([
          400,
          { 'Content-Type': 'application/json' },
          JSON.stringify({ attributes: {} })
        ]),
      0
    );
    axios.get('someUrl').catch(res => {
      expect(res).to.be.an('error');
      done();
    });
  });
  it('Auth default errors interceptor', done => {
    stubRelogin.returns({});
    setTimeout(
      () =>
        server.respond([
          401,
          { 'Content-Type': 'application/json' },
          JSON.stringify({ attributes: { errorCode: 'another_error' } })
        ]),
      0
    );
    axios.get('someUrl').catch(res => {
      expect(res).to.be.an('error');
      done();
    });
  });
});
