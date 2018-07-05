import types from './types';
import * as actions from './';

describe('boards actions', () => {
  it(`should create an action to handle the ${types.FETCH} type`, () => {
    expect(actions.fetchBoards()).to.eql({
      type: types.FETCH
    });
  });

  it(`should create an action to handle the ${
    types.FETCH_REQUEST
  } type`, () => {
    expect(actions.fetchBoardsRequest()).to.eql({
      type: types.FETCH_REQUEST
    });
  });

  it(`should create and action to handle the ${
    types.FETCH_SUCCESS
  } type`, () => {
    const boards = fakeState.entities.boards.entities;

    expect(actions.fetchBoardsSuccess(boards)).to.eql({
      type: types.FETCH_SUCCESS,
      payload: {
        boards
      }
    });
  });

  it(`should create an action to handle the ${
    types.FETCH_FAILURE
  } type`, () => {
    expect(actions.fetchBoardsFailure()).to.eql({
      type: types.FETCH_FAILURE
    });
  });
});
