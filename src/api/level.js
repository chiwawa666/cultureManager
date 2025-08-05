import request from "@/utils/request";

// 获取等级信息
export function getInfo() {
  return request({
    url: "/level/info",
    method: "get",
  });
}

// 获取升级进度
export function getProgress() {
  return request({
    url: "/level/progress",
    method: "get",
  });
}

// 获取等级奖励
export function getRewards() {
  return request({
    url: "/level/rewards",
    method: "get",
  });
}

// 升级
export function upgrade() {
  return request({
    url: "/level/upgrade",
    method: "post",
  });
}

// 获取等级列表
export function getLevels() {
  return request({
    url: "/level/list",
    method: "get",
  });
}

// 获取当前等级详情
export function getCurrentLevel() {
  return request({
    url: "/level/current",
    method: "get",
  });
}

// 领取等级奖励
export function claimReward(levelId) {
  return request({
    url: `/level/${levelId}/claim-reward`,
    method: "post",
  });
} 