import express, { Request, Response } from 'express';
import http from 'http';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import { KioskWebSocketServer } from './websocketServer';
import { createApiRoutes } from './apiRoutes';

// Configuration
const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

// Initialize WebSocket server
const wsServer = new KioskWebSocketServer(server);

// Configure Express middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// Set up API routes
app.use('/api', createApiRoutes(wsServer));

// Serve the web interface for any other route
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start the server
server.listen(PORT, () => {
  console.log(`
  ┌───────────────────────────────────────────────────┐
  │                                                   │
  │   Kiosk Adaptive Cards Server                     │
  │                                                   │
  │   HTTP & WebSocket Server running on port ${PORT}    │
  │                                                   │
  │   - Web Interface: http://localhost:${PORT}          │
  │   - WebSocket URL: ws://localhost:${PORT}/display    │
  │   - API Endpoint:  http://localhost:${PORT}/api      │
  │                                                   │
  └───────────────────────────────────────────────────┘
  `);
}); 