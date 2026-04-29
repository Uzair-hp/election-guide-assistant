@echo off
echo ========================================================
echo Starting Election Guide Assistant
echo ========================================================

:: Add nodejs to local PATH for this script session
set PATH=%PATH%;C:\Program Files\nodejs

echo Starting Backend Server...
start "Backend Server" cmd /k "set PATH=%%PATH%%;C:\Program Files\nodejs && cd backend && npm run dev"

echo Starting Frontend Server...
start "Frontend Server" cmd /k "set PATH=%%PATH%%;C:\Program Files\nodejs && cd frontend && npm run dev"

echo.
echo Both servers have been launched in separate windows!
echo Please wait a moment for Vite to start and open http://localhost:56310/ in your browser.
echo You can close this window now.
pause
