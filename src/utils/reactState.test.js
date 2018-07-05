import { expect } from 'chai';

import * as setStates from './reactState';

describe('functions to set the state', () => {
  describe('select and unselect rows in a table', () => {
    describe('One row', () => {
      const id = 1234;
      it('selectOne', () => {
        expect(setStates.selectOne(id)({ selectedRows: [] })).to.eql({
          selectedRows: [id]
        });
      });

      it('unselectOne', () => {
        expect(setStates.unselectOne(id)({ selectedRows: [id] })).to.eql({
          selectedRows: []
        });
      });
    });

    describe('All rows', () => {
      const ids = [1, 2, 3];
      it('selectAll', () => {
        expect(setStates.selectAll(ids)({ selectedRows: [] })).to.eql({
          selectedRows: ids
        });
      });

      it('unselectAll', () => {
        expect(setStates.unselectAll(ids)({ selectedRows: ids })).to.eql({
          selectedRows: []
        });
      });
    });
  });
});
