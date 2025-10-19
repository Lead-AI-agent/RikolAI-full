#!/bin/bash

# Lead Call API - Quick Start Script

set -e

echo "🚀 Lead Call API - Starting..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "Please create a .env file with your configuration."
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Error: Docker is not installed!"
    echo "Please install Docker to use this script."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Error: Docker Compose is not installed!"
    echo "Please install Docker Compose to use this script."
    exit 1
fi

echo "📦 Starting in PRODUCTION mode..."
docker-compose up -d --build
echo "✅ Service started successfully!"
echo "📊 View logs with: docker-compose logs -f"
echo "🛑 Stop service with: docker-compose down"

