import { describe, expect, test, beforeEach } from '@jest/globals';
import { creditResetter } from './creditsResetter';
import { constants } from '../config/constants';
import { PRNG } from './PRNG';

const { ACTIONS, MIN_THRESHOLD, MAX_THRESHOLD, SEED } = constants;

const prng = new PRNG(SEED);

describe('the creditResetter function', () => {
  test('should generate credits for existing actions only within their ranges', () => {
    const res = creditResetter(prng);

    const expectedThresholds = ACTIONS.map((action) => {
      const { maxCredit } = action;
      const minThreshold = maxCredit * MIN_THRESHOLD;
      const maxThreshold = maxCredit * MAX_THRESHOLD;
      return {
        ...action,
        minThreshold,
        maxThreshold,
      };
    });
    const checkConditions = Object.entries(res).map((entry) => {
      const [key, value] = entry;
      const expectedThreshold = expectedThresholds.find(
        (element) => element.name === key,
      );

      return (
        expectedThreshold &&
        value <= expectedThreshold.maxThreshold &&
        value >= expectedThreshold.minThreshold
      );
    });

    expect(checkConditions.every((condition) => condition)).toBe(true);
  });
});
