import axios from "axios";

const request = axios.create({
  baseURL: "/api", // 可根据实际情况调整
  timeout: 10000,
});

// 请求拦截器：自动携带token
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器：统一处理错误
request.interceptors.response.use(
  (response) => {
    // 约定后端返回格式 { code, data, msg }
    if (response.data && response.data.code !== 0) {
      window.$toast && window.$toast(response.data.msg || "请求出错");
      return Promise.reject(response.data);
    }
    return response.data;
  },
  (error) => {
    window.$toast && window.$toast(error.message || "网络错误");
    return Promise.reject(error);
  }
);

export default request;
