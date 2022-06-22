# OwOStaticService

OwOBlog的靜態服務頁面


## 项目不在根目录时Nginx需按如下要求配置

```
location ~ /service {
  try_files $uri $uri/ /service/index.html;
}
```	

## 使用方法

先進入項目根目錄:
`cd service`

### 安装 & 启动项目

1. `npm install`
2. `npm run dev`


### 打包项目

`npm run build` 或 `build` (僅限Windows)