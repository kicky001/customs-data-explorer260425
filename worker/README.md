# Cloudflare Worker — CORS 代理

绕开 `cd.210k.cc` 浏览器直连的 CORS 限制。

## 方案 A：控制台粘贴部署（最简单）

1. 打开 https://dash.cloudflare.com → 左侧 **Workers & Pages**
2. 点 **Create application** → **Create Worker** → 起名 `customs-data-proxy` → **Deploy**
3. 部署后页面顶部点 **Edit code**
4. 把整个 [worker.js](./worker.js) 的内容粘贴覆盖默认的 hello world
5. 点 **Deploy** 保存
6. 复制顶部 URL（形如 `https://customs-data-proxy.your-name.workers.dev`）
7. 回到前端 → **设置** → 把 URL 粘到「API 代理 (可选)」

## 方案 B：Wrangler CLI

```bash
cd worker/
npx wrangler login    # 第一次需要授权
npx wrangler deploy
```

部署完终端会打印 Worker URL。

## 验证

访问 `https://customs-data-proxy.<你的子域>.workers.dev/healthz` 应返回：

```json
{ "ok": true, "upstream": "https://cd.210k.cc", "allowed_origins": [...] }
```

## 安全说明

- Worker 只允许 [`worker.js`](./worker.js) 顶部 `ALLOWED_ORIGINS` 列表里的来源（GitHub Pages + localhost）调用
- Worker **不存** Token —— 它只是把前端发来的 `Authorization: Bearer xxx` 透传给 cd.210k.cc
- 如果你把站点部署到其他域名，记得更新 `ALLOWED_ORIGINS` 重新部署 Worker
