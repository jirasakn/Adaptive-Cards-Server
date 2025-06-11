import express, { Request, Response, Router } from 'express';
import { KioskWebSocketServer } from './websocketServer';
import { ApiResponse, TemplateConfig } from './types';

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

  // POST endpoint to broadcast template to all connected clients
  router.post('/broadcast', (req: Request, res: Response) => {
    try {
      const template = req.body as TemplateConfig;
      
      // Validate template
      if (!template || !template.type) {
        return res.status(400).json({
          success: false,
          message: 'Invalid template format. Must include "type" field.'
        });
      }
      
      // Validate template type
      if (template.type !== 'full-screen' && template.type !== 'split-screen') {
        return res.status(400).json({
          success: false,
          message: 'Invalid template type. Must be "full-screen" or "split-screen".'
        });
      }
      
      // Validate full-screen template
      if (template.type === 'full-screen') {
        if (!template.content) {
          return res.status(400).json({
            success: false,
            message: 'Full-screen template must include "content" field.'
          });
        }
        
        if (!template.content.contentType) {
          return res.status(400).json({
            success: false,
            message: 'Content must include "contentType" field.'
          });
        }
      }
      
      // Validate split-screen template
      if (template.type === 'split-screen') {
        if (!template.leftPanel || !template.rightPanel) {
          return res.status(400).json({
            success: false,
            message: 'Split-screen template must include "leftPanel" and "rightPanel" fields.'
          });
        }
        
        if (!template.leftPanel.content || !template.rightPanel.content) {
          return res.status(400).json({
            success: false,
            message: 'Both panels must include "content" field.'
          });
        }
        
        if (!template.leftPanel.width || template.leftPanel.width < 10 || template.leftPanel.width > 90) {
          return res.status(400).json({
            success: false,
            message: 'leftPanel.width must be between 10 and 90.'
          });
        }
      }
      
      // Broadcast to all clients
      const clientsReceived = wsServer.broadcast(template);
      
      // Return success response
      res.json({
        success: true,
        message: `Template broadcasted to ${clientsReceived} clients`,
        data: {
          clientsReceived,
          templateType: template.type
        }
      });
    } catch (error) {
      console.error('Error broadcasting template:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to broadcast template',
        data: { error: (error as Error).message }
      });
    }
  });

  return router;
} 