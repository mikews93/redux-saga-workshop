import { expect } from 'chai';
import { call, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { normalize } from 'normalizr';

import fetchBoards from '../sagas/fetchBoards';
import * as actions from '../actions';
import types from '../actions/types';
import { boards as boardApi } from '../../../api';
import * as schemas from '../schema';

describe('fetchBoards saga', () => {
  const action = actions.fetchBoards();

  describe('when the API response is successful', () => {
    const iterator = fetchBoards(action);

    it(`should yield a put effect to dispatch the ${
      types.FETCH_REQUEST
    } action`, () => {
      expect(iterator.next().value).to.eql(put(actions.fetchBoardsRequest()));
    });

    it('should yield a call effect to hanvle a dalay effect', () => {
      expect(iterator.next().value).to.eql(call(delay, 300));
    });

    it('should yield a call effect to make a request to the API', () => {
      expect(iterator.next().value).to.eql(call(boardApi.fetchBoards));
    });

    it(`should yield a put effect to dispatch the ${
      types.FETCH_SUCCESS
    } action`, () => {
      const data = [
        {
          id: 1,
          stateId: 56,
          stateCode: 'CERT',
          name: 'American Academy of Nurse Practitioners'
        },
        {
          id: 2,
          stateId: 56,
          stateCode: 'CERT',
          name: 'American Academy of Professional Coders'
        }
      ];

      const { entities, result } = normalize(data, schemas.boards);

      expect(iterator.next({ data }).value).to.eql(
        put(actions.fetchBoardsSuccess(entities.boards, result))
      );
    });

    it('should be done', () => {
      expect(iterator.next().done).to.be.true;
    });
  });

  describe('When the API return and error', () => {
    const iterator = fetchBoards(action);
    iterator.next(); // dispatch action
    iterator.next(); // delay effeect
    iterator.next(); // API request

    it(`should yield a put effect to dispatch the ${
      types.FETCH_FAILURE
    } action`, () => {
      expect(iterator.throw('error message').value).to.eql(
        put(actions.fetchBoardsFailure())
      );
    });

    it('should be done', () => {
      expect(iterator.next().done).to.be.true;
    });
  });
});
