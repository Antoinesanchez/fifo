"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("../styles/ActionList.css");
const ActionButton_1 = require("./ActionButton");
const apiHelper_1 = require("../helpers/apiHelper");
function ActionList(props) {
    const actions = ['A', 'B', 'C'];
    const colorSets = [
        {
            color: '#23A455',
            hover: '#48B997',
        },
        {
            color: '#FF9999',
            hover: '#FF6666',
        },
        {
            color: '#FFBB99',
            hover: '#FF9966',
        },
    ];
    const handleClick = (value) => __awaiter(this, void 0, void 0, function* () {
        yield (0, apiHelper_1.pushActionHelper)(value);
        props.pushAction(value);
    });
    return (react_1.default.createElement("div", { className: "ActionList" },
        react_1.default.createElement("p", null, "Cliquez sur une action pour l'ajouter dans la queue"),
        react_1.default.createElement("div", { className: "ButtonList" }, actions.map((action, index) => {
            return (react_1.default.createElement(ActionButton_1.ActionButton, { action: action, key: index, handleClick: handleClick, colors: colorSets[index] }));
        }))));
}
exports.default = ActionList;
