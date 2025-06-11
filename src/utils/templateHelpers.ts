import { TemplateConfig, ContentData } from '../types';

/**
 * Creates a full-screen template
 */
export function createFullScreenTemplate(
  content: ContentData,
  options?: {
    theme?: 'light' | 'dark';
    backgroundColor?: string;
  }
): TemplateConfig {
  return {
    type: 'full-screen',
    theme: options?.theme || 'light',
    backgroundColor: options?.backgroundColor || '#ffffff',
    content
  };
}

/**
 * Creates a split-screen template
 */
export function createSplitScreenTemplate(
  leftContent: ContentData,
  rightContent: ContentData,
  options?: {
    leftWidth?: number;
    leftBackgroundColor?: string;
    rightBackgroundColor?: string;
    theme?: 'light' | 'dark';
  }
): TemplateConfig {
  return {
    type: 'split-screen',
    theme: options?.theme || 'light',
    leftPanel: {
      width: options?.leftWidth || 50,
      content: leftContent,
      backgroundColor: options?.leftBackgroundColor || '#ffffff'
    },
    rightPanel: {
      content: rightContent,
      backgroundColor: options?.rightBackgroundColor || '#ffffff'
    }
  };
}

/**
 * Creates markdown content
 */
export function createMarkdownContent(
  markdown: string,
  options?: {
    textColor?: string;
  }
): ContentData {
  return {
    contentType: 'markdown',
    data: markdown,
    textColor: options?.textColor
  };
}

/**
 * Creates adaptive card content
 */
export function createAdaptiveCardContent(cardData: object): ContentData {
  return {
    contentType: 'adaptive-card',
    data: cardData
  };
}

/**
 * Creates image content
 */
export function createImageContent(
  imageUrl: string,
  options?: {
    displayMode?: 'fit' | 'stretch' | 'cover' | 'contain' | 'center';
    altText?: string;
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number;
    boxShadow?: string;
  }
): ContentData {
  return {
    contentType: 'image',
    imageUrl,
    displayMode: options?.displayMode || 'fit',
    altText: options?.altText,
    styling: {
      borderColor: options?.borderColor,
      borderWidth: options?.borderWidth,
      borderRadius: options?.borderRadius,
      boxShadow: options?.boxShadow
    }
  };
} 