#!/bin/bash

# 项目设置检查脚本

echo "🔍 SEC EDGAR ScriptGen - 项目设置检查"
echo "======================================"
echo ""

ERRORS=0
WARNINGS=0

# 检查 Node.js
echo "1️⃣  检查 Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "   ✅ Node.js 已安装: $NODE_VERSION"
    
    # 检查版本是否 >= 18
    NODE_MAJOR=$(echo $NODE_VERSION | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_MAJOR" -lt 18 ]; then
        echo "   ⚠️  警告: Node.js 版本应该 >= 18.0"
        WARNINGS=$((WARNINGS+1))
    fi
else
    echo "   ❌ Node.js 未安装"
    ERRORS=$((ERRORS+1))
fi
echo ""

# 检查 npm
echo "2️⃣  检查 npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "   ✅ npm 已安装: v$NPM_VERSION"
else
    echo "   ❌ npm 未安装"
    ERRORS=$((ERRORS+1))
fi
echo ""

# 检查 node_modules
echo "3️⃣  检查依赖..."
if [ -d "node_modules" ]; then
    echo "   ✅ 依赖已安装"
else
    echo "   ⚠️  依赖未安装，请运行: npm install"
    WARNINGS=$((WARNINGS+1))
fi
echo ""

# 检查 .env.local
echo "4️⃣  检查环境变量..."
if [ -f ".env.local" ]; then
    echo "   ✅ .env.local 文件存在"
    
    # 检查是否包含 API 密钥
    if grep -q "GEMINI_API_KEY=" .env.local; then
        # 检查是否还是占位符
        if grep -q "your_gemini_api_key_here" .env.local; then
            echo "   ⚠️  警告: API 密钥仍是占位符，请更新为实际密钥"
            WARNINGS=$((WARNINGS+1))
        else
            echo "   ✅ API 密钥已配置"
        fi
    else
        echo "   ❌ .env.local 缺少 GEMINI_API_KEY"
        ERRORS=$((ERRORS+1))
    fi
else
    echo "   ⚠️  .env.local 文件不存在"
    echo "      请复制 .env.example 为 .env.local 并配置 API 密钥"
    WARNINGS=$((WARNINGS+1))
fi
echo ""

# 检查关键文件
echo "5️⃣  检查项目文件..."
REQUIRED_FILES=(
    "package.json"
    "next.config.js"
    "tsconfig.json"
    "app/layout.tsx"
    "app/page.tsx"
    "app/api/generate/route.ts"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "   ✅ $file"
    else
        echo "   ❌ 缺少文件: $file"
        ERRORS=$((ERRORS+1))
    fi
done
echo ""

# 检查 .gitignore
echo "6️⃣  检查 .gitignore..."
if [ -f ".gitignore" ]; then
    if grep -q ".env.local" .gitignore && grep -q "node_modules" .gitignore; then
        echo "   ✅ .gitignore 配置正确"
    else
        echo "   ⚠️  .gitignore 可能配置不完整"
        WARNINGS=$((WARNINGS+1))
    fi
else
    echo "   ⚠️  .gitignore 不存在"
    WARNINGS=$((WARNINGS+1))
fi
echo ""

# 总结
echo "======================================"
echo "检查完成！"
echo ""

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo "🎉 所有检查通过！项目已准备就绪。"
    echo ""
    echo "下一步："
    echo "  运行 'npm run dev' 启动开发服务器"
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo "⚠️  发现 $WARNINGS 个警告"
    echo "   项目可以运行，但建议修复警告"
    exit 0
else
    echo "❌ 发现 $ERRORS 个错误和 $WARNINGS 个警告"
    echo "   请先解决这些问题"
    exit 1
fi

