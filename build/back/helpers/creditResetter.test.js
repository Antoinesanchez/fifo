"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const creditsResetter_1 = require("./creditsResetter");
const constants_1 = require("../config/constants");
const PRNG_1 = require("./PRNG");
const { ACTIONS, MIN_THRESHOLD, MAX_THRESHOLD, SEED } = constants_1.constants;
const prng = new PRNG_1.PRNG(SEED);
(0, globals_1.describe)('the creditResetter function', () => {
    (0, globals_1.test)('should generate credits for existing actions only within their ranges', () => {
        const res = (0, creditsResetter_1.creditResetter)(prng);
        const expectedThresholds = ACTIONS.map((action) => {
            const { maxCredit } = action;
            const minThreshold = maxCredit * MIN_THRESHOLD;
            const maxThreshold = maxCredit * MAX_THRESHOLD;
            return Object.assign(Object.assign({}, action), { minThreshold,
                maxThreshold });
        });
        const checkConditions = Object.entries(res).map((entry) => {
            const [key, value] = entry;
            const expectedThreshold = expectedThresholds.find((element) => element.name === key);
            return (expectedThreshold &&
                value <= expectedThreshold.maxThreshold &&
                value >= expectedThreshold.minThreshold);
        });
        (0, globals_1.expect)(checkConditions.every((condition) => condition)).toBe(true);
    });
});
