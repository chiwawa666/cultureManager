// API 使用示例
import { login, getProfile, getBalance, getInfo, getList, uploadImage } from './index.js';

// 基础使用示例
export const examples = {
  // 用户登录
  login: async () => {
    try {
      const result = await login("test@example.com", "123456");
      console.log("登录成功:", result);
      return result;
    } catch (error) {
      console.error("登录失败:", error);
    }
  },

  // 获取用户信息
  getProfile: async () => {
    try {
      const profile = await getProfile();
      console.log("用户信息:", profile);
      return profile;
    } catch (error) {
      console.error("获取用户信息失败:", error);
    }
  },

  // 获取积分余额
  getBalance: async () => {
    try {
      const balance = await getBalance();
      console.log("积分余额:", balance);
      return balance;
    } catch (error) {
      console.error("获取积分余额失败:", error);
    }
  },

  // 获取等级信息
  getLevelInfo: async () => {
    try {
      const info = await getInfo();
      console.log("等级信息:", info);
      return info;
    } catch (error) {
      console.error("获取等级信息失败:", error);
    }
  },

  // 获取排行榜
  getRanking: async () => {
    try {
      const ranking = await getList({ page: 1, size: 20 });
      console.log("排行榜:", ranking);
      return ranking;
    } catch (error) {
      console.error("获取排行榜失败:", error);
    }
  },

  // 上传文件
  uploadFile: async (file) => {
    try {
      const result = await uploadImage(file);
      console.log("文件上传成功:", result);
      return result;
    } catch (error) {
      console.error("文件上传失败:", error);
    }
  },
};

// Vue组件中使用示例
export const useAPI = () => {
  const loading = ref(false);
  const data = ref(null);

  const fetchData = async () => {
    loading.value = true;
    try {
      data.value = await getProfile();
    } catch (error) {
      console.error("获取数据失败:", error);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    data,
    fetchData,
  };
};

export default examples;
