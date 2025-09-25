#!/bin/sh

echo "🚀 Starting ROI Labs Backend..."

# Wait for database and apply schema changes
echo "📦 Applying database schema changes..."
npx prisma db push --accept-data-loss

echo "✅ Database schema updated successfully"

echo "🌟 Starting server..."
exec node dist/server.js