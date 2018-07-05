import { all, fork } from 'redux-saga/effects';

import { rootSaga as cagadas } from './cagadas';

export default function* rootSaga() {
  yield all([fork(cagadas)]);
}
