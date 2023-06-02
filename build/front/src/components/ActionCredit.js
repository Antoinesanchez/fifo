"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionCredit = void 0;
const react_1 = __importDefault(require("react"));
require("../styles/ActionCredit.css");
function ActionCredit(props) {
    return (react_1.default.createElement("div", { className: "ActionCredit" },
        react_1.default.createElement("div", { className: "vertical-center" }, `${props.name} : ${props.currentCredit} crédits`)));
}
exports.ActionCredit = ActionCredit;
