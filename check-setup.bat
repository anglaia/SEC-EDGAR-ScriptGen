@echo off
REM 项目设置检查脚本（Windows）

setlocal enabledelayedexpansion

echo.
echo ============================================
echo   SEC EDGAR ScriptGen - 项目设置检查
echo ============================================
echo.

set ERRORS=0
set WARNINGS=0

REM 检查 Node.js
echo 1. 检查 Node.js...
where node >nul 2>nul
if %ERRORLEVEL% equ 0 (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo    ✅ Node.js 已安装: !NODE_VERSION!
) else (
    echo    ❌ Node.js 未安装
    set /a ERRORS+=1
)
echo.

REM 检查 npm
echo 2. 检查 npm...
where npm >nul 2>nul
if %ERRORLEVEL% equ 0 (
    for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
    echo    ✅ npm 已安装: v!NPM_VERSION!
) else (
    echo    ❌ npm 未安装
    set /a ERRORS+=1
)
echo.

REM 检查 node_modules
echo 3. 检查依赖...
if exist "node_modules\" (
    echo    ✅ 依赖已安装
) else (
    echo    ⚠️  依赖未安装，请运行: npm install
    set /a WARNINGS+=1
)
echo.

REM 检查 .env.local
echo 4. 检查环境变量...
if exist ".env.local" (
    echo    ✅ .env.local 文件存在
    
    REM 检查是否包含 API 密钥
    findstr /C:"GEMINI_API_KEY=" .env.local >nul
    if !ERRORLEVEL! equ 0 (
        findstr /C:"your_gemini_api_key_here" .env.local >nul
        if !ERRORLEVEL! equ 0 (
            echo    ⚠️  警告: API 密钥仍是占位符，请更新为实际密钥
            set /a WARNINGS+=1
        ) else (
            echo    ✅ API 密钥已配置
        )
    ) else (
        echo    ❌ .env.local 缺少 GEMINI_API_KEY
        set /a ERRORS+=1
    )
) else (
    echo    ⚠️  .env.local 文件不存在
    echo       请复制 .env.example 为 .env.local 并配置 API 密钥
    set /a WARNINGS+=1
)
echo.

REM 检查关键文件
echo 5. 检查项目文件...
set FILES=package.json next.config.js tsconfig.json app\layout.tsx app\page.tsx app\api\generate\route.ts

for %%f in (%FILES%) do (
    if exist "%%f" (
        echo    ✅ %%f
    ) else (
        echo    ❌ 缺少文件: %%f
        set /a ERRORS+=1
    )
)
echo.

REM 检查 .gitignore
echo 6. 检查 .gitignore...
if exist ".gitignore" (
    findstr /C:".env.local" .gitignore >nul && findstr /C:"node_modules" .gitignore >nul
    if !ERRORLEVEL! equ 0 (
        echo    ✅ .gitignore 配置正确
    ) else (
        echo    ⚠️  .gitignore 可能配置不完整
        set /a WARNINGS+=1
    )
) else (
    echo    ⚠️  .gitignore 不存在
    set /a WARNINGS+=1
)
echo.

REM 总结
echo ============================================
echo 检查完成！
echo.

if !ERRORS! equ 0 if !WARNINGS! equ 0 (
    echo 🎉 所有检查通过！项目已准备就绪。
    echo.
    echo 下一步：
    echo   运行 'npm run dev' 启动开发服务器
    exit /b 0
)

if !ERRORS! equ 0 (
    echo ⚠️  发现 !WARNINGS! 个警告
    echo    项目可以运行，但建议修复警告
    exit /b 0
)

echo ❌ 发现 !ERRORS! 个错误和 !WARNINGS! 个警告
echo    请先解决这些问题
pause
exit /b 1

