#!/usr/bin/env bash
# 一键部署脚本：把当前项目推送到 GitHub 仓库
# 用法：bash deploy.sh https://github.com/你的用户名/你的仓库名.git

set -e

REPO_URL="$1"

# 颜色
G='\033[0;32m'  # green
B='\033[0;34m'  # blue
Y='\033[1;33m'  # yellow
R='\033[0;31m'  # red
N='\033[0m'     # reset

echo -e "${G}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${N}"
echo -e "${G} 海关数据查询系统 · 一键部署 ${N}"
echo -e "${G}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${N}"
echo

# 检查 git
if ! command -v git &> /dev/null; then
  echo -e "${R}✗ 没找到 git 命令${N}"
  echo "  请先安装 git: https://git-scm.com/downloads"
  exit 1
fi

# 检查仓库 URL
if [ -z "$REPO_URL" ]; then
  echo -e "${Y}请提供你的 GitHub 仓库地址${N}"
  echo
  echo "用法："
  echo "  bash deploy.sh https://github.com/你的用户名/你的仓库名.git"
  echo
  echo -e "${B}还没有仓库？1 分钟创建一个：${N}"
  echo "  1. 打开 https://github.com/new"
  echo "  2. 仓库名填: customs-data-explorer"
  echo "  3. 设为 Public（公开）"
  echo "  4. 不要勾选 README、.gitignore、license"
  echo "  5. 点 Create repository"
  echo "  6. 复制页面顶部的 git 地址，再次运行本脚本"
  echo
  exit 1
fi

# 验证 URL 格式
if [[ ! "$REPO_URL" =~ ^https://github\.com/[^/]+/[^/]+(\.git)?$ ]] && [[ ! "$REPO_URL" =~ ^git@github\.com: ]]; then
  echo -e "${R}✗ URL 格式不对，应该长这样：${N}"
  echo "  https://github.com/用户名/仓库名.git"
  exit 1
fi

# 提取仓库名（用于显示最终 URL）
REPO_NAME=$(basename "$REPO_URL" .git)
USER_NAME=$(echo "$REPO_URL" | sed -E 's|.*github\.com[:/]([^/]+)/.*|\1|')

echo -e "${B}→ 准备推送到：${N} $REPO_URL"
echo -e "${B}→ 部署后访问：${N} https://${USER_NAME}.github.io/${REPO_NAME}/"
echo

# 已经初始化过 git 的情况
if [ -d ".git" ]; then
  echo -e "${Y}⚠ 检测到 .git 目录已存在，将复用现有仓库${N}"
else
  echo -e "${B}1/5${N} 初始化 git..."
  git init -q
fi

# 配置 user.name / user.email（如果没有全局配置）
if ! git config user.email > /dev/null 2>&1; then
  echo -e "${Y}  设置临时提交身份（你可以稍后改）${N}"
  git config user.email "deploy@local"
  git config user.name "Deploy"
fi

echo -e "${B}2/5${N} 添加文件..."
git add .

echo -e "${B}3/5${N} 创建提交..."
if git diff --cached --quiet; then
  echo -e "${Y}  没有新内容需要提交${N}"
else
  git commit -q -m "🚀 部署海关数据查询系统"
fi

echo -e "${B}4/5${N} 切换主分支..."
git branch -M main

echo -e "${B}5/5${N} 推送到 GitHub..."
# 移除已有 origin（如果有）
git remote remove origin 2>/dev/null || true
git remote add origin "$REPO_URL"

if git push -u origin main; then
  echo
  echo -e "${G}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${N}"
  echo -e "${G}✓ 推送成功！${N}"
  echo -e "${G}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${N}"
  echo
  echo -e "${Y}最后一步：开启 GitHub Pages（30 秒）${N}"
  echo
  echo "  1. 打开仓库设置页:"
  echo -e "     ${B}https://github.com/${USER_NAME}/${REPO_NAME}/settings/pages${N}"
  echo
  echo "  2. 在 'Source' 下拉菜单选择 'GitHub Actions'"
  echo
  echo "  3. 等 1-2 分钟，等 GitHub Actions 跑完"
  echo -e "     ${B}https://github.com/${USER_NAME}/${REPO_NAME}/actions${N}"
  echo
  echo -e "${G}部署完成后访问：${N}"
  echo -e "  ${B}https://${USER_NAME}.github.io/${REPO_NAME}/${N}"
  echo
else
  echo
  echo -e "${R}✗ 推送失败${N}"
  echo
  echo "可能的原因："
  echo "  • 仓库地址拼错了"
  echo "  • 第一次用 git，需要登录 GitHub"
  echo "    macOS:    brew install gh && gh auth login"
  echo "    Windows:  推送时会弹出 GitHub 登录窗口"
  echo "    Linux:    https://cli.github.com/"
  echo "  • 仓库已有内容，需要先 git pull"
  exit 1
fi
