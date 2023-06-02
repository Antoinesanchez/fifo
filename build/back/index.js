"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const AppState_1 = require("./data/AppState");
const PRNG_1 = require("./helpers/PRNG");
const constants_1 = require("./config/constants");
const creditsResetter_1 = require("./helpers/creditsResetter");
const cors = require('cors');
const { SEED, BASE_REMOVE_ACTION_DELAY, BASE_RESET_CREDIT_DELAY } = constants_1.constants;
const prng = new PRNG_1.PRNG(SEED);
const creditList = (0, creditsResetter_1.creditResetter)(prng);
const initialState = new AppState_1.AppState(creditList);
const app = (0, express_1.default)();
// Initialize socket.io
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: 'http://localhost:3000',
    },
});
app.use(cors());
app.use(express_1.default.json());
// routes
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Server up',
    });
});
// Push new action to queue
app.put('/pushAction', (req, res) => {
    const { action } = req.body;
    initialState.pushAction(action);
    return res.status(200).json({ message: `action pushed: ${action}` });
});
// Yield current state, useful on page refresh
app.get('/currentState', (req, res) => {
    const { actionList, creditList } = initialState;
    return res.status(200).json({ actionList, creditList });
});
// sockets
io.on('connection', () => {
    console.log('user connected');
});
// Remove first action in queue every 2 minutes
setInterval(() => {
    initialState.removeFirstElement();
    io.emit('remove first action', initialState);
}, BASE_REMOVE_ACTION_DELAY);
// Reset credits every 24 hours
setInterval(() => {
    const newCreditList = (0, creditsResetter_1.creditResetter)(prng);
    initialState.setCreditList(newCreditList);
    io.emit('resetted credits', initialState);
}, BASE_RESET_CREDIT_DELAY);
// Start the server
const port = 3001;
const socketPort = 3002;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
server.listen(socketPort, () => {
    console.log(`Socker server is running on port ${socketPort}`);
});
