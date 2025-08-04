# 企业微信 H5 移动端项目 - 前端实现说明文档

## 一、项目简介

本项目为企业微信场景下的 H5 移动端应用，基于 Vue 3 + Vite 技术栈，集成了 Vant 移动端 UI 库，适用于企业微信内嵌浏览器访问。项目采用模块化、组件化开发，支持多页面、底部 Tabbar 导航，便于后续扩展和维护。

---

## 二、技术架构

- **主框架**：Vue 3
- **构建工具**：Vite
- **UI 框架**：Vant
- **路由管理**：Vue Router
- **状态管理**：可按需集成 Pinia
- **请求处理**：可按需集成 Axios
- **样式**：Vant 内置+自定义 CSS

---

## 三、目录结构说明

```
├── public/           # 公共静态资源目录，构建时原样复制到dist
│   └── vite.svg      # 示例静态图片
├── src/              # 源码目录
│   ├── assets/       # 静态资源（如图片、字体等）
│   │   └── vue.svg   # Vue logo示例
│   ├── components/   # 可复用组件（如自定义按钮、弹窗等）
│   │   └── HelloWorld.vue # 示例组件
│   ├── views/        # 页面组件（每个页面一个文件）
│   │   ├── Home.vue      # 首页
│   │   ├── Points.vue    # 积分页面
│   │   └── Ranking.vue   # 排行榜页面
│   ├── router/       # 路由相关文件夹
│   │   └── index.js      # 路由配置文件，定义页面路由
│   ├── App.vue        # 应用主组件，包含底部Tabbar和路由出口
│   ├── main.js        # 应用入口文件，初始化Vue、Vant、路由
│   └── style.css      # 全局样式文件
├── index.html         # 入口HTML文件
├── package.json       # 项目依赖和脚本配置
├── vite.config.js     # Vite配置文件
└── README.md          # 项目说明文档
```

---

## 四、主要功能模块与细节

### 1. 多页面与底部导航

- 使用 vue-router 实现多页面（如首页、关于、联系）。
- 通过 Vant 的 Tabbar 组件实现底部导航，支持路由联动和高亮。

### 2. 移动端 UI 适配

- 全面采用 Vant 组件库，保证移动端体验和企业微信兼容性。
- 响应式布局，适配不同屏幕尺寸。

### 3. 页面开发规范

- 页面组件统一放在 `src/views/` 目录。
- 可复用组件放在 `src/components/` 目录。
- 路由统一在 `src/router.js` 配置，支持按需扩展。

### 4. 适配企业微信

- 可按需集成企业微信 JS-SDK，实现扫码、分享、获取用户信息等功能。
- 支持在企业微信内嵌浏览器无缝访问。

### 5. 请求处理（Axios 集成）

- 已在 `src/utils/request.js` 封装统一的 Axios 实例：
  - 支持基础 baseURL、超时配置
  - 请求自动携带 token（从 localStorage 获取）
  - 响应统一处理后端格式 `{ code, data, msg }`
  - 错误自动 toast 提示（可与 Vant Toast 结合）
- 推荐所有 API 请求均通过 `request` 实例发起，如：
  ```js
  import request from "@/utils/request";
  // GET 示例
  request.get("/user/info").then((res) => {
    /* ... */
  });
  // POST 示例
  request.post("/user/login", { username, password });
  ```
- 可根据实际需求扩展拦截器、mock、全局 loading 等功能。

---

## 五、开发与扩展建议

- 新增页面：在 `src/views/` 下新建页面组件，并在 `router.js` 注册路由。
- 新增 Tabbar 菜单：在 `App.vue` 的 `<van-tabbar>` 中添加菜单项，并配置对应路由。
- 复用组件开发：在 `src/components/` 下开发通用组件，按需引入页面。
- 状态管理、请求处理、权限校验等可按需集成 Pinia、Axios、路由守卫等方案。

---

## 六、运行与部署

- 本地开发：`npm run dev`
- 构建打包：`npm run build`
- 生产部署：将 `dist/` 目录内容上传至服务器，配置企业微信可信域名即可。

---

## 七、浏览器与兼容性

- 推荐使用企业微信内置浏览器、微信浏览器、Chrome、Safari、Edge 等主流浏览器访问。
- Vant 组件库已适配主流移动端浏览器。

---

## 八、交互与易用性

- 所有按钮、表单均有清晰的交互反馈（hover、禁用、loading 等）。
- 支持移动端手势与触控操作。
- 页面切换流畅，底部导航高亮同步。

---

## 九、后续可扩展方向

- 接入企业微信 JS-SDK，实现更多企业微信能力。
- 集成状态管理（Pinia）、接口请求（Axios）、Mock 数据等。
- 增加更多业务页面和功能模块。
- 优化移动端适配和性能。

---

如需进一步细化页面结构、组件开发、接口对接等内容，可随时补充说明！
