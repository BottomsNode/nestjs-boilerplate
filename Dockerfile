# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copy only package files for caching
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source code and build
COPY . .
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine AS production

WORKDIR /usr/src/app

# Copy built files and package.json
COPY package*.json ./
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Expose port
EXPOSE 3535

# Start app
CMD ["node", "dist/main.js"]
