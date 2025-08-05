import request from "@/utils/request";

// 上传图片
export function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);
  
  return request({
    url: "/upload/image",
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

// 上传文件
export function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);
  
  return request({
    url: "/upload/file",
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

// 批量上传
export function uploadMultiple(files) {
  const formData = new FormData();
  files.forEach((file, index) => {
    formData.append(`files[${index}]`, file);
  });
  
  return request({
    url: "/upload/multiple",
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

// 删除文件
export function deleteFile(fileId) {
  return request({
    url: `/upload/file/${fileId}`,
    method: "delete",
  });
}

// 获取文件信息
export function getFileInfo(fileId) {
  return request({
    url: `/upload/file/${fileId}`,
    method: "get",
  });
} 