import { REQUEST_STATUSES } from '../../constants';
import { setFetchStatus } from '../';

export function forAllRegisters({
  FETCH,
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE
} = {}) {
  return function fetchStatus(state = REQUEST_STATUSES.NOT_LOADED, action) {
    switch (action.type) {
    case FETCH:
      return REQUEST_STATUSES.NOT_LOADED;
    case FETCH_REQUEST:
      return REQUEST_STATUSES.LOADING;
    case FETCH_SUCCESS:
      return REQUEST_STATUSES.LOADED;
    case FETCH_FAILURE:
      return REQUEST_STATUSES.FAILED;
    default:
      return state;
    }
  };
}

export function forEachEntity({
  FETCH,
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  entity
} = {}) {
  return function fetchStatus(state = {}, action) {
    switch (action.type) {
    case FETCH:
      return { ...state, [entity]: REQUEST_STATUSES.NOT_LOADED };
    case FETCH_REQUEST:
      return { ...state, [entity]: REQUEST_STATUSES.LOADING };
    case FETCH_SUCCESS:
      return { ...state, [entity]: REQUEST_STATUSES.LOADED };
    case FETCH_FAILURE:
      return { ...state, [entity]: REQUEST_STATUSES.FAILED };
    default:
      return state;
    }
  };
}

export function forEachRegister(
  {
    FETCH_SUCCESS,
    FETCH_ONE_SUCCESS,
    FETCH_ONE_REQUEST,
    FETCH_ONE_FAILURE,
    CLEAR_ENTITIES
  } = {},
  key = ''
) {
  return function fetchStatus(state = {}, action) {
    switch (action.type) {
    case FETCH_SUCCESS:
      return {
        ...state,
        ...setFetchStatus(action.payload.result)
      };
    case FETCH_ONE_REQUEST:
      return {
        ...state,
        [action.payload[key]]: REQUEST_STATUSES.LOADING
      };
    case FETCH_ONE_SUCCESS:
      return {
        ...state,
        [action.payload[key]]: REQUEST_STATUSES.LOADED
      };
    case FETCH_ONE_FAILURE:
      return {
        ...state,
        [action.payload[key]]: REQUEST_STATUSES.FAILED
      };
    case CLEAR_ENTITIES:
      return {};
    default:
      return state;
    }
  };
}
