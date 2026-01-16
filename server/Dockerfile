# --- Stage 1: Base (Shared) ---
FROM node:20-alpine AS base
# RUN corepack enable && corepack prepare pnpm@latest --activate
RUN apk add --no-cache curl
WORKDIR /app
COPY package-lock.json package.json ./

# --- Stage 2: Development ---
# This stage keeps devDependencies and source code for hot-reloading
FROM base AS development
ENV NODE_ENV=development
RUN npm ci
COPY . .
EXPOSE 3223 

CMD ["npm", "run", "dev"]