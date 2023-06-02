"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creditResetter = void 0;
const constants_1 = require("../config/constants");
const { ACTIONS, MIN_THRESHOLD, MAX_THRESHOLD } = constants_1.constants;
const creditResetter = (prng) => ACTIONS.map((action) => {
    const { maxCredit, name } = action;
    // Used Math.ceil to prevent going lower than min threshold for decimal values
    const min = Math.ceil(maxCredit * MIN_THRESHOLD);
    // Fairly useless right now but would be of use if we were to decide new credits could exceed 100% of "max value"
    const max = maxCredit * MAX_THRESHOLD;
    const range = max - min;
    const credits = prng.nextInRange(min, range);
    return { [name]: credits };
}).reduce((a, b) => (Object.assign(Object.assign({}, a), b)));
exports.creditResetter = creditResetter;
