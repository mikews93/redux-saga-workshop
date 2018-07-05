import { expect } from 'chai';

import { REQUEST_STATUSES } from '../../constants';
import { createFetchStatusReducer } from './';

const types = {
  FETCH_REQUEST: 'test/fetch',
  FETCH_SUCCESS: 'test/success',
  FETCH_FAILURE: 'test/failure',
  FETCH_ONE_SUCCESS: 'FETCH_ONE_SUCCESS',
  FETCH_ONE_REQUEST: 'FETCH_ONE_REQUEST',
  FETCH_ONE_FAILURE: 'FETCH_ONE_FAILURE'
};

describe('fetchStatus as a string', () => {
  const reducer = createFetchStatusReducer.forAllRegisters(types);

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.equal(REQUEST_STATUSES.NOT_LOADED);
  });

  it(`should handle the ${types.FETCH_REQUEST} action`, () => {
    expect(reducer({}, { type: types.FETCH_REQUEST })).to.equal(
      REQUEST_STATUSES.LOADING
    );
  });

  it(`should handle the ${types.FETCH_SUCCESS} action`, () => {
    expect(reducer({}, { type: types.FETCH_SUCCESS })).to.equal(
      REQUEST_STATUSES.LOADED
    );
  });

  it(`should handle the ${types.FETCH_FAILURE} action`, () => {
    expect(reducer({}, { type: types.FETCH_FAILURE })).to.equal(
      REQUEST_STATUSES.FAILED
    );
  });
});

describe('fetchStatus as an object - pagination', () => {
  const reducer = createFetchStatusReducer.forEachRegister(types, 'employeeId');
  const employeeId = 1234;

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.eql({});
  });

  it(`should handle the ${types.FETCH_SUCCESS} action`, () => {
    const action = {
      type: types.FETCH_SUCCESS,
      payload: {
        result: [1, 2, 3]
      }
    };
    expect(reducer(undefined, action)).to.eql({
      1: REQUEST_STATUSES.LOADED,
      2: REQUEST_STATUSES.LOADED,
      3: REQUEST_STATUSES.LOADED
    });
  });

  it(`should handle the ${types.FETCH_ONE_REQUEST} action`, () => {
    const action = {
      type: types.FETCH_ONE_REQUEST,
      payload: {
        employeeId
      }
    };
    const state = { 1: REQUEST_STATUSES.FAILED };
    expect(reducer(state, action)).to.eql({
      1: REQUEST_STATUSES.FAILED,
      [employeeId]: REQUEST_STATUSES.LOADING
    });
  });

  it(`should handle the ${types.FETCH_ONE_SUCCESS} action`, () => {
    const action = {
      type: types.FETCH_ONE_SUCCESS,
      payload: {
        employeeId,
        employee: { id: employeeId, name: 'Jhon Doe' }
      }
    };

    expect(reducer({}, action)).to.eql({
      [employeeId]: REQUEST_STATUSES.LOADED
    });
  });

  it(`should handle the ${types.FETCH_ONE_FAILURE} action`, () => {
    const action = {
      type: types.FETCH_ONE_FAILURE,
      payload: {
        employeeId
      }
    };

    expect(reducer({}, action)).to.eql({
      [employeeId]: REQUEST_STATUSES.FAILED
    });
  });
});
