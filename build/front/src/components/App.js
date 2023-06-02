"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const react_1 = __importStar(require("react"));
require("../styles/App.css");
const Header_1 = __importDefault(require("./Header"));
const ActionList_1 = __importDefault(require("./ActionList"));
const Queue_1 = __importDefault(require("./Queue"));
const sockets_1 = require("../helpers/sockets");
const apiHelper_1 = require("../helpers/apiHelper");
function App() {
    // socket state
    const [isConnected, setIsConnected] = (0, react_1.useState)(sockets_1.socket.connected);
    // business logic state
    const [actions, setActions] = (0, react_1.useState)([]);
    const [creditState, setCreditState] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const onConnect = () => {
            setIsConnected(true);
        };
        // unused: uncomment if needed
        // const onDisconnect = () => {
        //   setIsConnected(false);
        // };
        // both action will have same behavior but it should be different events, should those behavior differ someday
        const onRemoveActionEvent = (state) => {
            const { actionList, creditList } = state;
            setActions(actionList);
            const creditState = formatCreditList(creditList);
            setCreditState(creditState);
        };
        const onCreditResetEvent = (state) => {
            const { actionList, creditList } = state;
            setActions(actionList);
            const creditState = formatCreditList(creditList);
            setCreditState(creditState);
        };
        sockets_1.socket.emit('connection');
        sockets_1.socket.on('remove first action', onRemoveActionEvent);
        sockets_1.socket.on('resetted credits', onCreditResetEvent);
        fetchState();
        return () => {
            sockets_1.socket.off('connect', onConnect);
            sockets_1.socket.off('remove first action', onRemoveActionEvent);
            sockets_1.socket.off('resetted credits', onCreditResetEvent);
        };
    }, []);
    const formatCreditList = (creditList) => {
        return Object.entries(creditList).map((entry) => ({
            name: entry[0],
            currentCredit: entry[1],
        }));
    };
    const fetchState = () => __awaiter(this, void 0, void 0, function* () {
        const state = yield (0, apiHelper_1.currentStateHelper)();
        const { actionList, creditList } = state;
        setActions(actionList);
        const creditState = formatCreditList(creditList);
        setCreditState(creditState);
    });
    const pushAction = (name) => {
        setActions([...actions, name]);
    };
    return (react_1.default.createElement("div", { className: "App" },
        react_1.default.createElement(Header_1.default, { actions: creditState }),
        react_1.default.createElement(ActionList_1.default, { pushAction: pushAction }),
        react_1.default.createElement(Queue_1.default, { actions: actions })));
}
exports.default = App;
