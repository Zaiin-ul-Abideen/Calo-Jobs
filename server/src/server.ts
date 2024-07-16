import 'dotenv/config';
import express from 'express';
import http from 'http';
import cors from 'cors';
const jobRoutes = require('./routes/jobRoute');
import { createWebSocketServer } from './websocket/websocketServer';

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use('/api', jobRoutes);

createWebSocketServer(server);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
