#!/bin/bash

echo "🚀 Setting up Amauta Backend for development..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20 LTS"
    exit 1
fi

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt "18" ]; then
    echo "⚠️  Node.js version $NODE_VERSION detected. Recommended: Node.js 20 LTS"
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚙️ Creating .env from example..."
    cp .env.example .env
    echo "⚠️  Please edit .env with your Supabase credentials"
else
    echo "✅ .env file exists"
fi

# Generate Prisma client
echo "🗄️ Generating Prisma client..."
npm run db:generate

echo "✨ Setup completed!"
echo ""
echo "Next steps:"
echo "1. Edit .env with your Supabase credentials"
echo "2. Run 'npm run db:migrate' to setup database"
echo "3. Run 'npm run db:seed' to seed initial data"
echo "4. Run 'npm run dev' to start development server"
echo ""
echo "Happy coding! 🎉"