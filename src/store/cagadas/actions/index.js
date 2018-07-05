import types from './types';

export const fetchCagadas = () => ({
  type: types.FETCH
});

export const fetchCagadasRequest = () => ({
  type: types.FETCH_REQUEST
});

export const fetchCagadasSuccess = (cagadas = {}) => ({
  type: types.FETCH_SUCCESS,
  payload: {
    cagadas
  }
});

export const fetchCagadasFailure = () => ({
  type: types.FETCH_FAILURE
});