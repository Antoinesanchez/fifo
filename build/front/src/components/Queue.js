"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("../styles/Queue.css");
const Action_1 = __importDefault(require("./Action"));
const actionColorMapper = {
    A: '#23A455',
    B: '#FF9999',
    C: '#FFBB99',
};
function Queue({ actions }) {
    return (react_1.default.createElement("div", { className: "Queue" }, actions.map((action, index) => {
        const color = actionColorMapper[action];
        return react_1.default.createElement(Action_1.default, { action: action, color: color, key: index });
    })));
}
exports.default = Queue;
