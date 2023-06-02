"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const AppState_1 = require("./AppState");
const testHelper_1 = require("../helpers/testHelper");
const actionList = [];
const creditList = {
    A: 5,
    B: 5,
    C: 5,
};
(0, globals_1.describe)('the AppState Class', () => {
    (0, globals_1.test)('should initialize correctly given normal data', () => {
        const appState = new AppState_1.AppState(creditList, actionList);
        (0, globals_1.expect)(appState.creditList).toEqual(creditList);
        (0, globals_1.expect)(appState.actionList).toEqual(actionList);
    });
    (0, globals_1.describe)('pushing actions', () => {
        let appState = null;
        (0, globals_1.beforeEach)(() => {
            appState = new AppState_1.AppState(creditList, actionList);
        });
        (0, globals_1.test)('should push action to its actionList', () => {
            appState === null || appState === void 0 ? void 0 : appState.pushAction('A');
            (0, globals_1.expect)(appState === null || appState === void 0 ? void 0 : appState.actionList).toContain('A');
        });
        (0, globals_1.test)('should not push non existing action to its actionList', () => {
            appState === null || appState === void 0 ? void 0 : appState.pushAction('D');
            (0, globals_1.expect)(appState === null || appState === void 0 ? void 0 : appState.actionList).not.toContain('D');
        });
    });
    (0, globals_1.describe)('removing actions', () => {
        let appState = null;
        (0, globals_1.beforeEach)(() => {
            appState = new AppState_1.AppState(creditList, actionList);
        });
        (0, globals_1.test)('should remove first action with enough credits', () => {
            appState === null || appState === void 0 ? void 0 : appState.pushAction('A');
            appState === null || appState === void 0 ? void 0 : appState.removeFirstElement();
            (0, globals_1.expect)(appState === null || appState === void 0 ? void 0 : appState.actionList).toHaveLength(0);
        });
        (0, globals_1.test)("shouldn'nt remove first action with no more credits ", () => {
            (0, testHelper_1.doNTimes)(6, 'pushAction', appState, 'A');
            (0, testHelper_1.doNTimes)(6, 'removeFirstElement', appState, null);
            (0, globals_1.expect)(appState === null || appState === void 0 ? void 0 : appState.actionList).toContain('A');
            (0, globals_1.expect)(appState === null || appState === void 0 ? void 0 : appState.actionList).toHaveLength(1);
        });
        (0, globals_1.test)("shouldn't remove action that does not exist", () => {
            (0, globals_1.expect)(appState).not.toBeUndefined();
            if (appState) {
                appState.actionList.push('D');
                appState.removeFirstElement();
                (0, globals_1.expect)(appState.actionList).toContain('D');
                (0, globals_1.expect)(appState.actionList).toHaveLength(1);
            }
        });
    });
});
