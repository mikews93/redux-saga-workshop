import { call, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
// import { normalize } from 'normalizr';

import * as actions from '../actions';
// import * as schemas from '../schema';
import { cagadas as cagadasApi } from '../../../api';

export default function* fetchCagadas() {
  yield put(actions.fetchCagadasRequest());
  try {
    yield call(delay, 300);
    const { data } = yield call(cagadasApi.fetchCagadas);
    // const { entities } = normalize(data, schemas.cagadas);
    yield put(actions.fetchCagadasSuccess(data));
  } catch (error) {
    yield put(actions.fetchCagadasFailure());
  }
}
