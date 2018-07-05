import types from '../actions/types';
import * as reducer from './';
import * as actions from '../actions';
import { REQUEST_STATUSES } from '../../../constants';

describe('board reducers', () => {
  describe('entities reducer', () => {
    it('should return the inicial state', () => {
      expect(reducer.entities(undefined, {})).to.eql({});
    });

    it(`should handle the ${types.FETCH_SUCCESS} action`, () => {
      const boards = fakeState.entities.boards.entities;
      const result = Object.keys(boards);
      const action = actions.fetchBoardsSuccess(boards, result);

      expect(reducer.entities({}, action)).to.eql(boards);
    });
  });

  describe('FetchStatus reducer', () => {
    it('should return the initial state', () => {
      expect(reducer.fetchStatus(undefined, {})).to.be.equal(
        REQUEST_STATUSES.NOT_LOADED
      );
    });

    it(`should handle the ${types.FETCH_REQUEST} action`, () => {
      const action = actions.fetchBoardsRequest();
      expect(reducer.fetchStatus({}, action)).to.equal(
        REQUEST_STATUSES.LOADING
      );
    });

    it(`should handle the ${types.FETCH_SUCCESS} action`, () => {
      const action = actions.fetchBoardsSuccess();
      expect(reducer.fetchStatus({}, action)).to.equal(REQUEST_STATUSES.LOADED);
    });

    it(`should handle the ${types.FETCH_FAILURE} action`, () => {
      const action = actions.fetchBoardsFailure();
      expect(reducer.fetchStatus({}, action)).to.equal(REQUEST_STATUSES.FAILED);
    });
  });
});
