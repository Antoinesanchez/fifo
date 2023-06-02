"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppState = void 0;
const constants_1 = require("../config/constants");
class AppState {
    constructor(creditList, actionList) {
        this.actionList = [];
        this.actionList = actionList || [];
        this.creditList = creditList;
    }
    setCreditList(creditList) {
        this.creditList = creditList;
    }
    setActionList(actionList) {
        this.actionList = actionList;
    }
    /**
     * Remove first element if there is any element in the actionList and if the corresponding credit is more than 0.
     * Decrement corresponding credit
     */
    removeFirstElement() {
        const { actionList, creditList } = this;
        // get first element
        const [firstElement, ...rest] = actionList;
        // Check if action exists
        const { ACTIONS } = constants_1.constants;
        const actionNames = ACTIONS.map((action) => action.name);
        if (!actionNames.includes(firstElement)) {
            return;
        }
        // no element in actionList or no credit for first element
        if (!actionList.length || creditList[firstElement] < 1) {
            return;
        }
        // Everything checked
        // 1. Decrement credit for first element
        // 2. Remove first element
        const newCreditList = Object.assign(Object.assign({}, creditList), { [firstElement]: creditList[firstElement] - 1 });
        this.setCreditList(newCreditList);
        this.setActionList(rest);
    }
    pushAction(action) {
        // Check if action exists
        const { ACTIONS } = constants_1.constants;
        const actionNames = ACTIONS.map((action) => action.name);
        if (!actionNames.includes(action)) {
            return;
        }
        // If action exists, push it to actionList
        const { actionList } = this;
        const newActionList = [...actionList, action];
        this.setActionList(newActionList);
        return;
    }
}
exports.AppState = AppState;
