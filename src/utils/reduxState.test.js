import { stub } from 'sinon';

import * as reduxStateUtils from './reduxState';
import { store } from '../store/configureStore';

describe('Redux State Utils', () => {
  describe('isUserAllowed', () => {
    it('returns a boolean that indicates whether a user is allowed to use a functionality of the website', () => {
      const state = global
        .storeFake({ loggedInUser: { scope: 'ADMIN' } })
        .getState();
      const storeStub = stub(store, 'getState');
      storeStub.returns(state);

      expect(reduxStateUtils.isUserAllowed('addProvider')).to.eql(true);
    });
  });
});
