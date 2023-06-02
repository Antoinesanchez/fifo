"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const PRNG_1 = require("./PRNG");
const constants_1 = require("../config/constants");
const { SEED } = constants_1.constants;
(0, globals_1.describe)('The PRNG class', () => {
    (0, globals_1.test)('should initialize correctly', () => {
        const prng = new PRNG_1.PRNG(SEED);
        (0, globals_1.expect)(prng).toHaveProperty(['seed']);
    });
    (0, globals_1.describe)('nextInRange', () => {
        let prng = null;
        (0, globals_1.beforeEach)(() => {
            // reset seed each run
            prng = new PRNG_1.PRNG(SEED);
        });
        (0, globals_1.test)('should return a number in range', () => {
            const res = prng === null || prng === void 0 ? void 0 : prng.nextInRange(0, 10);
            (0, globals_1.expect)(res).toBeLessThanOrEqual(10);
            (0, globals_1.expect)(res).toBeGreaterThanOrEqual(0);
        });
        (0, globals_1.test)('should return a number in range even called many times', () => {
            const res = new Array(1000).fill(prng === null || prng === void 0 ? void 0 : prng.nextInRange(0, 10));
            const condition = res.every((value) => value >= 0 && value <= 10);
            (0, globals_1.expect)(condition).toBe(true);
        });
        (0, globals_1.test)('should return a number in positive range', () => {
            const res = prng === null || prng === void 0 ? void 0 : prng.nextInRange(0, -10);
            (0, globals_1.expect)(res).toBeLessThanOrEqual(10);
            (0, globals_1.expect)(res).toBeGreaterThanOrEqual(0);
        });
        (0, globals_1.test)('should return a number in positive range even called many times', () => {
            const res = new Array(1000).fill(prng === null || prng === void 0 ? void 0 : prng.nextInRange(0, -10));
            const condition = res.every((value) => value >= 0 && value <= 10);
            (0, globals_1.expect)(condition).toBe(true);
        });
    });
    (0, globals_1.describe)('2 PRNGS with same SEED', () => {
        let prng1 = null;
        let prng2 = null;
        (0, globals_1.beforeEach)(() => {
            prng1 = new PRNG_1.PRNG(SEED);
            prng2 = new PRNG_1.PRNG(SEED);
        });
        (0, globals_1.test)('should yield the same result', () => {
            const res1 = prng1 === null || prng1 === void 0 ? void 0 : prng1.nextInRange(0, 10);
            const res2 = prng2 === null || prng2 === void 0 ? void 0 : prng2.nextInRange(0, 10);
            (0, globals_1.expect)(res1).toEqual(res2);
        });
        (0, globals_1.test)('should yield the same results called many times', () => {
            const res1 = new Array(1000).fill(prng1 === null || prng1 === void 0 ? void 0 : prng1.nextInRange(0, 10));
            const res2 = new Array(1000).fill(prng2 === null || prng2 === void 0 ? void 0 : prng2.nextInRange(0, 10));
            (0, globals_1.expect)(res1).toEqual(res2);
        });
    });
});
