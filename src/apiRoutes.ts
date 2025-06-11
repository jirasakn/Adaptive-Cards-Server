import express, { Request, Response, Router } from 'express';
import { KioskWebSocketServer } from './websocketServer';
import { DisplayInput, ApiResponse } from './types';

export function createApiRoutes(wsServer: KioskWebSocketServer): Router {
  const router = express.Router();

  // GET endpoint to check server status and connected clients
  router.get('/status', (req: Request, res: Response) => {
    const connectionsCount = wsServer.getConnectionsCount();
    const clientIds = wsServer.getClientIds();
    
    const response: ApiResponse = {
      success: true,
      message: 'Server is running',
      data: {
        connectionsCount,
        clientIds
      }
    };
    
    res.json(response);
  });

  // POST endpoint to broadcast content to all connected clients
  router.post('/broadcast', (req: Request, res: Response) => {
    try {
      const content = req.body as DisplayInput;
      
      // Validate content
      if (!content || !content.type) {
        return res.status(400).json({
          success: false,
          message: 'Invalid content format. Must include "type" field.'
        });
      }
      
      // Validate content based on type
      if (content.type === 'markdown' && !content.content) {
        return res.status(400).json({
          success: false,
          message: 'Markdown content must include "content" field.'
        });
      }
      
      if (content.type === 'adaptive-card' && !content.data) {
        return res.status(400).json({
          success: false,
          message: 'Adaptive Card content must include "data" field.'
        });
      }
      
      // Broadcast to all clients
      const clientsReceived = wsServer.broadcast(content);
      
      // Return success response
      res.json({
        success: true,
        message: `Content broadcasted to ${clientsReceived} clients`,
        data: {
          clientsReceived,
          contentType: content.type
        }
      });
    } catch (error) {
      console.error('Error broadcasting content:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to broadcast content',
        data: { error: (error as Error).message }
      });
    }
  });

  return router;
} 