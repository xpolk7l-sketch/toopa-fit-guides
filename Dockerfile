# syntax=docker/dockerfile:1.7

# ---------- Builder ----------
FROM oven/bun:1.1-alpine AS builder
WORKDIR /app

# Install deps (cached layer)
COPY package.json bun.lock bunfig.toml ./
RUN bun install --frozen-lockfile

# Copy sources and build for Node server target
COPY . .
ENV NITRO_PRESET=node-server
ENV NODE_ENV=production
RUN bun run build

# ---------- Runtime ----------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Nitro node-server output is fully self-contained
COPY --from=builder /app/.output ./.output

EXPOSE 3000
USER node

CMD ["node", ".output/server/index.mjs"]
