# Production Dockerfile using GitHub Container Registry (resolves Docker Hub 401 issues)
FROM ghcr.io/linuxserver/baseimage-ubuntu:jammy AS base

# Install Node.js and npm with security updates
RUN apt-get update && apt-get install -y \
    curl \
    ca-certificates \
    gnupg \
    lsb-release \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && apt-get upgrade -y \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && npm config set fund false \
    && npm config set audit-level high

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Install ALL dependencies (including devDependencies for building)
COPY package.json package-lock.json* ./
RUN npm install --ignore-scripts --network-timeout=300000 --fetch-timeout=300000 --fetch-retries=3 --omit=optional

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client first
RUN npx prisma generate

# Build the application
RUN npm run build

# Production dependencies only
FROM base AS prod-deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --omit=dev --ignore-scripts --network-timeout=300000 --fetch-timeout=300000 --fetch-retries=3 --omit=optional

# Production image, copy all the files and run the app
FROM base AS runner
WORKDIR /app

# Build arguments for database connection
ARG DATABASE_URL
ARG DB_HOST
ARG DB_USER
ARG DB_PASSWORD
ARG DB_NAME
ARG DB_PORT

ENV NODE_ENV=production
ENV DATABASE_URL=$DATABASE_URL

# Use the same user that the base image expects (UID 911, GID 1000)
# This matches linuxserver.io base image user configuration

# Copy the built application with correct ownership
COPY --from=builder --chown=911:1000 /app/dist ./dist
COPY --from=prod-deps --chown=911:1000 /app/node_modules ./node_modules
COPY --from=builder --chown=911:1000 /app/prisma ./prisma
COPY --chown=911:1000 package.json ./
COPY --chown=911:1000 start.sh ./

# Generate Prisma Client only (db push will run at runtime)
RUN npx prisma generate

# Make start script executable
RUN chmod +x start.sh

# Set user to match base image expectations
USER 911:1000

# Expose the port that the application listens on.
EXPOSE 5000

# Set the PORT environment variable
ENV PORT=5000

# Run the application with database setup
CMD ["./start.sh"]