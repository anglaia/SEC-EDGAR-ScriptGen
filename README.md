<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# SEC EDGAR ScriptGen - Next.js 全栈版本

这是一个基于 Next.js 的全栈应用程序，使用 Gemini AI 为 SEC EDGAR API 生成符合规范的 Python 脚本。

## ✨ 功能特性

- 🤖 **AI 驱动**：使用 Google Gemini AI 生成定制的 Python 脚本
- 🔒 **安全性**：API 密钥安全地保存在后端环境变量中
- 🎨 **现代 UI**：使用 Tailwind CSS 构建的美观界面
- ⚡ **快速响应**：Next.js App Router 提供出色的性能
- 📱 **响应式设计**：支持桌面和移动设备

## 🚀 技术栈

- **前端**: Next.js 15, React 18, TypeScript
- **样式**: Tailwind CSS
- **AI**: Google Gemini API
- **图标**: Lucide React

## 📋 前置要求

- Node.js 18.0 或更高版本
- 一个 Gemini API 密钥（从 [Google AI Studio](https://aistudio.google.com/app/apikey) 获取）

## 🛠️ 本地运行

1. **克隆仓库**
   ```bash
   git clone <repository-url>
   cd SEC-EDGAR-ScriptGen
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **配置环境变量**
   
   创建一个 `.env.local` 文件并添加您的 Gemini API 密钥：
   ```bash
   cp .env.example .env.local
   ```
   
   然后编辑 `.env.local` 文件：
   ```
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

4. **启动开发服务器**
   ```bash
   npm run dev
   ```

5. **访问应用**
   
   在浏览器中打开 [http://localhost:3000](http://localhost:3000)

### 🚀 快速启动脚本

为了方便使用，我们提供了自动化启动脚本：

**Windows 用户：**
```cmd
start.bat
```

**Linux/macOS 用户：**
```bash
chmod +x start.sh
./start.sh
```

### ✅ 验证设置

运行设置检查脚本确保项目配置正确：

**Windows：**
```cmd
check-setup.bat
```

**Linux/macOS：**
```bash
chmod +x check-setup.sh
./check-setup.sh
```

## 📚 完整文档

- 📖 [快速开始指南](./QUICKSTART.md) - 3 步快速启动
- 📖 [详细安装指南](./INSTALLATION.md) - 完整的安装说明和故障排除
- 📖 [项目结构说明](./PROJECT_STRUCTURE.md) - 理解项目架构
- 📖 [部署指南](./DEPLOYMENT.md) - 部署到生产环境
- 📖 [迁移总结](./MIGRATION_SUMMARY.md) - 从 Vite 迁移到 Next.js 的说明

## 📦 构建部署

### 生产构建

```bash
npm run build
npm start
```

### 部署到 Vercel

1. 将代码推送到 GitHub 仓库
2. 在 [Vercel](https://vercel.com) 中导入项目
3. 在 Vercel 项目设置中添加环境变量 `GEMINI_API_KEY`
4. 部署！

## 🏗️ 项目结构

```
SEC-EDGAR-ScriptGen/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts          # API 路由处理 Gemini 调用
│   ├── components/
│   │   ├── ConfigForm.tsx        # 配置表单组件
│   │   └── CodeViewer.tsx        # 代码查看器组件
│   ├── globals.css               # 全局样式
│   ├── layout.tsx                # 根布局
│   ├── page.tsx                  # 主页面
│   └── types.ts                  # TypeScript 类型定义
├── public/                       # 静态资源
├── .env.example                  # 环境变量示例
├── .gitignore                    # Git 忽略文件
├── next.config.js                # Next.js 配置
├── package.json                  # 项目依赖
├── postcss.config.js             # PostCSS 配置
├── tailwind.config.js            # Tailwind CSS 配置
└── tsconfig.json                 # TypeScript 配置
```

## 🔒 安全性

- ✅ API 密钥存储在服务器端环境变量中
- ✅ 前端代码中不包含任何敏感信息
- ✅ 所有 API 调用通过 Next.js API 路由进行
- ✅ 环境变量不会暴露给客户端

## 📝 使用说明

1. 填写开发者姓名和邮箱（SEC 要求用于 User-Agent）
2. 描述您想要获取的数据（例如："获取苹果公司的最新 10-K 报告"）
3. 点击"生成 Python 脚本"按钮
4. 等待 AI 生成符合规范的 Python 代码
5. 复制代码并在本地运行

## 🌐 关于 SEC EDGAR API

SEC EDGAR API 要求所有请求必须包含有效的 `User-Agent` 头信息，格式为：
```
Name email@address.com
```

此应用会自动为您生成包含正确 User-Agent 设置的 Python 代码。

更多信息请访问：[SEC EDGAR API 文档](https://www.sec.gov/edgar/sec-api-documentation)

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📧 联系方式

如有问题或建议，请通过 GitHub Issues 联系我们。
