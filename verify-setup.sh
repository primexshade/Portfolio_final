#!/bin/bash

# Quick verification script for MERN Portfolio
echo "🔍 Verifying MERN Portfolio Setup..."
echo ""

# Check if Node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    exit 1
else
    echo "✅ Node.js: $(node -v)"
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
else
    echo "✅ npm: $(npm -v)"
fi

# Check if backend dependencies are installed
if [ ! -d "server/node_modules" ]; then
    echo "⚠️  Server dependencies not installed"
    echo "   Run: cd server && npm install"
else
    echo "✅ Server dependencies installed"
fi

# Check if frontend dependencies are installed
if [ ! -d "client/node_modules" ]; then
    echo "⚠️  Client dependencies not installed"
    echo "   Run: cd client && npm install"
else
    echo "✅ Client dependencies installed"
fi

# Check if .env files exist
if [ ! -f "server/.env" ]; then
    echo "⚠️  Server .env not found"
    echo "   Copy: cp server/.env.example server/.env"
else
    echo "✅ Server .env exists"
fi

if [ ! -f "client/.env" ]; then
    echo "⚠️  Client .env not found"
    echo "   Copy: cp client/.env.example client/.env"
else
    echo "✅ Client .env exists"
fi

echo ""
echo "📋 Next Steps:"
echo "1. Start backend:  cd server && npm run dev"
echo "2. Seed projects:  cd server && npm run seed"
echo "3. Start frontend: cd client && npm run dev"
echo "4. Visit: http://localhost:5173"
echo ""
echo "📚 Full documentation: See NEXT_STEPS.md"
