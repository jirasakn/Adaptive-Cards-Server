import express, { Request, Response, Router } from 'express';
import { KioskWebSocketServer } from './websocketServer';
import { ApiResponse, TemplateConfig, ContentData } from './types';

export function createApiRoutes(wsServer: KioskWebSocketServer): Router {
  const router = express.Router();

  // Helper function to validate content data
  const validateContentData = (content: any): { valid: boolean; message?: string } => {
    if (!content || !content.contentType) {
      return { valid: false, message: 'Content must include "contentType" field.' };
    }

    switch (content.contentType) {
      case 'markdown':
        if (typeof content.data !== 'string') {
          return { valid: false, message: 'Markdown content must have a "data" field of type string.' };
        }
        return { valid: true };
      
      case 'html':
        if (typeof content.data !== 'string') {
          return { valid: false, message: 'HTML content must have a "data" field of type string.' };
        }
        return { valid: true };
      
      case 'adaptive-card':
        if (!content.data || typeof content.data !== 'object') {
          return { valid: false, message: 'Adaptive card content must have a "data" field of type object.' };
        }
        return { valid: true };
      
      case 'image':
        if (!content.imageUrl) {
          return { valid: false, message: 'Image content must include "imageUrl" field.' };
        }
        
        // Validate that the imageUrl is either a URL or a base64 data URI
        const isUrl = content.imageUrl.match(/^https?:\/\//i);
        const isBase64 = content.imageUrl.match(/^data:image\/[a-z]+;base64,/i);
        
        if (!isUrl && !isBase64) {
          return { valid: false, message: 'Image URL must be a valid HTTP/HTTPS URL or a base64 data URI.' };
        }
        
        if (!content.displayMode || !['fit', 'stretch', 'cover', 'contain', 'center'].includes(content.displayMode)) {
          return { valid: false, message: 'Image content must include valid "displayMode" field: fit, stretch, cover, contain, or center.' };
        }
        
        return { valid: true };
      
      default:
        return { valid: false, message: `Unsupported content type: ${content.contentType}` };
    }
  };

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
      
      // Validate basic template structure
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
        
        // Validate content data
        const contentValidation = validateContentData(template.content);
        if (!contentValidation.valid) {
          return res.status(400).json({
            success: false,
            message: contentValidation.message
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
        
        // Validate left panel content
        const leftContentValidation = validateContentData(template.leftPanel.content);
        if (!leftContentValidation.valid) {
          return res.status(400).json({
            success: false,
            message: `Left panel: ${leftContentValidation.message}`
          });
        }
        
        // Validate right panel content
        const rightContentValidation = validateContentData(template.rightPanel.content);
        if (!rightContentValidation.valid) {
          return res.status(400).json({
            success: false,
            message: `Right panel: ${rightContentValidation.message}`
          });
        }
      }
      
      // Broadcast to all clients
      const clientsReceived = wsServer.broadcast(template);
      
      // If no clients received the broadcast, there might be a validation error
      if (clientsReceived === 0) {
        // The WebSocket server has more detailed validation, which might have rejected this
        return res.status(400).json({
          success: false,
          message: 'Template validation failed. Check server logs for details.'
        });
      }
      
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