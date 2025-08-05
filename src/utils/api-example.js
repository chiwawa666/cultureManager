// API使用示例
import { http, cancelAllRequests } from "./request.js";
import api, {
  userAPI,
  pointsAPI,
  levelAPI,
  rankingAPI,
  uploadAPI,
} from "./api.js";

// ==================== 基础请求示例 ====================

// 1. 基本GET请求
const getData = async () => {
  try {
    const data = await http.get("/api/data", { page: 1, size: 10 });
    console.log("获取数据成功:", data);
  } catch (error) {
    console.error("获取数据失败:", error);
  }
};

// 2. 基本POST请求
const createData = async (formData) => {
  try {
    const result = await http.post("/api/data", formData);
    console.log("创建数据成功:", result);
  } catch (error) {
    console.error("创建数据失败:", error);
  }
};

// 3. 带重试的请求
const getDataWithRetry = async () => {
  try {
    const data = await http.getWithRetry("/api/important-data");
    console.log("重要数据获取成功:", data);
  } catch (error) {
    console.error("重要数据获取失败:", error);
  }
};

// 4. 不显示loading的请求
const getSilentData = async () => {
  try {
    const data = await http.get("/api/background-data", null, {
      showLoading: false,
    });
    console.log("后台数据获取成功:", data);
  } catch (error) {
    console.error("后台数据获取失败:", error);
  }
};

// ==================== 文件操作示例 ====================

// 5. 文件上传
const uploadFile = async (file) => {
  try {
    const result = await http.upload("/api/upload", file, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(`上传进度: ${percentCompleted}%`);
      },
    });
    console.log("文件上传成功:", result);
  } catch (error) {
    console.error("文件上传失败:", error);
  }
};

// 6. 文件下载
const downloadFile = async () => {
  try {
    await http.download("/api/download", { fileId: 123 }, "report.pdf");
    console.log("文件下载成功");
  } catch (error) {
    console.error("文件下载失败:", error);
  }
};

// ==================== API服务层使用示例 ====================

// 7. 用户相关API
const userOperations = async () => {
  try {
    // 登录
    const loginResult = await userAPI.login({
      username: "test@example.com",
      password: "123456",
    });
    console.log("登录成功:", loginResult);

    // 获取用户信息
    const profile = await userAPI.getProfile();
    console.log("用户信息:", profile);

    // 更新用户信息
    const updateResult = await userAPI.updateProfile({
      nickname: "新昵称",
      avatar: "new-avatar.jpg",
    });
    console.log("更新成功:", updateResult);
  } catch (error) {
    console.error("用户操作失败:", error);
  }
};

// 8. 积分相关API
const pointsOperations = async () => {
  try {
    // 获取积分余额
    const balance = await pointsAPI.getBalance();
    console.log("积分余额:", balance);

    // 获取积分历史
    const history = await pointsAPI.getHistory({
      page: 1,
      size: 20,
      type: "earn", // 赚取类型
    });
    console.log("积分历史:", history);

    // 获取积分规则
    const rules = await pointsAPI.getRules();
    console.log("积分规则:", rules);
  } catch (error) {
    console.error("积分操作失败:", error);
  }
};

// 9. 等级系统API
const levelOperations = async () => {
  try {
    // 获取等级信息
    const levelInfo = await levelAPI.getInfo();
    console.log("等级信息:", levelInfo);

    // 获取升级进度
    const progress = await levelAPI.getProgress();
    console.log("升级进度:", progress);

    // 获取等级奖励
    const rewards = await levelAPI.getRewards();
    console.log("等级奖励:", rewards);
  } catch (error) {
    console.error("等级操作失败:", error);
  }
};

// 10. 排行榜API
const rankingOperations = async () => {
  try {
    // 获取排行榜列表
    const rankingList = await rankingAPI.getList({
      type: "points", // 积分排行榜
      page: 1,
      size: 50,
    });
    console.log("排行榜列表:", rankingList);

    // 获取我的排名
    const myRank = await rankingAPI.getMyRank();
    console.log("我的排名:", myRank);
  } catch (error) {
    console.error("排行榜操作失败:", error);
  }
};

// 11. 文件上传API
const uploadOperations = async (file) => {
  try {
    // 上传图片
    const imageResult = await uploadAPI.uploadImage(file, (progress) => {
      console.log(`图片上传进度: ${progress}%`);
    });
    console.log("图片上传成功:", imageResult);

    // 上传文件
    const fileResult = await uploadAPI.uploadFile(file, (progress) => {
      console.log(`文件上传进度: ${progress}%`);
    });
    console.log("文件上传成功:", fileResult);
  } catch (error) {
    console.error("上传操作失败:", error);
  }
};

// ==================== 高级功能示例 ====================

// 12. 取消所有请求
const cancelRequests = () => {
  cancelAllRequests();
  console.log("所有请求已取消");
};

// 13. 并发请求
const concurrentRequests = async () => {
  try {
    const [userInfo, pointsBalance, levelInfo] = await Promise.all([
      userAPI.getProfile(),
      pointsAPI.getBalance(),
      levelAPI.getInfo(),
    ]);

    console.log("并发请求结果:", {
      userInfo,
      pointsBalance,
      levelInfo,
    });
  } catch (error) {
    console.error("并发请求失败:", error);
  }
};

// 14. 错误处理示例
const errorHandlingExample = async () => {
  try {
    // 这个请求会失败，用于演示错误处理
    await http.get("/api/non-existent-endpoint");
  } catch (error) {
    if (error.code === 404) {
      console.log("资源不存在");
    } else if (error.code === 401) {
      console.log("需要登录");
      // 跳转到登录页
    } else {
      console.log("其他错误:", error.message);
    }
  }
};

// ==================== Vue组件中使用示例 ====================

// 在Vue组件中的使用方式
export const useAPI = () => {
  const loading = ref(false);
  const data = ref(null);
  const error = ref(null);

  const fetchData = async () => {
    loading.value = true;
    error.value = null;

    try {
      data.value = await userAPI.getProfile();
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  const submitForm = async (formData) => {
    loading.value = true;

    try {
      const result = await userAPI.updateProfile(formData);
      // 显示成功提示
      return result;
    } catch (err) {
      // 错误已在拦截器中处理
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    data,
    error,
    fetchData,
    submitForm,
  };
};

// 导出所有示例函数
export {
  getData,
  createData,
  getDataWithRetry,
  getSilentData,
  uploadFile,
  downloadFile,
  userOperations,
  pointsOperations,
  levelOperations,
  rankingOperations,
  uploadOperations,
  cancelRequests,
  concurrentRequests,
  errorHandlingExample,
};
