# Adaptive Cards Template Examples

This document provides complete examples of template usage for the Adaptive Cards system.

## Template Types

The system supports two main template types:

1. **Full-Screen Template**: Displays a single content element across the entire screen
2. **Split-Screen Template**: Divides the screen into left and right panels with configurable width ratio

## Content Types

Each template can display one of three content types:

1. **Markdown**: Text content with formatting (headings, lists, code blocks, etc.)
2. **Adaptive Card**: Interactive card based on Microsoft's Adaptive Card schema
3. **Image**: Visual content with various display modes and styling options

### Image Display Modes

Images support five display modes:

- **fit**: Maintains aspect ratio and ensures the entire image fits within the container (may have empty space)
- **stretch**: Ignores aspect ratio and stretches to fill the container completely
- **cover**: Maintains aspect ratio while filling the container (may crop parts of the image)
- **contain**: Similar to fit, ensures the entire image is visible
- **center**: Places the image in the center without scaling

## Full-Screen Templates

### 1. Full-Screen Markdown Template

```json
{
  "type": "full-screen",
  "theme": "light",
  "backgroundColor": "#ffffff",
  "content": {
    "contentType": "markdown",
    "data": "# Welcome to Our Service\n\n## Key Features\n\n* Feature 1: Description of feature 1\n* Feature 2: Description of feature 2\n* Feature 3: Description of feature 3\n\n## Getting Started\n\n1. Step one explanation\n2. Step two explanation\n3. Step three explanation\n\n[Learn More](https://example.com)",
    "textColor": "#333333"
  }
}
```

### 2. Full-Screen Image Template

```json
{
  "type": "full-screen",
  "theme": "light",
  "backgroundColor": "#000000",
  "content": {
    "contentType": "image",
    "imageUrl": "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    "displayMode": "cover",
    "altText": "Scenic landscape image",
    "styling": {
      "borderRadius": 0,
      "boxShadow": "none"
    }
  }
}
```

### 3. Full-Screen Adaptive Card Template

```json
{
  "type": "full-screen",
  "theme": "light",
  "backgroundColor": "#ffffff",
  "content": {
    "contentType": "adaptive-card",
    "data": {
      "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
      "type": "AdaptiveCard",
      "version": "1.5",
      "body": [
        {
          "type": "Container",
          "items": [
            {
              "type": "TextBlock",
              "size": "Large",
              "weight": "Bolder",
              "text": "Product Announcement",
              "wrap": true
            },
            {
              "type": "TextBlock",
              "text": "Introducing our newest product with amazing features.",
              "wrap": true
            },
            {
              "type": "Image",
              "url": "https://via.placeholder.com/600x300",
              "size": "Large",
              "horizontalAlignment": "center"
            }
          ]
        },
        {
          "type": "Container",
          "style": "emphasis",
          "items": [
            {
              "type": "FactSet",
              "facts": [
                {
                  "title": "Release Date:",
                  "value": "June 30, 2023"
                },
                {
                  "title": "Price:",
                  "value": "$199.99"
                },
                {
                  "title": "Availability:",
                  "value": "Worldwide"
                }
              ]
            }
          ]
        }
      ],
      "actions": [
        {
          "type": "Action.OpenUrl",
          "title": "Pre-order Now",
          "url": "https://example.com/preorder"
        },
        {
          "type": "Action.OpenUrl",
          "title": "Learn More",
          "url": "https://example.com/product-details"
        }
      ]
    }
  }
}
```

## Split-Screen Templates

### 1. Split-Screen with Image and Markdown

```json
{
  "type": "split-screen",
  "theme": "light",
  "leftPanel": {
    "width": 50,
    "backgroundColor": "#000000",
    "content": {
      "contentType": "image",
      "imageUrl": "https://images.unsplash.com/photo-1579546929662-711aa81148cf",
      "displayMode": "cover",
      "altText": "Colorful abstract background"
    }
  },
  "rightPanel": {
    "backgroundColor": "#ffffff",
    "content": {
      "contentType": "markdown",
      "data": "# Product Highlights\n\n* **Innovative Design**: Lorem ipsum dolor sit amet\n* **High Performance**: Consectetur adipiscing elit\n* **User Friendly**: Sed do eiusmod tempor incididunt\n* **Affordable**: Ut labore et dolore magna aliqua\n\n## Limited Time Offer\n\n**20% off** when you order before June 30!\n\n[Order Now](https://example.com/order)",
      "textColor": "#333333"
    }
  }
}
```

### 2. Split-Screen with Two Markdown Panels

