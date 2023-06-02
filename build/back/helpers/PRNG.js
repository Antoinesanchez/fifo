"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRNG = void 0;
// The aim of this class is to provide a seeded PRNG for a predictable output
class PRNG {
    constructor(seed) {
        this.seed = seed;
    }
    /**
     * Perform successive bitwise shifts and xorr in multiple directions to compute a new number.
     * Set new seed to result of last operation.
     * Then perform a shift to unsigned int and divide by 2^32.
     * @returns a predictable random number
     */
    random() {
        const base = this.seed;
        const maxValue = Math.pow(2, 32) - 1;
        const firstOperation = base ^ (base << 16);
        const secondOperation = firstOperation ^ (firstOperation >> 18);
        const thirdtOperation = secondOperation ^ (secondOperation << 2);
        this.seed = thirdtOperation;
        return (thirdtOperation >>> 0) / maxValue;
    }
    /**
     * Compute a random number in a set range
     * @param min min value
     * @param range range of values
     * @returns an integer within positive range
     */
    nextInRange(min, range) {
        return Math.floor(this.random() * (Math.abs(range) + 1)) + min;
    }
}
exports.PRNG = PRNG;
