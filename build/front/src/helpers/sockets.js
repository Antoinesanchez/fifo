"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socket = void 0;
const socket_io_client_1 = require("socket.io-client");
const URL = 'http://localhost:3002';
exports.socket = (0, socket_io_client_1.io)(URL);
