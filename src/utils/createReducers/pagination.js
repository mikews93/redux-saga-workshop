import { combineReducers } from 'redux';
import { REQUEST_STATUSES } from '../../constants';

const initialState = {
  pages: {},
  fetchStatusByPage: {},
  size: 0
};

export default function createPaginationReducer({
  FETCH_SUCCESS,
  FETCH_FAILURE,
  FETCH_REQUEST,
  CLEAR_PAGINATION
} = {}) {
  function fetchStatusByPage(
    state = initialState.fetchStatusByPage,
    { type, payload = {} }
  ) {
    switch (type) {
    case FETCH_REQUEST: {
      const { page } = payload;
      return page ? { ...state, [page]: REQUEST_STATUSES.LOADING } : state;
    }
    case FETCH_SUCCESS: {
      const { page } = payload;
      return page ? { ...state, [page]: REQUEST_STATUSES.LOADED } : state;
    }
    case FETCH_FAILURE: {
      const { page } = payload;
      return page ? { ...state, [page]: REQUEST_STATUSES.FAILED } : state;
    }
    default:
      return state;
    }
  }

  function pages(state = initialState.pages, action) {
    switch (action.type) {
    case FETCH_SUCCESS: {
      const { result, page } = action.payload;
      return page ? { ...state, [page]: result } : state;
    }
    default:
      return state;
    }
  }

  function size(state = initialState.size, action) {
    switch (action.type) {
    case FETCH_SUCCESS: {
      const { size } = action.payload;
      return size;
    }
    default:
      return state;
    }
  }

  return function pagination(state = initialState, action) {
    switch (action.type) {
    case FETCH_REQUEST:
    case FETCH_FAILURE:
    case FETCH_SUCCESS: {
      return combineReducers({
        pages,
        fetchStatusByPage,
        size
      })(state, action);
    }
    case CLEAR_PAGINATION:
      return initialState;
    default:
      return state;
    }
  };
}
