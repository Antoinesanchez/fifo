import { constants } from '../config/constants';
import { PRNG } from './PRNG';
const { ACTIONS, MIN_THRESHOLD, MAX_THRESHOLD } = constants;

export const creditResetter = (prng: PRNG) =>
  ACTIONS.map((action) => {
    const { maxCredit, name } = action;

    // Used Math.ceil to prevent going lower than min threshold for decimal values
    const min = Math.ceil(maxCredit * MIN_THRESHOLD);
    // Fairly useless right now but would be of use if we were to decide new credits could exceed 100% of "max value"
    const max = maxCredit * MAX_THRESHOLD;

    const range = max - min;
    const credits = prng.nextInRange(min, range);
    return { [name]: credits };
  }).reduce((a, b) => ({ ...a, ...b }));
