import { WebSocket } from 'ws';

export interface Client {
  id: string;
  ws: WebSocket;
}

// Content Type Definitions
export interface MarkdownContent {
  contentType: 'markdown';
  data: string;
  textColor?: string;
}

export interface HTMLContent {
  contentType: 'html';
  data: string;
  textColor?: string;
}

export interface AdaptiveCardContent {
  contentType: 'adaptive-card';
  data: object;
}

export interface ImageContent {
  contentType: 'image';
  imageUrl: string;
  displayMode: 'fit' | 'stretch' | 'cover' | 'contain' | 'center';
  altText?: string;
  styling?: {
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number;
    boxShadow?: string;
  };
}

export type ContentData = MarkdownContent | AdaptiveCardContent | ImageContent | HTMLContent;

// Template Definitions
export interface BaseTemplateConfig {
  type: 'full-screen' | 'split-screen';
  theme?: 'light' | 'dark';
}

export interface FullScreenTemplateConfig extends BaseTemplateConfig {
  type: 'full-screen';
  content: ContentData;
  backgroundColor?: string;
}

export interface SplitScreenTemplateConfig extends BaseTemplateConfig {
  type: 'split-screen';
  leftPanel: {
    width: number; // percentage (0-100)
    content: ContentData;
    backgroundColor?: string;
  };
  rightPanel: {
    content: ContentData;
    backgroundColor?: string;
  };
}

export type TemplateConfig = FullScreenTemplateConfig | SplitScreenTemplateConfig;

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
} 