@echo off
echo.
echo ========================================
echo  Claude Code Task Organizer Integration
echo ========================================
echo.

REM Check if Node.js is available
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js nao encontrado! Instale Node.js primeiro.
    pause
    exit /b 1
)

echo ✅ Node.js encontrado
echo.

REM Start API server in background
echo 🚀 Iniciando API Local (porta 5555)...
start "Claude Tasks API" cmd /k "node claude-tasks-api.js"

REM Wait for API to start
timeout /t 3 /nobreak >nul

echo ✅ API Local iniciada
echo.

REM Check if frontend is running
echo 🔍 Verificando se o frontend esta rodando...
curl -s http://localhost:3000 >nul 2>&1
if errorlevel 1 (
    echo ⚠️  Frontend nao detectado em localhost:3000
    echo 💡 Inicie o frontend com: npm run dev
    echo.
) else (
    echo ✅ Frontend detectado em localhost:3000
    echo.
)

echo 📋 Status da Integração:
echo    🔗 API Local: http://localhost:5555
echo    🌐 Organizador: http://localhost:3000/dashboard/tasks
echo    📝 Comandos: node claude-tasks.js help
echo.

echo 💡 Comandos Úteis:
echo    node claude-tasks.js status          - Verificar status
echo    node claude-tasks.js list-boards     - Listar quadros
echo    node claude-tasks.js help            - Ver todos os comandos
echo.

echo 🎯 Testando conexão com a API...
node claude-tasks.js status

echo.
echo 🚀 Integração pronta! Use os comandos claude-tasks.js
echo    Pressione qualquer tecla para fechar...
pause >nul