#!/bin/bash

# CalorieTracker Quick Setup Script
echo "🚀 Setting up CalorieTracker..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Setup Backend
echo "📦 Setting up backend..."
cd backend
npm install

echo "🐘 Starting PostgreSQL database..."
docker-compose up -d

echo "⏳ Waiting for database to be ready..."
sleep 5

echo "🔧 Setting up database schema..."
npm run db:push
npm run db:generate

echo "🚀 Starting backend server..."
npm run dev &
BACKEND_PID=$!

cd ..

# Setup Frontend
echo "📦 Setting up frontend..."
cd frontend
npm install

echo "🚀 Starting frontend server..."
npm run dev &
FRONTEND_PID=$!

cd ..

echo "🎉 Setup complete!"
echo ""
echo "📱 Your CalorieTracker app is now running:"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for interrupt
trap "echo '🛑 Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait