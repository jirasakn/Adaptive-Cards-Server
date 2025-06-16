# Build stage
FROM node:20-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all project files
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --production

# Copy built files from build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/public ./public

# Set environment variables with defaults
ENV PORT=3000
ENV BODY_PARSER_LIMIT="50mb"
ENV CORS_ORIGIN="*"

# Expose port
EXPOSE ${PORT}

# Start the server
CMD ["node", "dist/index.js"] 