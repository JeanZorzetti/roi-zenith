# Use Node.js 18 LTS Alpine for smaller image size
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install ALL dependencies (including devDependencies for building)
COPY package.json package-lock.json* ./
RUN npm ci --ignore-scripts

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
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --only=production --ignore-scripts

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

# Create a non-privileged user that the app will run under.
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

# Copy the built application
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=prod-deps --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/prisma ./prisma
COPY --chown=nodejs:nodejs package.json ./
COPY --chown=nodejs:nodejs start.sh ./

# Generate Prisma Client only (db push will run at runtime)
RUN npx prisma generate

# Make start script executable
RUN chmod +x start.sh

USER nodejs

# Expose the port that the application listens on.
EXPOSE 5000

# Set the PORT environment variable
ENV PORT=5000

# Run the application with database setup
CMD ["./start.sh"]