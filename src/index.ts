import express, { Request, Response } from 'express';
import http from 'http';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import { KioskWebSocketServer } from './websocketServer';
import { createApiRoutes } from './apiRoutes';

// Configuration
const PORT = process.env.PORT || 3000;
const BODY_PARSER_LIMIT = process.env.BODY_PARSER_LIMIT || '50mb';
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

const app = express();
const server = http.createServer(app);

// Initialize WebSocket server
const wsServer = new KioskWebSocketServer(server);

// Configure Express middleware
app.use(cors({
  origin: CORS_ORIGIN
}));
// Increase JSON payload limit to support base64 encoded images
app.use(bodyParser.json({ limit: BODY_PARSER_LIMIT }));
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