# Kiosk Adaptive Cards Server

A WebSocket server for Adaptive Cards with HTTP API. This server allows Kiosk displays to connect via WebSocket and receive content updates. It also provides an HTTP API for sending content to connected Kiosk displays.

## Features

- WebSocket server for real-time content delivery
- HTTP API for sending content to connected displays
- Web interface for creating and sending content
- Support for both Markdown and Adaptive Cards content
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
- Send Markdown content
- Send Adaptive Card content
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

Send content to all connected clients. The request body should be a JSON object with the following structure:

For Markdown content:

```json
{
  "type": "markdown",
  "content": "# Markdown Content",
  "theme": "light",
  "backgroundColor": "#ffffff",
  "textColor": "#000000"
}
```

For Adaptive Card content:

```json
{
  "type": "adaptive-card",
  "data": {
    "type": "AdaptiveCard",
    "version": "1.0",
    "body": [
      {
        "type": "TextBlock",
        "text": "Hello, Adaptive Card!"
      }
    ]
  }
}
```

## License

MIT 