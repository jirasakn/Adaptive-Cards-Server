"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const websocketServer_1 = require("./websocketServer");
const apiRoutes_1 = require("./apiRoutes");
// Configuration
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// Initialize WebSocket server
const wsServer = new websocketServer_1.KioskWebSocketServer(server);
// Configure Express middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// Set up API routes
app.use('/api', (0, apiRoutes_1.createApiRoutes)(wsServer));
// Serve the web interface for any other route
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public/index.html'));
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
