# Stage 1: Build the application
FROM node:lts-slim AS installer

# Set environment variables for pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Enable corepack
RUN corepack enable

# Set working directory
WORKDIR /app

# Copy package.json and lock file
COPY ../../../pnpm-lock.yaml ./pnpm-lock.yaml
COPY ../../../package.json ./package.json

# Install dependencies using pnpm with caching
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --ignore-scripts

FROM node:lts-slim AS builder

COPY --from=installer /app/node_modules /app/node_modules

WORKDIR /app

COPY ../../../ .

RUN npx nx run frontend:build:production


FROM node:lts-slim AS production

WORKDIR /app

COPY --from=builder /app/dist/apps/frontend /app/dist
COPY --from=builder /app/node_modules /app/node_modules
COPY ../../scripts/slack.js /app/scripts/slack.js

RUN npm install -g http-server

CMD ["http-server", "-p", "80", "-c-1", "dist", "--proxy", "http://localhost:80?"]
