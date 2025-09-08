#!/bin/sh

# Wait for database to be ready and push schema
echo "🔄 Setting up database schema..."
npx prisma db push --accept-data-loss

# Start the application
echo "🚀 Starting ROI Labs API server..."
exec node dist/server.js