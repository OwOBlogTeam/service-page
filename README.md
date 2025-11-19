# OwO Studio Website

> 基于 Vue 3 + Vite 构建的现代化企业官网，专业的数字化解决方案展示平台

## 项目简介

这是一个为 OwO 数字工作室重构的官方网站，从原有的单一组件架构重新设计为模块化、可维护的现代 Web 应用。项目采用最新的前端技术栈，提供响应式设计和优秀的用户体验。

## 技术栈

- **框架**: Vue 3 (Composition API)
- **构建工具**: Vite
- **开发语言**: JavaScript + HTML5 + CSS3
- **CSS 特性**: CSS Variables、Grid、Flexbox、动画
- **设计模式**: 组件化、模块化、响应式设计

## 项目特色

- 🎨 现代化的视觉设计和交互体验
- 📱 完全响应式，支持各种设备尺寸
- ⚡ 基于 Vite 的快速开发和构建
- 🧩 高度模块化的组件架构
- 🔄 Vue 3 Composition API 最佳实践
- 🎭 流畅的页面动画和过渡效果
- 📊 数据驱动的内容管理
- 🛠️ 易于维护和扩展的代码结构

## 项目结构

```txt
owo-studio-website/
├── public/                 # 静态资源文件
├── src/
│   ├── components/         # Vue 组件
│   │   ├── layout/        # 布局组件
│   │   │   ├── Navbar.vue    # 导航栏
│   │   │   └── Footer.vue    # 页脚
│   │   ├── sections/      # 页面区块组件
│   │   │   ├── Hero.vue      # 首页横幅
│   │   │   ├── About.vue     # 关于我们
│   │   │   ├── Services.vue  # 服务项目
│   │   │   ├── Portfolio.vue # 作品展示
│   │   │   └── Contact.vue   # 联系我们
│   │   └── common/        # 通用组件
│   │       └── Modal.vue     # 模态框
│   ├── composables/       # 组合式函数
│   │   ├── useScroll.js     # 滚动相关功能
│   │   └── useAnimation.js  # 动画相关功能
│   ├── data/             # 数据文件
│   │   └── siteData.js      # 网站数据配置
│   ├── styles/           # 样式文件
│   │   ├── variables.css    # CSS 变量定义
│   │   └── global.css       # 全局样式
│   ├── App.vue           # 根组件
│   └── main.js           # 应用入口
├── index.html            # HTML 模板
├── package.json          # 项目配置
├── vite.config.js        # Vite 配置
└── README.md            # 项目说明
```

## 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装步骤

1. **克隆项目**

   ```bash
   git clone https://github.com/OwOBlogTeam/StaticServic.git
   cd StaticServic
   ```

   **项目不在根目录时Nginx需按如下要求配置**

   ```nginx
   location ~ /service {
   try_files $uri $uri/ /service/index.html;
   }
   ```

2. **安装依赖**

   ```bash
   npm install
   ```

3. **启动开发服务器**

   ```bash
   npm run dev
   ```

   访问 `http://localhost:5173` 查看网站

4. **构建生产版本**

   ```bash
   npm run build
   ```

5. **预览构建结果**

   ```bash
   npm run preview
   ```

## 功能模块

### 🏠 首页 (Hero Section)

- 动态打字机效果
- 浮动动画元素
- 技术特色卡片展示
- 响应式设计

### ℹ️ 关于我们 (About Section)

- 公司优势展示
- 统计数据动画
- 滚动触发动画效果

### 🛠️ 服务项目 (Services Section)

- 服务卡片网格布局
- 模态框详情展示
- 服务特色列表

### 💼 作品展示 (Portfolio Section)

- 作品分类筛选
- 悬停效果和图片展示
- 作品详情弹窗

### 📞 联系我们 (Contact Section)

- 联系信息展示
- 交互式联系表单
- 表单验证和提交

### 🧭 导航和布局

- 固定顶部导航
- 平滑滚动效果
- 移动端响应式菜单
- 专业页脚设计

## 样式系统

### CSS 变量系统

项目使用 CSS 自定义属性实现主题化设计：

```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --primary-color: #667eea;
  --text-primary: #333333;
  --section-padding: 100px 0;
  /* ... 更多变量 */
}
```

### 响应式断点

- 桌面端: > 768px
- 移动端: ≤ 768px

## 组合式函数

### useScroll.js

- 滚动状态监听
- 平滑滚动导航
- 导航栏样式切换

### useAnimation.js

- 打字机效果
- 统计数据动画
- 交集观察器动画

## 数据配置

所有网站内容通过 `src/data/siteData.js` 集中管理：

- 网站基本信息
- 服务项目数据
- 作品展示内容
- 联系信息配置

## 部署指南

### 静态托管平台

#### Vercel 部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel --prod
```

#### Netlify 部署

1. 构建项目：`npm run build`
2. 将 `dist` 文件夹拖拽到 Netlify
3. 或连接 Git 仓库自动部署

#### GitHub Pages

```bash
# 安装 gh-pages
npm install --save-dev gh-pages

# 添加部署脚本到 package.json
"scripts": {
  "deploy": "gh-pages -d dist"
}

# 构建并部署
npm run build
npm run deploy
```

### 传统服务器部署

1. 构建项目：

   ```bash
   npm run build
   ```

2. 上传 `dist` 目录到服务器：

   ```bash
   scp -r dist/* user@server:/var/www/html/
   ```

3. Nginx 配置示例：

   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       root /var/www/html;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       # 静态资源缓存
       location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
   }
   ```

## 开发规范

### 组件开发

- 使用 Vue 3 Composition API
- 单文件组件 (.vue) 格式
- Props 验证和默认值
- 事件命名采用 kebab-case

### 样式规范

- 使用 CSS Variables 维护主题一致性
- 移动优先的响应式设计
- BEM 命名规范
- 避免深层嵌套选择器

### 代码组织

- 按功能模块组织文件结构
- 提取可复用的组合式函数
- 数据与视图分离
- 保持组件的单一职责

## 性能优化

- **代码分割**: Vite 自动进行代码分割
- **资源优化**: 图片懒加载和压缩
- **CSS 优化**: 关键 CSS 内联
- **缓存策略**: 合理设置静态资源缓存

## 浏览器支持

- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88

## 自定义配置

### 修改网站内容

编辑 `src/data/siteData.js` 文件更新：

- 公司信息
- 服务项目
- 作品展示
- 联系方式

### 调整主题样式

修改 `src/styles/variables.css` 中的 CSS 变量：

- 主题色彩
- 字体大小
- 间距规范
- 动画时长

### 添加新功能

1. 在相应目录创建新组件
2. 更新路由配置（如需要）
3. 添加对应的样式和逻辑

## 常见问题

**Q: 如何修改网站标题和描述？**
A: 编辑 `index.html` 文件中的 `<title>` 和 `<meta>` 标签。

**Q: 如何添加新的服务项目？**
A: 在 `src/data/siteData.js` 的 `services` 数组中添加新对象。

**Q: 如何自定义主题色彩？**
A: 修改 `src/styles/variables.css` 中的 `--primary-color` 等变量。

**Q: 移动端菜单无法正常工作？**
A: 检查 JavaScript 是否正确加载，确认没有控制台错误。

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 联系方式

- **邮箱**: [support@owoblog.com](mailto:support@owoblog.com)
- **网站**: [owoblog.com](https://owoblog.com)
- **项目地址**: [GitHub Repository](https://github.com/Tommy131/StaticServic)

---

**OwO Studio** - 用技术驱动创新，为客户创造价值 ✨
