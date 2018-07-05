import { expect } from 'chai';
import * as featureToggles from './index';

jest.mock('./featureFlags', () => ({
  test_flag: {
    enabled: true,
    description: 'Feature Test',
    creationDate: '11/17/2017',
    author: 'Jesus Restrepo'
  },
  test_flag2: {
    enabled: false,
    description: 'Feature Test 2',
    creationDate: '11/17/2017',
    author: 'Jesus Restrepo'
  }
}));

describe('Feature Toggles', () => {
  describe('isEnabled', () => {
    it('should return true if a feature is enabled', () => {
      expect(featureToggles.isEnabled('test_flag')).to.be.true;
    });

    it('should return false if a feature is enabled', () => {
      expect(featureToggles.isEnabled('test_flag2')).to.be.false;
    });

    it('should return false when feature name does not exists', () => {
      expect(featureToggles.isEnabled('test_flag3')).to.be.false;
    });
  });
});
