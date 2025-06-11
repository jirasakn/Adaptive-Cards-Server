import { Server as HTTPServer } from 'http';
import { Server as WebSocketServer, WebSocket } from 'ws';
import { v4 as uuidv4 } from 'uuid';
import { Client, TemplateConfig, ContentData } from './types';

export class KioskWebSocketServer {
  private wss: WebSocketServer;
  private clients: Map<string, Client> = new Map();
  private lastValidTemplate: TemplateConfig | null = null;

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
      
      // Send welcome template or last valid template if available
      const welcomeTemplate: TemplateConfig = this.lastValidTemplate || {
        type: 'full-screen',
        theme: 'light',
        content: {
          contentType: 'markdown',
          data: '# Welcome to Kiosk Display\n\nWaiting for content...'
        }
      };
      
      ws.send(JSON.stringify(welcomeTemplate));
      
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

  // Validate content data
  private validateContentData(content: ContentData): boolean {
    if (!content || !content.contentType) {
      return false;
    }

    switch (content.contentType) {
      case 'markdown':
        return typeof content.data === 'string';
      
      case 'html':
        return typeof content.data === 'string';
      
      case 'adaptive-card':
        return content.data !== null && typeof content.data === 'object';
      
      case 'image':
        const isUrl = Boolean(content.imageUrl && content.imageUrl.match(/^https?:\/\//i));
        const isBase64 = Boolean(content.imageUrl && content.imageUrl.match(/^data:image\/[a-z]+;base64,/i));
        
        return Boolean(content.imageUrl) && 
               (isUrl || isBase64) &&
               ['fit', 'stretch', 'cover', 'contain', 'center'].includes(content.displayMode);
      
      default:
        return false;
    }
  }

  // Validate template
  private validateTemplate(template: TemplateConfig): boolean {
    if (!template || !template.type) {
      return false;
    }

    // Validate template type
    if (template.type !== 'full-screen' && template.type !== 'split-screen') {
      return false;
    }

    // Validate full-screen template
    if (template.type === 'full-screen') {
      if (!template.content) {
        return false;
      }
      
      return this.validateContentData(template.content);
    }
    
    // Validate split-screen template
    if (template.type === 'split-screen') {
      if (!template.leftPanel || !template.rightPanel) {
        return false;
      }
      
      if (!template.leftPanel.content || !template.rightPanel.content) {
        return false;
      }
      
      // Width should be between 10 and 90
      if (!template.leftPanel.width || template.leftPanel.width < 10 || template.leftPanel.width > 90) {
        return false;
      }
      
      return this.validateContentData(template.leftPanel.content) && 
             this.validateContentData(template.rightPanel.content);
    }
    
    return false;
  }

  // Broadcast to all connected clients
  public broadcast(template: TemplateConfig): number {
    // Validate the template
    const isValid = this.validateTemplate(template);
    
    if (!isValid) {
      console.error('Invalid template format, broadcast rejected:', template);
      return 0;
    }
    
    // Store as last valid template
    this.lastValidTemplate = template;
    
    const message = JSON.stringify(template);
    
    console.log(`Broadcasting to ${this.clients.size} clients:`, template.type);
    
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