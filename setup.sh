#!/bin/bash

echo "🚀 开始创建 OwO Studio 项目结构..."

# 创建项目根目录
PROJECT_NAME="owo-studio-website"
mkdir -p $PROJECT_NAME
cd $PROJECT_NAME

# 创建目录结构
echo "📁 创建目录结构..."
mkdir -p src/{components/{layout,sections,common},composables,data,styles}
mkdir -p public

# 创建组件文件
echo "📝 创建组件文件..."

# Layout 组件
touch src/components/layout/Navbar.vue
touch src/components/layout/Footer.vue

# Sections 组件
touch src/components/sections/Hero.vue
touch src/components/sections/About.vue
touch src/components/sections/Services.vue
touch src/components/sections/Portfolio.vue
touch src/components/sections/Contact.vue

# Common 组件
touch src/components/common/Modal.vue

# Composables
touch src/composables/useScroll.js
touch src/composables/useAnimation.js

# 数据文件
touch src/data/siteData.js

# 样式文件
touch src/styles/variables.css
touch src/styles/global.css

# 主要文件
touch src/App.vue
touch src/main.js

# 配置文件
touch index.html
touch package.json
touch vite.config.js
touch .gitignore
touch README.md

echo "✅ 项目结构创建完成！"
echo "📂 项目位置: $(pwd)"
echo ""
echo "下一步："
echo "1. 将提供的代码复制到对应文件中"
echo "2. 运行 'npm install' 安装依赖"
echo "3. 运行 'npm run dev' 启动开发服务器"

