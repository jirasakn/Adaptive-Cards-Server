# Kiosk Adaptive Cards Server

A WebSocket server for Adaptive Cards with HTTP API. This server allows Kiosk displays to connect via WebSocket and receive content updates. It supports a flexible template system with multiple content types.

## Features

- WebSocket server for real-time content delivery
- HTTP API for sending content to connected displays
- Web interface for creating and sending templates
- Flexible template system with multiple layouts:
  - Full-Screen template for single content display
  - Split-Screen template for side-by-side content
- Support for multiple content types:
  - Markdown with custom styling
  - Adaptive Cards with interactive elements
  - Images with various display modes
- Real-time status monitoring of connected clients

## Installation

1. Clone this repository
2. Install dependencies:

```bash
cd "Adaptive Cards Server"
npm install
```

3. Build the TypeScript code:

```bash
npm run build
```

## Usage

### Start the server

```bash
npm start
```

The server will start on port 3000 by default. You can change this by setting the `PORT` environment variable.

### Development mode

For development with automatic restart on file changes:

```bash
npm run dev
```

### Connecting a Kiosk display

The WebSocket endpoint is available at:

```
ws://localhost:3000/display
```

Kiosk displays should connect to this WebSocket endpoint to receive content updates.

### Sending content via the Web Interface

Open your browser and navigate to:

```
http://localhost:3000
```

The web interface allows you to:
- See connected clients
- Create and send templates with different layouts
- Configure content for each template section
- View API response details

### Using the HTTP API

#### Check server status

```
GET /api/status
```

Returns information about the server status and connected clients.

#### Broadcast content

```
POST /api/broadcast
```

Send content to all connected clients. The request body should be a JSON object with the template structure.

## Template System

The Adaptive Cards project now supports a flexible template system for displaying content. Templates provide different layouts for content presentation.

### Available Templates

#### 1. Full-Screen Template

The full-screen template displays content across the entire screen.

```json
{
  "type": "full-screen",
  "theme": "light",
  "backgroundColor": "#ffffff",
  "content": {
    // Content data (see below)
  }
}
```

#### 2. Split-Screen Template

The split-screen template divides the screen into left and right panels with configurable width ratio.

```json
{
  "type": "split-screen",
  "theme": "light",
  "leftPanel": {
    "width": 40, // Percentage (10-90)
    "backgroundColor": "#f0f9ff",
    "content": {
      // Content data for left panel
    }
  },
  "rightPanel": {
    "backgroundColor": "#ffffff",
    "content": {
      // Content data for right panel
    }
  }
}
```

### Content Types

Templates can display different types of content in each panel:

#### 1. Markdown Content

```json
{
  "contentType": "markdown",
  "data": "# Markdown Content\n\nThis is **formatted** text with [links](https://example.com)",
  "textColor": "#333333"
}
```

#### 2. Adaptive Card Content

```json
{
  "contentType": "adaptive-card",
  "data": {
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "type": "AdaptiveCard",
    "version": "1.5",
    "body": [
      // Adaptive Card JSON
    ]
  }
}
```

#### 3. Image Content

```json
{
  "contentType": "image",
  "imageUrl": "https://example.com/image.jpg",
  "displayMode": "cover", // "fit", "stretch", "cover", "contain", or "center"
  "altText": "Description of image",
  "styling": {
    "borderColor": "#cccccc",
    "borderWidth": 1,
    "borderRadius": 8,
    "boxShadow": "0 4px 8px rgba(0,0,0,0.1)"
  }
}
```

### Example API Usage

#### Full-Screen Markdown Example

```javascript
// POST to /api/broadcast
{
  "type": "full-screen",
  "theme": "light",
  "backgroundColor": "#ffffff",
  "content": {
    "contentType": "markdown",
    "data": "# Welcome\n\nThis is a full-screen markdown template.",
    "textColor": "#333333"
  }
}
```

#### Split-Screen Example with Image and Markdown

```javascript
// POST to /api/broadcast
{
  "type": "split-screen",
  "theme": "light",
  "leftPanel": {
    "width": 40,
    "backgroundColor": "#f0f9ff",
    "content": {
      "contentType": "image",
      "imageUrl": "https://example.com/image.jpg",
      "displayMode": "cover",
      "altText": "Example image"
    }
  },
  "rightPanel": {
    "backgroundColor": "#ffffff",
    "content": {
      "contentType": "markdown",
      "data": "# Details\n\nThis is the detail panel that explains the image.",
      "textColor": "#333333"
    }
  }
}
```

## License

MIT 