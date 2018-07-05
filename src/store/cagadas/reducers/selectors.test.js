import map from 'lodash/map';
import orderBy from 'lodash/orderBy';

import selectors from './selectors';
import { REQUEST_STATUSES as requestStatus } from '../../../constants';

const { boards } = fakeState.entities;
const selector = selectors(fakeState);

describe('board selectors', () => {
  describe('getBoards selector', () => {
    it('should return an empty array when thre are not boards', () => {
      const fakeSelector = selectors({
        entities: { boards: { entities: {} } }
      });
      expect(fakeSelector.getBoards()).to.eql([]);
    });

    it('should return an array of boards sorted by name', () => {
      const sortedBoards = orderBy(map(boards.entities), 'name');
      expect(selector.getBoards()).to.eql(sortedBoards);
    });
  });

  describe('getBoardById selector', () => {
    it('should return an empty object when board does not exist', () => {
      expect(selector.getBoardById(45674)).to.eql({});
    });

    it('should return a board', () => {
      expect(selector.getBoardById(1)).to.eql(boards.entities[1]);
    });
  });

  describe('getBoardsFetchStatus selector', () => {
    it(`should return ${
      requestStatus.NOT_LOADED
    } when boards are not loaded`, () => {
      const localSelector = selectors({
        entities: { boards: { fetchStatus: requestStatus.NOT_LOADED } }
      });
      expect(localSelector.getBoardsFetchStatus()).to.eql(
        requestStatus.NOT_LOADED
      );
    });

    it('should return the fetch status of the boards', () => {
      expect(selector.getBoardsFetchStatus()).to.eql(
        fakeState.entities.boards.fetchStatus
      );
    });
  });
});
