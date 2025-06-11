"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KioskWebSocketServer = void 0;
const ws_1 = require("ws");
const uuid_1 = require("uuid");
class KioskWebSocketServer {
    constructor(server) {
        this.clients = new Map();
        this.wss = new ws_1.Server({ server, path: '/display' });
        this.initialize();
    }
    initialize() {
        this.wss.on('connection', (ws) => {
            const clientId = (0, uuid_1.v4)();
            console.log(`Client connected: ${clientId}`);
            // Store the client
            this.clients.set(clientId, { id: clientId, ws });
            // Send welcome message
            const welcomeMessage = {
                type: 'markdown',
                content: '# Welcome to Kiosk Display\n\nWaiting for content...',
                theme: 'light'
            };
            ws.send(JSON.stringify(welcomeMessage));
            // Handle client disconnect
            ws.on('close', () => {
                console.log(`Client disconnected: ${clientId}`);
                this.clients.delete(clientId);
            });
            // Handle messages from client (if needed)
            ws.on('message', (message) => {
                console.log(`Received message from ${clientId}: ${message.toString()}`);
                // Process client messages if needed
            });
            // Handle errors
            ws.on('error', (error) => {
                console.error(`WebSocket error for client ${clientId}:`, error);
            });
        });
    }
    // Broadcast to all connected clients
    broadcast(content) {
        const message = JSON.stringify(content);
        console.log(`Broadcasting to ${this.clients.size} clients:`, content.type);
        this.clients.forEach(client => {
            if (client.ws.readyState === client.ws.OPEN) {
                client.ws.send(message);
            }
        });
        return this.clients.size;
    }
    // Get the number of connected clients
    getConnectionsCount() {
        return this.clients.size;
    }
    // Get array of client IDs
    getClientIds() {
        return Array.from(this.clients.keys());
    }
}
exports.KioskWebSocketServer = KioskWebSocketServer;
