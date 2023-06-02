import express, { Request, Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { AppState } from './data/AppState';
import { PRNG } from './helpers/PRNG';
import { constants } from './config/constants';
import { creditResetter } from './helpers/creditsResetter';
const cors = require('cors');

const { SEED, BASE_REMOVE_ACTION_DELAY, BASE_RESET_CREDIT_DELAY } = constants;

const prng = new PRNG(SEED);

const creditList = creditResetter(prng);
const initialState = new AppState(creditList);

const app = express();

// Initialize socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

app.use(cors());
app.use(express.json());

// routes

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Server up',
  });
});

// Push new action to queue
app.put('/pushAction', (req: Request, res: Response) => {
  const { action } = req.body;
  initialState.pushAction(action);
  return res.status(200).json({ message: `action pushed: ${action}` });
});

// Yield current state, useful on page refresh
app.get('/currentState', (req: Request, res: Response) => {
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
  const newCreditList = creditResetter(prng);
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
