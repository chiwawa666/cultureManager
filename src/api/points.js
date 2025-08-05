import request from "@/utils/request";

// 获取积分余额
export function getBalance() {
  return request({
    url: "/points/balance",
    method: "get",
  });
}

// 获取积分历史
export function getHistory(params) {
  return request({
    url: "/points/history",
    method: "get",
    params: params,
  });
}

// 获取积分规则
export function getRules() {
  return request({
    url: "/points/rules",
    method: "get",
  });
}

// 赚取积分
export function earn(data) {
  return request({
    url: "/points/earn",
    method: "post",
    data: data,
  });
}

// 消费积分
export function spend(data) {
  return request({
    url: "/points/spend",
    method: "post",
    data: data,
  });
}

// 获取积分任务
export function getTasks() {
  return request({
    url: "/points/tasks",
    method: "get",
  });
}

// 完成任务
export function completeTask(taskId) {
  return request({
    url: `/points/tasks/${taskId}/complete`,
    method: "post",
  });
} 