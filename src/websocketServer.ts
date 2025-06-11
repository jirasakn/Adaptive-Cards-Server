import { Server as HTTPServer } from 'http';
import { Server as WebSocketServer, WebSocket } from 'ws';
import { v4 as uuidv4 } from 'uuid';
import { Client, DisplayInput } from './types';

export class KioskWebSocketServer {
  private wss: WebSocketServer;
  private clients: Map<string, Client> = new Map();

  constructor(server: HTTPServer) {
    this.wss = new WebSocketServer({ server, path: '/display' });
    this.initialize();
  }

  private initialize() {
    this.wss.on('connection', (ws: WebSocket) => {
      const clientId = uuidv4();
      
      console.log(`Client connected: ${clientId}`);
      
      // Store the client
      this.clients.set(clientId, { id: clientId, ws });
      
      // Send welcome message
      const welcomeMessage: DisplayInput = {
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
      ws.on('message', (message: Buffer) => {
        console.log(`Received message from ${clientId}: ${message.toString()}`);
        // Process client messages if needed
      });
      
      // Handle errors
      ws.on('error', (error: Error) => {
        console.error(`WebSocket error for client ${clientId}:`, error);
      });
    });
  }

  // Broadcast to all connected clients
  public broadcast(content: DisplayInput) {
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
  public getConnectionsCount(): number {
    return this.clients.size;
  }
  
  // Get array of client IDs
  public getClientIds(): string[] {
    return Array.from(this.clients.keys());
  }
} 