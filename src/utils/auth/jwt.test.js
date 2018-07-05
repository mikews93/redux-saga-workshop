import sinon from 'sinon';
import dotenv from 'dotenv';

import * as jwtUtils from './jwt';

dotenv.config();

describe('JWT utils', () => {
  const { REACT_APP_TOKEN_NAME } = process.env;
  let stubLocalStorage;

  beforeAll(() => {
    stubLocalStorage = sinon.stub(localStorage, 'getItem');
  });

  it('saveToken', () => {
    const spyLocalStorage = sinon.spy(localStorage, 'setItem');
    jwtUtils.saveToken('token');
    expect(spyLocalStorage.calledTwice).to.be.true;
  });

  it('removeToken', () => {
    const spyLocalStorage = sinon.spy(localStorage, 'clear');
    jwtUtils.removeToken();
    expect(spyLocalStorage.calledOnce).to.be.true;
  });

  it('getToken', () => {
    jwtUtils.getToken();
    expect(stubLocalStorage.calledOnce).to.be.true;
    expect(stubLocalStorage.calledWith(REACT_APP_TOKEN_NAME)).to.be.true;
  });

  it('getUserInfo', () => {
    stubLocalStorage.returns(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ0MjYxMjEiLCJ1c2VyTmFtZSI6IlJFQ1JVSVRFUkNPUklaT04iLCJlbWFpbCI6ImtpcnN0ZW5AbnVsbC5jb20iLCJmdWxsTmFtZSI6IlJFQ1JVSVRFUiBDT1JJWk9OIiwiZW1wbG95ZXJJZCI6IjM2NSIsInNjb3BlIjoiUkVDUlVJVEVSIiwiYXBwbGljYXRpb25zIjp7ImV2ZXJjaGVjayI6dHJ1ZSwiZWR1Y2F0aW9uIjpmYWxzZSwiY3JlZGVudGlhbGluZyI6ZmFsc2V9LCJqdGkiOiI0ZGY1YjkzOC0zMzRmLTRiYjQtOWY1Ni04ZDdjNWMzZDQ3MmUiLCJydGkiOiJhZGY0MTBjMy1jOTQwLTQwYWQtOThlZC04OGNiZDI0ZmJhYzkiLCJpYXQiOjE1MDk3MjYyNDgsImV4cCI6MTUwOTgxMjY0OH0.wGc1uyuIESxGuvczE603N_traSCslZ8Y-j4_JBDp8Ls'
    );
    const expectedUserInfo = {
      id: '4426121',
      userName: 'RECRUITERCORIZON',
      email: 'kirsten@null.com',
      fullName: 'RECRUITER CORIZON',
      employerId: '365',
      scope: 'RECRUITER',
      applications: { evercheck: true, education: false, credentialing: false },
      jti: '4df5b938-334f-4bb4-9f56-8d7c5c3d472e',
      rti: 'adf410c3-c940-40ad-98ed-88cbd24fbac9',
      iat: 1509726248,
      exp: 1509812648
    };
    let userInfo = jwtUtils.getUserInfo();
    expect(JSON.stringify(userInfo)).to.be.equal(
      JSON.stringify(expectedUserInfo)
    );
    stubLocalStorage.returns(undefined);
    userInfo = jwtUtils.getUserInfo();
    expect(userInfo).to.be.undefined;
    stubLocalStorage.returns('a.q');
    userInfo = jwtUtils.getUserInfo();
    expect(userInfo).to.be.undefined;
  });
});
