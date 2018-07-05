import { combineReducers } from 'redux';

import {
  createEntitiesReducer,
  createFetchStatusReducer
} from '../../../utils/createReducers';
import types from '../actions/types';

export const entities = createEntitiesReducer(types, 'cagadas');

export const fetchStatus = createFetchStatusReducer.forAllRegisters(types);

export default combineReducers({
  entities,
  fetchStatus
});
