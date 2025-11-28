# 🎯 快速开始指南

欢迎使用 SEC EDGAR ScriptGen！按照以下步骤快速启动项目。

## ⚡ 快速启动（3 步）

### 步骤 1: 安装依赖

在项目根目录运行：

```bash
npm install
```

### 步骤 2: 配置 API 密钥

1. 访问 [Google AI Studio](https://aistudio.google.com/app/apikey) 获取 Gemini API 密钥
2. 复制 `.env.example` 为 `.env.local`：
   ```bash
   # Windows CMD
   copy .env.example .env.local
   
   # macOS/Linux
   cp .env.example .env.local
   ```
3. 编辑 `.env.local` 文件，替换为您的 API 密钥：
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

### 步骤 3: 启动应用

```bash
npm run dev
```

然后在浏览器中访问 [http://localhost:3000](http://localhost:3000)

---

## 🚀 使用快速启动脚本（推荐）

我们提供了自动化启动脚本，会自动检查环境并设置配置。

### Windows 用户

双击运行 `start.bat` 文件，或在命令行中运行：

```cmd
start.bat
```

### macOS/Linux 用户

在终端中运行：

```bash
chmod +x start.sh
./start.sh
```

---

## 📖 功能使用

1. **填写开发者信息**
   - 开发者姓名：您的姓名或公司名称
   - 开发者邮箱：您的联系邮箱
   - 这些信息会被用于生成符合 SEC 要求的 User-Agent 头

2. **描述数据需求**
   - 示例："获取苹果公司的最新 10-K 报告"
   - 示例："下载特斯拉的公司财务数据"
   - 示例："获取微软的所有 XBRL 文件"

3. **生成脚本**
   - 点击"生成 Python 脚本"按钮
   - 等待 AI 处理（通常需要 3-5 秒）
   - 查看生成的 Python 代码和说明

4. **使用代码**
   - 点击"复制"按钮复制代码
   - 在本地创建 `.py` 文件
   - 安装 Python 的 `requests` 库：`pip install requests`
   - 运行脚本获取 SEC 数据

---

## 🔒 安全说明

- ✅ **API 密钥安全**：您的 Gemini API 密钥仅保存在服务器端，永远不会暴露给浏览器
- ✅ **后端处理**：所有 AI 请求都通过 Next.js API 路由处理
- ✅ **环境隔离**：`.env.local` 文件已在 `.gitignore` 中，不会被提交到 Git

---

## ⚙️ 可用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器（支持热重载） |
| `npm run build` | 构建生产版本 |
| `npm start` | 运行生产服务器 |
| `npm run lint` | 运行代码检查 |

---

## 🐛 常见问题

### 端口被占用

如果 3000 端口已被使用，可以指定其他端口：

```bash
PORT=3001 npm run dev
```

### API 调用失败

1. 检查 `.env.local` 文件是否存在
2. 验证 API 密钥是否正确
3. 重启开发服务器
4. 检查网络连接

### 样式显示异常

清除缓存并重新安装：

```bash
rm -rf .next node_modules
npm install
npm run dev
```

---

## 📚 更多文档

- [完整安装指南](./INSTALLATION.md) - 详细的安装步骤和故障排除
- [README](./README.md) - 项目概述和功能介绍
- [Next.js 文档](https://nextjs.org/docs) - 了解 Next.js 框架

---

## 💬 需要帮助？

遇到问题？请通过以下方式获取帮助：

1. 查看 [INSTALLATION.md](./INSTALLATION.md) 中的常见问题
2. 在 GitHub 上创建 Issue
3. 查看项目文档和示例

---

**祝您使用愉快！如果觉得有用，请给项目点个 Star ⭐**