```json
{
  "type": "split-screen",
  "theme": "light",
  "leftPanel": {
    "width": 40,
    "backgroundColor": "#f0f9ff",
    "content": {
      "contentType": "markdown",
      "data": "# Before\n\n```javascript\n// Old implementation\nfunction oldFunction() {\n  console.log('This is the old way');\n  // Many lines of complex code\n  return oldResult;\n}\n```",
      "textColor": "#0369a1"
    }
  },
  "rightPanel": {
    "backgroundColor": "#f0fdf4",
    "content": {
      "contentType": "markdown",
      "data": "# After\n\n```javascript\n// New implementation\nfunction newFunction() {\n  console.log('This is the new way');\n  // Much simpler code\n  return betterResult;\n}\n```",
      "textColor": "#166534"
    }
  }
}
```

### 3. Split-Screen with Adaptive Card and Image

```json
{
  "type": "split-screen",
  "theme": "dark",
  "leftPanel": {
    "width": 60,
    "backgroundColor": "#1e293b",
    "content": {
      "contentType": "adaptive-card",
      "data": {
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "type": "AdaptiveCard",
        "version": "1.5",
        "body": [
          {
            "type": "Container",
            "items": [
              {
                "type": "TextBlock",
                "size": "Large",
                "weight": "Bolder",
                "text": "Event Registration",
                "wrap": true,
                "color": "Light"
              },
              {
                "type": "Input.Text",
                "id": "name",
                "label": "Your Name",
                "placeholder": "John Doe"
              },
              {
                "type": "Input.Text",
                "id": "email",
                "label": "Email",
                "placeholder": "john@example.com"
              },
              {
                "type": "Input.ChoiceSet",
                "id": "session",
                "label": "Select Session",
                "isMultiSelect": false,
                "value": "1",
                "choices": [
                  {
                    "title": "Morning Session (9AM-12PM)",
                    "value": "1"
                  },
                  {
                    "title": "Afternoon Session (1PM-4PM)",
                    "value": "2"
                  },
                  {
                    "title": "Full Day (9AM-4PM)",
                    "value": "3"
                  }
                ]
              }
            ]
          }
        ],
        "actions": [
          {
            "type": "Action.Submit",
            "title": "Register",
            "data": {
              "action": "register"
            }
          }
        ]
      }
    }
  },
  "rightPanel": {
    "backgroundColor": "#0f172a",
    "content": {
      "contentType": "image",
      "imageUrl": "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
      "displayMode": "cover",
      "altText": "Conference hall"
    }
  }
}
```

### 4. Split-Screen with Different Width Ratio

```json
{
  "type": "split-screen",
  "theme": "light",
  "leftPanel": {
    "width": 30,
    "backgroundColor": "#fffbeb",
    "content": {
      "contentType": "markdown",
      "data": "# Navigation\n\n* [Home](#)\n* [Products](#)\n* [Services](#)\n* [About Us](#)\n* [Contact](#)",
      "textColor": "#92400e"
    }
  },
  "rightPanel": {
    "backgroundColor": "#ffffff",
    "content": {
      "contentType": "markdown",
      "data": "# Welcome to Our Website\n\nThis demonstrates a sidebar navigation layout with a 30/70 split ratio.\n\n## Main Content Area\n\nThe main content takes up 70% of the screen width, while the navigation sidebar takes up 30%.\n\nThis is particularly useful for:\n* Documentation websites\n* Admin dashboards\n* Portfolio sites\n* E-commerce product pages",
      "textColor": "#333333"
    }
  }
}
```

### 5. Split-Screen with Different Image Display Modes

```json
{
  "type": "split-screen",
  "theme": "light",
  "leftPanel": {
    "width": 50,
    "backgroundColor": "#ffffff",
    "content": {
      "contentType": "image",
      "imageUrl": "https://images.unsplash.com/photo-1605460375648-278bcbd579a6",
      "displayMode": "fit",
      "altText": "Example of 'fit' display mode",
      "styling": {
        "borderRadius": 8,
        "borderColor": "#e5e7eb",
        "borderWidth": 1
      }
    }
  },
  "rightPanel": {
    "backgroundColor": "#ffffff",
    "content": {
      "contentType": "markdown",
      "data": "# Image Display Modes\n\nThe image on the left uses the **fit** display mode, which maintains the aspect ratio while ensuring the entire image fits within the container.\n\nOther available modes:\n\n* **stretch**: Ignores aspect ratio to fill container\n* **cover**: Fills container while maintaining aspect ratio (may crop)\n* **contain**: Similar to fit, ensures entire image is visible\n* **center**: Places image in center without scaling\n\nEach mode is useful for different scenarios.",
      "textColor": "#333333"
    }
  }
}
```

## Using Helper Functions

When using the server-side Node.js API, you can use the included helper functions to create templates more easily:

```javascript
const { 
  createFullScreenTemplate, 
  createSplitScreenTemplate,
  createMarkdownContent,
  createAdaptiveCardContent,
  createImageContent
} = require('../utils/templateHelpers');

// Create markdown content
const markdownContent = createMarkdownContent(
  '# Welcome\n\nThis is markdown content',
  { textColor: '#333333' }
);

// Create image content
const imageContent = createImageContent(
  'https://example.com/image.jpg',
  { 
    displayMode: 'cover',
    altText: 'Example image',
    borderRadius: 8
  }
);

// Create a full-screen template
const fullScreenTemplate = createFullScreenTemplate(
  markdownContent,
  { 
    theme: 'light',
    backgroundColor: '#ffffff'
  }
);

// Create a split-screen template
const splitScreenTemplate = createSplitScreenTemplate(
  imageContent,
  markdownContent,
  {
    leftWidth: 40,
    leftBackgroundColor: '#f0f9ff',
    rightBackgroundColor: '#ffffff',
    theme: 'light'
  }
);

// Send the template via the API
apiClient.broadcast(splitScreenTemplate);
```

## Responsive Behavior

Templates are designed to be responsive across different screen sizes:

- On larger screens, the split-screen template maintains the specified width ratio
- On smaller screens (such as mobile devices), the split-screen template may switch to a vertical layout
- Content within templates (especially markdown and adaptive cards) automatically adjusts to the available space
- Images resize appropriately based on their display mode 