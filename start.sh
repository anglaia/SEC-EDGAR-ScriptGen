#!/bin/bash

# SEC EDGAR ScriptGen 快速启动脚本

echo "🚀 SEC EDGAR ScriptGen - Next.js 快速启动"
echo "========================================="
echo ""

# 检查 Node.js 是否安装
if ! command -v node &> /dev/null; then
    echo "❌ 错误: Node.js 未安装"
    echo "请从 https://nodejs.org 下载并安装 Node.js"
    exit 1
fi

echo "✅ Node.js 版本: $(node --version)"
echo "✅ npm 版本: $(npm --version)"
echo ""

# 检查是否已安装依赖
if [ ! -d "node_modules" ]; then
    echo "📦 正在安装依赖..."
    npm install
    echo ""
fi

# 检查 .env.local 文件
if [ ! -f ".env.local" ]; then
    echo "⚠️  警告: .env.local 文件不存在"
    echo ""
    echo "正在创建 .env.local 文件..."
    
    if [ -f ".env.example" ]; then
        cp .env.example .env.local
        echo "✅ 已创建 .env.local 文件"
    else
        echo "GEMINI_API_KEY=your_gemini_api_key_here" > .env.local
        echo "✅ 已创建 .env.local 文件"
    fi
    
    echo ""
    echo "⚠️  重要: 请编辑 .env.local 文件，添加您的 Gemini API 密钥"
    echo "   获取密钥: https://aistudio.google.com/app/apikey"
    echo ""
    read -p "按 Enter 键继续..."
fi

echo ""
echo "🎯 启动开发服务器..."
echo ""

npm run dev

