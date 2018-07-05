import { expect, assert } from 'chai';
import { REQUEST_STATUSES } from '../../constants';

import createPaginationReducer from './pagination';

describe('Pagination Reducer - Generic Reducer', () => {
  let pagination, badPagination;
  let actions = {};
  const defaultState = {
    pages: {},
    fetchStatusByPage: {},
    size: 0
  };
  const FETCH_SUCCESS = 'FETCH_SUCCESS';
  const FETCH_FAILURE = 'FETCH_FAILURE';
  const FETCH_REQUEST = 'FETCH_REQUEST';
  const CLEAR_PAGINATION = 'CLEAR_PAGINATION';

  beforeAll(() => {
    pagination = createPaginationReducer({
      FETCH_SUCCESS,
      FETCH_FAILURE,
      FETCH_REQUEST,
      CLEAR_PAGINATION
    });

    badPagination = createPaginationReducer();
    actions.fectchEntityRequest = payload => ({ type: FETCH_REQUEST, payload });
    actions.fectchEntitySuccess = payload => ({ type: FETCH_SUCCESS, payload });
    actions.fectchEntityFailure = payload => ({ type: FETCH_FAILURE, payload });
    actions.clearEntities = payload => ({ type: CLEAR_PAGINATION, payload });
  });

  it('Return a function', () => {
    assert.isFunction(pagination);
  });

  it('Should return unchanged state when no params are given on create reducer', () => {
    const state = {
      pages: { 1: [1, 3, 4, 5], 2: [4, 5, 6, 5] },
      fetchStatusByPage: {
        1: REQUEST_STATUSES.LOADED,
        2: REQUEST_STATUSES.LOADED
      },
      size: 20
    };
    const action = actions.fectchEntityRequest({ page: 1 });
    expect(badPagination(state, action).fetchStatusByPage).to.eql(
      state.fetchStatusByPage
    );
  });

  it('Should return the initial state', () => {
    expect(pagination(undefined, {})).to.eql(defaultState);
  });

  it(`should handle the ${FETCH_REQUEST} action`, () => {
    const action = actions.fectchEntityRequest({ page: 1 });
    expect(pagination({}, action).fetchStatusByPage).to.eql({
      1: REQUEST_STATUSES.LOADING
    });
  });

  it(`should handle the ${FETCH_FAILURE} action`, () => {
    const page = 1;
    const error = 'Oops! an error has happened';
    const action = actions.fectchEntityFailure({ error, page });
    expect(pagination({}, action).fetchStatusByPage).to.eql({
      1: REQUEST_STATUSES.FAILED
    });
  });

  it(`should handle the ${FETCH_SUCCESS} action`, () => {
    const page = 1;
    const action = actions.fectchEntitySuccess({
      result: ['1'],
      size: 1,
      page: '1'
    });

    expect(pagination({}, action).fetchStatusByPage).to.eql({
      1: REQUEST_STATUSES.LOADED
    });
    expect(pagination({}, action).pages).to.eql({ '1': ['1'] });
    expect(pagination({}, action).size).to.eql(1);
  });

  it(`should handle the ${CLEAR_PAGINATION} action`, () => {
    const action = actions.clearEntities();
    const state = {
      pages: { 1: [1, 3, 4, 5], 2: [4, 5, 6, 5] },
      fetchStatusByPage: {
        1: REQUEST_STATUSES.LOADED,
        2: REQUEST_STATUSES.LOADED
      },
      size: 20
    };
    expect(pagination(state, action)).to.eql(defaultState);
  });
});
