FROM node:20-alpine AS builder

WORKDIR /app

COPY client/package*.json ./client/
RUN cd client && npm ci

COPY client ./client
RUN cd client && npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

COPY --from=builder --chown=nodejs:nodejs /app/client/dist ./public
RUN chmod -R 755 ./public

USER nodejs

EXPOSE 3000

CMD ["npx", "serve", "-s", "public", "-l", "3000"]
