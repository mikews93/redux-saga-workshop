import { takeLatest } from 'redux-saga/effects';

import fetchCagada from './fetchCagadas';
import types from '../actions/types';

export default function* rootSaga() {
  yield takeLatest(types.FETCH, fetchCagada);
}
