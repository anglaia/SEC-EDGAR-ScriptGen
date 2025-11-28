# 🚀 SEC EDGAR ScriptGen 安装指南

本指南将帮助您在本地环境中设置和运行 SEC EDGAR ScriptGen Next.js 应用。

## 📋 系统要求

- **Node.js**: 18.0 或更高版本
- **npm**: 9.0 或更高版本（通常随 Node.js 一起安装）
- **操作系统**: Windows, macOS, 或 Linux

## 🔑 获取 Gemini API 密钥

在开始之前，您需要一个 Gemini API 密钥：

1. 访问 [Google AI Studio](https://aistudio.google.com/app/apikey)
2. 使用您的 Google 账户登录
3. 点击"创建 API 密钥"按钮
4. 复制生成的 API 密钥（请妥善保管）

## 📥 安装步骤

### 1. 克隆或下载项目

```bash
# 如果使用 Git
git clone <repository-url>
cd SEC-EDGAR-ScriptGen

# 或者直接下载 ZIP 文件并解压
```

### 2. 安装依赖包

在项目根目录下运行：

```bash
npm install
```

这将安装所有必需的依赖包，包括：
- Next.js
- React
- TypeScript
- Tailwind CSS
- Google Generative AI SDK
- Lucide React (图标库)

### 3. 配置环境变量

创建 `.env.local` 文件：

```bash
# Windows PowerShell
Copy-Item .env.example .env.local

# macOS/Linux
cp .env.example .env.local
```

然后编辑 `.env.local` 文件，替换为您的实际 API 密钥：

```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

**重要提示**：
- ⚠️ 不要将 `.env.local` 文件提交到 Git
- ⚠️ 不要在前端代码中硬编码 API 密钥
- ✅ API 密钥仅在服务器端使用，确保安全

### 4. 启动开发服务器

```bash
npm run dev
```

您应该会看到类似以下的输出：

```
   ▲ Next.js 15.0.3
   - Local:        http://localhost:3000
   - Environments: .env.local

 ✓ Starting...
 ✓ Ready in 2.5s
```

### 5. 访问应用

打开浏览器并访问：

```
http://localhost:3000
```

## 🧪 测试应用

1. 填写表单：
   - 开发者姓名：例如 "张三"
   - 开发者邮箱：例如 "zhangsan@example.com"
   - 数据需求：例如 "获取苹果公司 (AAPL) 的最新 10-K 报告"

2. 点击"生成 Python 脚本"按钮

3. 等待几秒钟，AI 将生成符合 SEC EDGAR API 规范的 Python 代码

4. 点击"复制"按钮复制生成的代码

## 🔧 常见问题

### Q: 安装依赖时出现错误

**A**: 尝试以下步骤：
```bash
# 清除 npm 缓存
npm cache clean --force

# 删除 node_modules 和 package-lock.json
rm -rf node_modules package-lock.json

# 重新安装
npm install
```

### Q: 启动时提示端口 3000 已被占用

**A**: 您可以使用其他端口：
```bash
PORT=3001 npm run dev
```

### Q: API 调用失败

**A**: 检查以下项：
1. 确认 `.env.local` 文件存在且包含有效的 API 密钥
2. 重启开发服务器（Ctrl+C 然后重新运行 `npm run dev`）
3. 检查网络连接
4. 验证 API 密钥是否有效（访问 AI Studio 检查）

### Q: 样式未正确显示

**A**: 确保已正确安装 Tailwind CSS：
```bash
npm install -D tailwindcss postcss autoprefixer
```

## 🏗️ 构建生产版本

### 本地构建和运行

```bash
# 构建
npm run build

# 启动生产服务器
npm start
```

### 部署到 Vercel

1. 将代码推送到 GitHub 仓库

2. 访问 [vercel.com](https://vercel.com) 并登录

3. 点击"New Project"并导入您的 GitHub 仓库

4. 在"Environment Variables"部分添加：
   - Name: `GEMINI_API_KEY`
   - Value: 您的 Gemini API 密钥

5. 点击"Deploy"

6. 等待部署完成，Vercel 会提供一个生产 URL

## 📚 其他资源

- [Next.js 文档](https://nextjs.org/docs)
- [Gemini API 文档](https://ai.google.dev/docs)
- [SEC EDGAR API 文档](https://www.sec.gov/edgar/sec-api-documentation)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)

## 💡 开发提示

### 热重载
开发服务器支持热重载，您可以实时看到代码更改的效果。

### TypeScript
项目使用 TypeScript，编辑器会提供类型检查和自动完成功能。

### 调试
打开浏览器开发者工具（F12）查看控制台日志和网络请求。

## 🆘 获取帮助

如果您遇到问题：

1. 查看 [README.md](./README.md) 文件
2. 检查项目的 GitHub Issues
3. 搜索相关的错误信息
4. 创建新的 Issue 描述您的问题

祝您使用愉快！🎉

