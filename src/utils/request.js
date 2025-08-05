import axios from "axios";

// 创建axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 自动携带token
    const token = localStorage.getItem("token");
    if (token && config.headers.isToken !== false) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 显示loading
    if (config.showLoading !== false) {
      console.log("显示loading");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 隐藏loading
    if (response.config.showLoading !== false) {
      console.log("隐藏loading");
    }

    const { data } = response;

    // 约定后端返回格式 { code, data, msg }
    if (data.code === 0 || data.code === 200) {
      return data.data;
    } else {
      // 业务错误处理
      showToast(data.msg || "请求失败");
      return Promise.reject(data);
    }
  },
  (error) => {
    // 隐藏loading
    if (error.config?.showLoading !== false) {
      console.log("隐藏loading");
    }

    // 处理错误
    if (error.response) {
      const { status } = error.response;

      switch (status) {
        case 401:
          localStorage.removeItem("token");
          window.location.href = "/login";
          break;
        case 403:
          showToast("权限不足");
          break;
        case 404:
          showToast("请求的资源不存在");
          break;
        case 500:
          showToast("服务器内部错误");
          break;
        default:
          showToast("请求失败");
      }
    } else if (error.request) {
      showToast("网络连接失败，请检查网络");
    } else {
      showToast("请求配置错误");
    }

    return Promise.reject(error);
  }
);

// 显示提示信息
const showToast = (message) => {
  console.log("Toast:", message);
  if (window.$toast) {
    window.$toast(message);
  }
};

// 导出默认实例
export default request;
