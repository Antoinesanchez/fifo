"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doNTimes = void 0;
const doNTimes = (n, fn, instance, arg) => {
    if (!fn)
        return;
    if (n === 0)
        return;
    instance[fn](arg);
    (0, exports.doNTimes)(n - 1, fn, instance, arg);
};
exports.doNTimes = doNTimes;
