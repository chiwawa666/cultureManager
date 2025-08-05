import request from "@/utils/request";

// 登录方法
export function login(username, password, code, uuid) {
  const data = {
    mobile: username,
    password,
    loginType: 1,
  };
  return request({
    url: "/admin/login",
    headers: {
      isToken: false,
      repeatSubmit: false,
    },
    method: "post",
    data: data,
  });
}

// 获取用户信息
export function getProfile() {
  return request({
    url: "/user/profile",
    method: "get",
  });
}

// 更新用户信息
export function updateProfile(data) {
  return request({
    url: "/user/profile",
    method: "put",
    data: data,
  });
}

// 修改密码
export function changePassword(data) {
  return request({
    url: "/user/change-password",
    method: "post",
    data: data,
  });
}

// 上传头像
export function uploadAvatar(file) {
  const formData = new FormData();
  formData.append("avatar", file);
  
  return request({
    url: "/user/avatar",
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

// 登出
export function logout() {
  return request({
    url: "/user/logout",
    method: "post",
  });
} 