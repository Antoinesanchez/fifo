"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constants = void 0;
exports.constants = {
    ACTIONS: [
        { name: 'A', maxCredit: 30 },
        { name: 'B', maxCredit: 20 },
        { name: 'C', maxCredit: 40 },
    ],
    SEED: 2342,
    MIN_THRESHOLD: 0.8,
    MAX_THRESHOLD: 1,
    // 2 minutes
    BASE_REMOVE_ACTION_DELAY: 1000 * 60 * 2,
    // 24 hours
    BASE_RESET_CREDIT_DELAY: 1000 * 60 * 60 * 24,
};
