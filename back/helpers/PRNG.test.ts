import { describe, expect, test, beforeEach } from '@jest/globals';
import { PRNG } from './PRNG';
import { doNTimes } from './testHelper';
import { constants } from '../config/constants';

const { SEED } = constants;

describe('The PRNG class', () => {
  test('should initialize correctly', () => {
    const prng = new PRNG(SEED);
    expect(prng).toHaveProperty(['seed']);
  });

  describe('nextInRange', () => {
    let prng: PRNG | null = null;
    beforeEach(() => {
      // reset seed each run
      prng = new PRNG(SEED);
    });

    test('should return a number in range', () => {
      const res = prng?.nextInRange(0, 10);
      expect(res).toBeLessThanOrEqual(10);
      expect(res).toBeGreaterThanOrEqual(0);
    });

    test('should return a number in range even called many times', () => {
      const res = new Array(1000).fill(prng?.nextInRange(0, 10));
      const condition = res.every((value) => value >= 0 && value <= 10);
      expect(condition).toBe(true);
    });

    test('should return a number in positive range', () => {
      const res = prng?.nextInRange(0, -10);
      expect(res).toBeLessThanOrEqual(10);
      expect(res).toBeGreaterThanOrEqual(0);
    });

    test('should return a number in positive range even called many times', () => {
      const res = new Array(1000).fill(prng?.nextInRange(0, -10));
      const condition = res.every((value) => value >= 0 && value <= 10);
      expect(condition).toBe(true);
    });
  });

  describe('2 PRNGS with same SEED', () => {
    let prng1: PRNG | null = null;
    let prng2: PRNG | null = null;

    beforeEach(() => {
      prng1 = new PRNG(SEED);
      prng2 = new PRNG(SEED);
    });

    test('should yield the same result', () => {
      const res1 = prng1?.nextInRange(0, 10);
      const res2 = prng2?.nextInRange(0, 10);
      expect(res1).toEqual(res2);
    });

    test('should yield the same results called many times', () => {
      const res1 = new Array(1000).fill(prng1?.nextInRange(0, 10));
      const res2 = new Array(1000).fill(prng2?.nextInRange(0, 10));
      expect(res1).toEqual(res2);
    });
  });
});
