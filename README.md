# Vue 3 + Vite 企业微信 H5 移动端模板

本项目基于 Vite + Vue3，适用于企业微信等移动端 H5 应用开发，已集成 vue-router、Vant 移动端 UI 库。

## 目录结构说明

```
├── public/           # 公共静态资源目录，构建时原样复制到dist
│   └── vite.svg      # 示例静态图片
├── src/              # 源码目录
│   ├── assets/       # 静态资源（如图片、字体等）
│   │   └── vue.svg   # Vue logo示例
│   ├── components/   # 复用型组件（如按钮、弹窗等）
│   │   └── HelloWorld.vue # 示例组件
│   ├── views/        # 页面组件（每个页面一个文件）
│   │   ├── Home.vue      # 首页组件
│   │   ├── About.vue     # 关于页面组件
│   │   └── Contact.vue   # 联系页面组件
│   ├── App.vue        # 应用主组件，包含底部Tabbar和路由出口
│   ├── main.js        # 应用入口文件，初始化Vue、Vant、路由
│   ├── router.js      # 路由配置文件，定义页面路由
│   └── style.css      # 全局样式文件
├── index.html         # 入口HTML文件
├── package.json       # 项目依赖和脚本配置
├── vite.config.js     # Vite配置文件
└── README.md          # 项目说明文档
```

## 主要依赖

- vue 3.x
- vue-router 4.x
- vant 4.x
- vite 4.x/7.x

---
