@echo off
REM SEC EDGAR ScriptGen 快速启动脚本（Windows）

echo.
echo ======================================================
echo   SEC EDGAR ScriptGen - Next.js 快速启动
echo ======================================================
echo.

REM 检查 Node.js 是否安装
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ❌ 错误: Node.js 未安装
    echo 请从 https://nodejs.org 下载并安装 Node.js
    pause
    exit /b 1
)

echo ✅ Node.js 已安装
node --version
echo ✅ npm 已安装
npm --version
echo.

REM 检查是否已安装依赖
if not exist "node_modules" (
    echo 📦 正在安装依赖...
    call npm install
    echo.
)

REM 检查 .env.local 文件
if not exist ".env.local" (
    echo ⚠️  警告: .env.local 文件不存在
    echo.
    echo 正在创建 .env.local 文件...
    
    if exist ".env.example" (
        copy .env.example .env.local >nul
        echo ✅ 已创建 .env.local 文件
    ) else (
        echo GEMINI_API_KEY=your_gemini_api_key_here > .env.local
        echo ✅ 已创建 .env.local 文件
    )
    
    echo.
    echo ⚠️  重要: 请编辑 .env.local 文件，添加您的 Gemini API 密钥
    echo    获取密钥: https://aistudio.google.com/app/apikey
    echo.
    pause
)

echo.
echo 🎯 启动开发服务器...
echo.
echo 服务器启动后，请在浏览器中访问：
echo    http://localhost:3000
echo.
echo 按 Ctrl+C 停止服务器
echo.

call npm run dev

