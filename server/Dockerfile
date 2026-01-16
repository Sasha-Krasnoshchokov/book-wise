# --- Stage 1: Base & OS Setup ---
FROM node:20-alpine AS base
RUN apk add --no-cache curl
WORKDIR /app

# --- Stage 2: Dependencies (The "Heavy Lifting" layer) ---
FROM base AS dependencies
COPY package.json package-lock.json ./
# Install all deps (including dev) for building/testing
RUN npm ci

# --- Stage 2: Development ---
# This stage keeps devDependencies and source code for hot-reloading
FROM dependencies AS development
ENV NODE_ENV=development
COPY . .
EXPOSE 3223

CMD ["npm", "run", "dev:watch"]

# --- Stage 3: Builder ---
FROM dependencies AS builder
COPY . .
RUN npm run build
# Prune dev dependencies to prepare node_modules for production
RUN npm prune --omit=dev

# --- Stage 4: Production ---
FROM base AS production
ENV NODE_ENV=production
# Standardize on a single port via ENV for better maintainability
ENV PORT=6543

# Security: Non-root user
RUN addgroup -S app && adduser -S app -G app
WORKDIR /app
RUN chown app:app /app
USER app:app

# Copy pruned node_modules and built assets
COPY --from=builder --chown=app:app /app/node_modules ./node_modules
COPY --from=builder --chown=app:app /app/dist ./dist
COPY --from=builder --chown=app:app /app/package.json ./package.json

EXPOSE $PORT

# Healthcheck using the curl installed in base
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:$PORT/health || exit 1

# Increased memory limit slightly for Node 20 stability
CMD ["node", "--max-old-space-size=512", "dist/server.js"]
