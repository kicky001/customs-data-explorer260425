# 海关数据查询系统

基于 [cd.210k.cc](https://cd.210k.cc/doc) 海关数据 API 的查询界面。绿白配色，三栏布局，支持 287 个数据源、聚合搜索、AI 客户分析。

![海关数据](https://img.shields.io/badge/数据源-287-16a34a?style=flat-square) ![React](https://img.shields.io/badge/React-18-22c55e?style=flat-square) ![Vite](https://img.shields.io/badge/Vite-5-15803d?style=flat-square)

## ✨ 功能

- 🌍 **287 个数据源**：美国 / 墨西哥 / 欧盟 / 俄罗斯 / 中南美 / 非洲 / 东南亚等
- 🔥 **聚合搜索**：每个国家组顶部「全部」按钮，并行查询同一国家所有数据源后合并去重
- 🔎 **6 个搜索字段** + 8 个辅助过滤字段（4 种匹配模式）
- ⚡ **缓存命中提示** + 实时排队/处理状态 + 任务自动轮询
- 📊 **分组合并** + **列设置** + 行内详情展开
- 🤖 **AI 助手面板**：基于查询结果的客户决策人挖掘建议
- 🎯 **演示模式**：无 Token 即可体验完整 UI

## 🚀 部署到 GitHub Pages（推荐）

让任何人、任何网络都能通过 URL 访问。**全程自动化，约 5 分钟搞定。**

### 第 1 步：在 GitHub 创建仓库

1. 登录 [github.com](https://github.com)，点右上角 **+** → **New repository**
2. 仓库名建议填：`customs-data-explorer`（也可以自定义）
3. 设置为 **Public**（公开仓库才能免费用 Pages）
4. **不要**勾选 README、.gitignore、license（我们已经有了）
5. 点 **Create repository**

### 第 2 步：把代码推上去

打开终端，进入项目目录后执行：

```bash
# 在本项目目录下
git init
git add .
git commit -m "初始化海关数据查询系统"
git branch -M main

# 替换成你自己的仓库地址
git remote add origin https://github.com/<你的用户名>/<你的仓库名>.git
git push -u origin main
```

> 💡 不会用 git？可以直接在 GitHub 仓库页点 **Add file → Upload files**，把整个项目文件夹拖进去也行。

### 第 3 步：开启 GitHub Pages

1. 打开你的仓库页面 → **Settings** → 左侧菜单找 **Pages**
2. **Source** 选择 **GitHub Actions**（不是 Deploy from a branch）
3. 保存

### 第 4 步：等待部署完成

- 推送代码后，GitHub Actions 会自动构建。打开仓库页 → **Actions** 标签可以看进度
- 大约 1-2 分钟后会显示绿色 ✓
- 然后访问：`https://<你的用户名>.github.io/<你的仓库名>/` 即可打开

🎉 **完成！** 现在任何电脑、任何网络打开这个 URL 都能用。

---

## 🌐 部署到 Vercel（更简单的方案）

不想用 GitHub Actions？直接走 Vercel：

1. 把代码推到 GitHub（同上面第 1-2 步）
2. 登录 [vercel.com](https://vercel.com)，用 GitHub 账号登录
3. 点 **Add New → Project** → 选你的仓库 → 直接点 **Deploy**
4. 30 秒后你会拿到一个类似 `https://customs-data-explorer-xxx.vercel.app/` 的网址

> ⚠️ 用 Vercel 时，把 `vite.config.js` 里 `base` 默认值确认是 `/`（已经是了，无需修改）

---

## 💻 本地开发

如果你想先在本地跑一下看看：

```bash
# 需要 Node.js 18+
npm install
npm run dev
# 浏览器打开 http://localhost:5173
```

打包：
```bash
npm run build         # 输出到 dist/
npm run preview       # 本地预览打包结果
```

---

## ⚠️ 关于 CORS（跨域问题）

`cd.210k.cc` 的 API 是否允许浏览器直连，取决于服务方是否设置了 CORS 头。

- **演示模式**：永远可用，不调用任何 API
- **真实查询**：浏览器会发请求到 `cd.210k.cc/api/query`。如果浏览器控制台报 `CORS` 错误，说明 API 服务方没开放跨域，需要其中一种方案：
  1. **联系服务方** 开启 CORS（最简单，推荐）
  2. **加一层代理**（如 Cloudflare Workers / Vercel Functions）转发请求
  3. **用浏览器插件** 临时禁用 CORS（仅自己用）

如需 Cloudflare Workers 代理示例代码，新建一个 issue 找我即可。

---

## 📁 项目结构

```
customs-data-explorer/
├── .github/workflows/deploy.yml     # 自动部署配置
├── public/favicon.svg               # 网站图标
├── src/
│   ├── App.jsx                      # 主应用组件
│   ├── main.jsx                     # 入口文件
│   └── index.css                    # 全局样式
├── index.html                       # HTML 模板
├── vite.config.js                   # Vite 配置（含 base 路径）
├── tailwind.config.js               # Tailwind 配置
├── postcss.config.js                # PostCSS 配置
├── package.json                     # 依赖列表
└── README.md                        # 本文件
```

## 🔧 技术栈

- **React 18** + **Vite 5**
- **Tailwind CSS 3**（样式）
- **Lucide React**（图标）
- **GitHub Actions**（CI/CD）

## 📝 自定义

- 修改主题色：搜索 `#16a34a` 全局替换
- 修改默认数据源：改 `App.jsx` 里 `useState('995')`
- 修改默认关键词：改 `App.jsx` 里 `useState('PAMASI S.A.S.')`
- 增减数据源：编辑 `App.jsx` 顶部的 `DATA_SOURCES` 数组

## 📜 反馈

Bug 报告 / 功能建议：直接在仓库提 Issue。

API 相关问题反馈到：[customs-data-issues](https://github.com/frankie0736/customs-data-issues)

---

Made with 🌿 for international trade intelligence.
