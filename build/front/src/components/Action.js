"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("../styles/Action.css");
require("../styles/ActionCredit.css");
function Action(props) {
    return (react_1.default.createElement("div", { className: "Action", style: { backgroundColor: props.color } },
        react_1.default.createElement("div", { className: "vertical-center" }, props.action)));
}
exports.default = Action;
