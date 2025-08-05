# Axios 封装使用说明

## 概述

本项目对 axios 进行了全面封装，提供了以下功能：

- ✅ 请求/响应拦截器
- ✅ 自动携带 token
- ✅ 统一错误处理
- ✅ 请求重试机制
- ✅ 请求取消功能
- ✅ Loading 状态管理
- ✅ 文件上传/下载
- ✅ API 服务层封装

## 文件结构

```
src/utils/
├── request.js      # axios 核心封装
├── api.js          # API 服务层
├── api-example.js  # 使用示例
└── README.md       # 使用说明
```

## 核心功能

### 1. 基础配置

```javascript
import { http } from "@/utils/request.js";

// 基础请求
const data = await http.get("/api/users", { page: 1 });
const result = await http.post("/api/users", userData);
```

### 2. 请求重试

```javascript
// 自动重试（网络错误或5xx错误时）
const data = await http.getWithRetry("/api/important-data");
const result = await http.postWithRetry("/api/important-data", data);
```

### 3. 文件操作

```javascript
// 文件上传
const result = await http.upload("/api/upload", file, {
  onUploadProgress: (progress) => {
    console.log(`上传进度: ${progress}%`);
  },
});

// 文件下载
await http.download("/api/download", { fileId: 123 }, "report.pdf");
```

### 4. 请求控制

```javascript
import { cancelAllRequests } from "@/utils/request.js";

// 取消所有请求
cancelAllRequests();

// 不显示loading的请求
const data = await http.get("/api/data", null, { showLoading: false });
```

## API 服务层

### 导入方式

```javascript
// 方式1：导入所有API
import api from "@/utils/api.js";

// 方式2：按需导入
import { userAPI, pointsAPI, levelAPI } from "@/utils/api.js";
```

### 使用示例

```javascript
// 用户相关
const profile = await userAPI.getProfile();
const loginResult = await userAPI.login({ username, password });

// 积分相关
const balance = await pointsAPI.getBalance();
const history = await pointsAPI.getHistory({ page: 1, size: 20 });

// 等级系统
const levelInfo = await levelAPI.getInfo();
const progress = await levelAPI.getProgress();

// 排行榜
const rankingList = await rankingAPI.getList({ type: "points" });
const myRank = await rankingAPI.getMyRank();

// 文件上传
const imageResult = await uploadAPI.uploadImage(file, onProgress);
```

## 错误处理

### 自动错误处理

封装会自动处理以下错误：

- **401**: 自动清除 token 并跳转登录页
- **403**: 显示"权限不足"提示
- **404**: 显示"资源不存在"提示
- **500**: 显示"服务器内部错误"提示
- **网络错误**: 显示"网络连接失败"提示

### 自定义错误处理

```javascript
try {
  const data = await userAPI.getProfile();
} catch (error) {
  if (error.code === 404) {
    // 自定义处理
    console.log("用户不存在");
  } else {
    // 其他错误已在拦截器中处理
    console.log("其他错误:", error.message);
  }
}
```

## 环境配置

### 环境变量

创建 `.env` 文件配置 API 基础地址：

```env
# 开发环境
VITE_API_BASE_URL=http://localhost:3000/api

# 生产环境
VITE_API_BASE_URL=https://api.example.com/api
```

### Token 管理

```javascript
// 设置 token
localStorage.setItem("token", "your-token-here");

// 清除 token
localStorage.removeItem("token");
```

## Vue 组件中使用

### Composition API

```vue
<template>
  <div>
    <div v-if="loading">加载中...</div>
    <div v-else-if="error">错误: {{ error.message }}</div>
    <div v-else>{{ userData }}</div>
    <button @click="fetchData">刷新</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { userAPI } from "@/utils/api.js";

const loading = ref(false);
const userData = ref(null);
const error = ref(null);

const fetchData = async () => {
  loading.value = true;
  error.value = null;

  try {
    userData.value = await userAPI.getProfile();
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
};

// 初始加载
fetchData();
</script>
```

### Options API

```vue
<template>
  <div>
    <van-button @click="handleLogin" :loading="loading"> 登录 </van-button>
  </div>
</template>

<script>
import { userAPI } from "@/utils/api.js";

export default {
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      try {
        const result = await userAPI.login({
          username: "test@example.com",
          password: "123456",
        });
        this.$toast.success("登录成功");
        this.$router.push("/home");
      } catch (error) {
        // 错误已在拦截器中处理
        console.log("登录失败");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
```

## 高级功能

### 并发请求

```javascript
const [userInfo, pointsBalance, levelInfo] = await Promise.all([
  userAPI.getProfile(),
  pointsAPI.getBalance(),
  levelAPI.getInfo(),
]);
```

### 请求拦截器自定义

```javascript
// 在 request.js 中修改拦截器
request.interceptors.request.use(
  (config) => {
    // 添加自定义逻辑
    config.headers["X-Custom-Header"] = "custom-value";
    return config;
  },
  (error) => Promise.reject(error)
);
```

### 响应拦截器自定义

```javascript
request.interceptors.response.use(
  (response) => {
    // 自定义响应处理
    if (response.data.code === 200) {
      return response.data.data;
    }
    return Promise.reject(response.data);
  },
  (error) => {
    // 自定义错误处理
    return Promise.reject(error);
  }
);
```

## 注意事项

1. **Token 格式**: 默认使用 `Bearer` 格式，如需修改请在 `request.js` 中调整
2. **错误提示**: 需要集成 toast 组件，默认使用 `window.$toast`
3. **Loading 状态**: 需要集成 loading 组件，默认使用 console.log
4. **环境变量**: 确保在 `.env` 文件中正确配置 `VITE_API_BASE_URL`
5. **请求取消**: 在组件销毁时调用 `cancelAllRequests()` 避免内存泄漏

## 扩展功能

如需添加新功能，可以：

1. 在 `request.js` 中添加新的拦截器逻辑
2. 在 `api.js` 中添加新的 API 方法
3. 在 `http` 对象中添加新的工具方法

## 常见问题

### Q: 如何修改请求超时时间？

A: 在 `request.js` 中修改 `timeout` 配置

### Q: 如何添加请求头？

A: 在请求拦截器中添加，或在请求时传入 `headers` 配置

### Q: 如何处理不同的响应格式？

A: 在响应拦截器中根据后端返回格式调整处理逻辑

### Q: 如何禁用自动错误提示？

A: 在请求配置中添加 `showError: false`
