"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("../styles/Header.css");
const ActionCredit_1 = require("./ActionCredit");
function Header({ actions }) {
    return (react_1.default.createElement("div", { className: "Header" }, actions.map((action) => (react_1.default.createElement(ActionCredit_1.ActionCredit, { key: action.name, name: action.name, currentCredit: action.currentCredit })))));
}
exports.default = Header;
