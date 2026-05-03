@echo off
echo 🚀 Setting up Amauta Backend for development...

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 20 LTS
    exit /b 1
)

echo ✅ Node.js detected
node -v

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

REM Check if .env exists
if not exist ".env" (
    echo ⚙️ Creating .env from example...
    copy .env.example .env
    echo ⚠️  Please edit .env with your Supabase credentials
) else (
    echo ✅ .env file exists
)

REM Generate Prisma client
echo 🗄️ Generating Prisma client...
call npm run db:generate

echo ✨ Setup completed!
echo.
echo Next steps:
echo 1. Edit .env with your Supabase credentials
echo 2. Run 'npm run db:migrate' to setup database
echo 3. Run 'npm run db:seed' to seed initial data
echo 4. Run 'npm run dev' to start development server
echo.
echo Happy coding! 🎉
pause