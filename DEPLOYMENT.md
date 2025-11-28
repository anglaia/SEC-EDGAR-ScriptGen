# 📦 部署指南

本指南将帮助您将 SEC EDGAR ScriptGen 部署到生产环境。

## 🌐 部署选项

### 1. Vercel（推荐）

Vercel 是 Next.js 的最佳托管平台，提供零配置部署。

#### 步骤：

1. **准备 GitHub 仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **在 Vercel 上部署**
   - 访问 [vercel.com](https://vercel.com)
   - 点击 "New Project"
   - 导入您的 GitHub 仓库
   - Vercel 会自动检测到这是 Next.js 项目

3. **配置环境变量**
   - 在项目设置中找到 "Environment Variables"
   - 添加：
     - Key: `GEMINI_API_KEY`
     - Value: 您的 Gemini API 密钥
   - 选择适用环境：Production, Preview, Development（建议全选）

4. **部署**
   - 点击 "Deploy" 按钮
   - 等待构建完成（通常 1-2 分钟）
   - 获取生产 URL（例如：`your-app.vercel.app`）

5. **自动部署**
   - 以后每次推送到 GitHub，Vercel 会自动重新部署

---

### 2. Netlify

另一个优秀的部署平台。

#### 步骤：

1. **准备代码**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push
   ```

2. **在 Netlify 上部署**
   - 访问 [netlify.com](https://netlify.com)
   - 点击 "Add new site" → "Import an existing project"
   - 连接 GitHub 并选择仓库

3. **构建设置**
   - Build command: `npm run build`
   - Publish directory: `.next`

4. **环境变量**
   - 在 "Site settings" → "Environment variables"
   - 添加 `GEMINI_API_KEY`

5. **部署**
   - 点击 "Deploy site"

---

### 3. Docker 部署

适用于自托管环境。

#### Dockerfile

创建 `Dockerfile`：

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - GEMINI_API_KEY=${GEMINI_API_KEY}
    restart: unless-stopped
```

#### 运行

```bash
# 构建镜像
docker build -t sec-edgar-scriptgen .

# 运行容器
docker run -p 3000:3000 -e GEMINI_API_KEY=your_key sec-edgar-scriptgen

# 或使用 docker-compose
docker-compose up -d
```

---

### 4. AWS / Azure / Google Cloud

#### 通用步骤：

1. **构建应用**
   ```bash
   npm run build
   ```

2. **上传文件**
   - 上传整个项目目录到服务器
   - 确保包含 `.next`, `node_modules`, `public` 等目录

3. **安装 PM2（进程管理器）**
   ```bash
   npm install -g pm2
   ```

4. **创建启动脚本** (`ecosystem.config.js`)
   ```javascript
   module.exports = {
     apps: [{
       name: 'sec-edgar-scriptgen',
       script: 'node_modules/next/dist/bin/next',
       args: 'start',
       env: {
         NODE_ENV: 'production',
         GEMINI_API_KEY: 'your_api_key'
       }
     }]
   }
   ```

5. **启动应用**
   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

---

## 🔐 安全性最佳实践

### 1. 环境变量

**✅ 正确做法：**
- 使用 `.env.local` 或平台的环境变量设置
- 不要在代码中硬编码密钥
- 确保 `.env.local` 在 `.gitignore` 中

**❌ 错误做法：**
```javascript
// 不要这样做！
const apiKey = "AIzaSyC..." // 硬编码密钥
```

### 2. API 路由保护

考虑添加速率限制：

```typescript
// app/api/generate/route.ts
import { rateLimit } from '@/lib/rate-limit'

const limiter = rateLimit({
  interval: 60 * 1000, // 1 分钟
  uniqueTokenPerInterval: 500,
})

export async function POST(request: NextRequest) {
  try {
    await limiter.check(request, 10, 'CACHE_TOKEN') // 每分钟 10 次
    // ... 其余代码
  } catch {
    return NextResponse.json(
      { error: '请求过于频繁，请稍后再试' },
      { status: 429 }
    )
  }
}
```

### 3. CORS 设置

如果需要允许特定域名访问：

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://yourdomain.com' },
          { key: 'Access-Control-Allow-Methods', value: 'POST' },
        ],
      },
    ]
  },
}
```

---

## 📊 性能优化

### 1. 启用压缩

```javascript
// next.config.js
module.exports = {
  compress: true,
}
```

### 2. 图片优化

如果添加图片，使用 Next.js Image 组件：

```tsx
import Image from 'next/image'

<Image src="/logo.png" alt="Logo" width={200} height={200} />
```

### 3. 缓存策略

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
}
```

---

## 🔍 监控和日志

### Vercel Analytics

Vercel 自动提供：
- 性能监控
- 错误跟踪
- 访问统计

### 自定义日志

在 API 路由中添加日志：

```typescript
export async function POST(request: NextRequest) {
  console.log(`[${new Date().toISOString()}] Generate request received`)
  
  try {
    // ... 代码
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error:`, error)
  }
}
```

---

## ✅ 部署前检查清单

- [ ] 所有依赖已在 `package.json` 中正确声明
- [ ] 环境变量已正确配置
- [ ] `.gitignore` 包含敏感文件（`.env.local`, `node_modules`）
- [ ] 本地测试通过 (`npm run build && npm start`)
- [ ] TypeScript 类型检查通过 (`npm run lint`)
- [ ] API 端点测试通过
- [ ] README 更新完整
- [ ] 域名配置（如果有）
- [ ] SSL 证书配置（如果需要）

---

## 🆘 故障排除

### 构建失败

1. 检查 Node.js 版本（需要 18+）
2. 清除缓存：`rm -rf .next node_modules && npm install`
3. 检查 TypeScript 错误：`npm run lint`

### API 调用失败

1. 验证环境变量是否正确设置
2. 检查 API 密钥是否有效
3. 查看服务器日志

### 性能问题

1. 启用 Next.js 缓存
2. 使用 CDN 服务
3. 优化图片和资源

---

## 📞 获取帮助

- [Next.js 部署文档](https://nextjs.org/docs/deployment)
- [Vercel 文档](https://vercel.com/docs)
- [GitHub Issues](您的仓库 Issues 页面)

---

**部署成功后，别忘了分享您的项目链接！** 🎉

