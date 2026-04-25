import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 部署到 GitHub Pages 时，base 自动取仓库名（由 GitHub Actions 注入 BASE_PATH）
// 部署到 Vercel / Netlify / 自有域名时，base 用 '/' 即可
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || '/',
});
