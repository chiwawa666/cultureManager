import request from "@/utils/request";

// 获取排行榜列表
export function getList(params) {
  return request({
    url: "/ranking/list",
    method: "get",
    params: params,
  });
}

// 获取我的排名
export function getMyRank() {
  return request({
    url: "/ranking/my-rank",
    method: "get",
  });
}

// 获取积分排行榜
export function getPointsRanking(params) {
  return request({
    url: "/ranking/points",
    method: "get",
    params: params,
  });
}

// 获取等级排行榜
export function getLevelRanking(params) {
  return request({
    url: "/ranking/level",
    method: "get",
    params: params,
  });
}

// 获取周排行榜
export function getWeeklyRanking(params) {
  return request({
    url: "/ranking/weekly",
    method: "get",
    params: params,
  });
}

// 获取月排行榜
export function getMonthlyRanking(params) {
  return request({
    url: "/ranking/monthly",
    method: "get",
    params: params,
  });
} 