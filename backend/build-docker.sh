#!/bin/bash

echo "🐳 Building ROI Labs Backend Docker Image..."

# Build the Docker image
docker build -t roi-labs-backend .

echo "✅ Docker image built successfully!"

# Optional: Run the container locally for testing
read -p "Do you want to run the container locally for testing? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo "🚀 Starting container on port 5000..."
    docker run -p 5000:5000 \
        -e NODE_ENV=production \
        -e PORT=5000 \
        -e MONGODB_URI=mongodb://localhost:27017/roi-labs \
        -e JWT_SECRET=test-secret \
        -e FRONTEND_URL=http://localhost:3000 \
        --name roi-labs-api-test \
        roi-labs-backend
fi