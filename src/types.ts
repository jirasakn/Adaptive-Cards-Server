import { WebSocket } from 'ws';

export interface Client {
  id: string;
  ws: WebSocket;
}

export interface AdaptiveCardInput {
  type: 'adaptive-card';
  data: any; // Adaptive Card JSON schema
}

export interface MarkdownInput {
  type: 'markdown';
  content: string;
  backgroundColor?: string;
  textColor?: string;
  theme?: 'light' | 'dark';
}

export type DisplayInput = AdaptiveCardInput | MarkdownInput;

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
} 