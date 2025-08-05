import { http } from "./request.js";

// API基础配置
const API_CONFIG = {
  // 用户相关
  USER: {
    LOGIN: "/user/login",
    LOGOUT: "/user/logout",
    PROFILE: "/user/profile",
    UPDATE_PROFILE: "/user/profile",
  },

  // 积分相关
  POINTS: {
    BALANCE: "/points/balance",
    HISTORY: "/points/history",
    RULES: "/points/rules",
    EARN: "/points/earn",
    SPEND: "/points/spend",
  },

  // 等级系统
  LEVEL: {
    INFO: "/level/info",
    PROGRESS: "/level/progress",
    REWARDS: "/level/rewards",
    UPGRADE: "/level/upgrade",
  },

  // 排行榜
  RANKING: {
    LIST: "/ranking/list",
    MY_RANK: "/ranking/my-rank",
    LEADERBOARD: "/ranking/leaderboard",
  },

  // 文件上传
  UPLOAD: {
    IMAGE: "/upload/image",
    FILE: "/upload/file",
  },
};

// 用户相关API
export const userAPI = {
  // 登录
  login: (data) => http.post(API_CONFIG.USER.LOGIN, data),

  // 登出
  logout: () => http.post(API_CONFIG.USER.LOGOUT),

  // 获取用户信息
  getProfile: () => http.get(API_CONFIG.USER.PROFILE),

  // 更新用户信息
  updateProfile: (data) => http.put(API_CONFIG.USER.UPDATE_PROFILE, data),
};

// 积分相关API
export const pointsAPI = {
  // 获取积分余额
  getBalance: () => http.get(API_CONFIG.POINTS.BALANCE),

  // 获取积分历史
  getHistory: (params) => http.get(API_CONFIG.POINTS.HISTORY, params),

  // 获取积分规则
  getRules: () => http.get(API_CONFIG.POINTS.RULES),

  // 赚取积分
  earn: (data) => http.post(API_CONFIG.POINTS.EARN, data),

  // 消费积分
  spend: (data) => http.post(API_CONFIG.POINTS.SPEND, data),
};

// 等级系统API
export const levelAPI = {
  // 获取等级信息
  getInfo: () => http.get(API_CONFIG.LEVEL.INFO),

  // 获取升级进度
  getProgress: () => http.get(API_CONFIG.LEVEL.PROGRESS),

  // 获取等级奖励
  getRewards: () => http.get(API_CONFIG.LEVEL.REWARDS),

  // 升级
  upgrade: () => http.post(API_CONFIG.LEVEL.UPGRADE),
};

// 排行榜API
export const rankingAPI = {
  // 获取排行榜列表
  getList: (params) => http.get(API_CONFIG.RANKING.LIST, params),

  // 获取我的排名
  getMyRank: () => http.get(API_CONFIG.RANKING.MY_RANK),

  // 获取排行榜
  getLeaderboard: (params) => http.get(API_CONFIG.RANKING.LEADERBOARD, params),
};

// 文件上传API
export const uploadAPI = {
  // 上传图片
  uploadImage: (file, onProgress) => {
    return http.upload(API_CONFIG.UPLOAD.IMAGE, file, {
      onUploadProgress: onProgress,
    });
  },

  // 上传文件
  uploadFile: (file, onProgress) => {
    return http.upload(API_CONFIG.UPLOAD.FILE, file, {
      onUploadProgress: onProgress,
    });
  },
};

// 通用API方法
export const commonAPI = {
  // 带重试的GET请求
  getWithRetry: (url, params) => http.getWithRetry(url, params),

  // 带重试的POST请求
  postWithRetry: (url, data) => http.postWithRetry(url, data),

  // 下载文件
  downloadFile: (url, params, filename) => http.download(url, params, filename),

  // 不显示loading的请求
  getSilent: (url, params) => http.get(url, params, { showLoading: false }),

  postSilent: (url, data) => http.post(url, data, { showLoading: false }),
};

// 导出API配置
export { API_CONFIG };

// 默认导出所有API
export default {
  user: userAPI,
  points: pointsAPI,
  level: levelAPI,
  ranking: rankingAPI,
  upload: uploadAPI,
  common: commonAPI,
};
