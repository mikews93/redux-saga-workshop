import { requestStatus } from './index';
import { REQUEST_STATUSES } from '../../constants';

const types = {
  FETCH_SUCCESS: 'test/FETCH_SUCCESS',
  FETCH_REQUEST: 'test/FETCH_REQUEST',
  FETCH_FAILURE: 'test/FETCH_FAILURE'
};

describe('requestStatus reducer', () => {
  it('should return the initial state', () => {
    const requestStatusReducer = requestStatus(undefined, types);
    expect(requestStatusReducer(undefined, { type: 'g' })).to.eql(
      REQUEST_STATUSES.NOT_LOADED
    );
  });

  it(`should return ${
    REQUEST_STATUSES.NOT_LOADED
  } when action type is passed`, () => {
    const action = {
      type: types.FETCH
    };
    const requestStatusReducer = requestStatus('FETCH', types);
    expect(requestStatusReducer(undefined, action)).to.eql(
      REQUEST_STATUSES.NOT_LOADED
    );
  });

  it(`should return ${
    REQUEST_STATUSES.LOADING
  } when action type passes is _REQUEST`, () => {
    const action = {
      type: types.FETCH_REQUEST
    };
    const requestStatusReducer = requestStatus('FETCH', types);
    expect(requestStatusReducer(undefined, action)).to.eql(
      REQUEST_STATUSES.LOADING
    );
  });

  it(`should return ${
    REQUEST_STATUSES.LOADED
  } when action type passes is _SUCCESS`, () => {
    const action = {
      type: types.FETCH_SUCCESS
    };
    const requestStatusReducer = requestStatus('FETCH', types);
    expect(requestStatusReducer(undefined, action)).to.eql(
      REQUEST_STATUSES.LOADED
    );
  });

  it(`should return ${
    REQUEST_STATUSES.FAILED
  } when action type passes is _FAILURE`, () => {
    const action = {
      type: types.FETCH_FAILURE
    };
    const requestStatusReducer = requestStatus('FETCH', types);
    expect(requestStatusReducer(undefined, action)).to.eql(
      REQUEST_STATUSES.FAILED
    );
  });
});
