import request from "@/utils/request.ts"

// 获取用户列表
// "page": 1,
// "size": 1,
// "name": "44", //店铺名称
// "phone": ""
export const getUserList = (data?: any) => {
  return request.request<string[]>({
    url: '/saas/get/user/list',
    method: 'post',
    data
  })
}

// 更新会员信息
export const updateUserInfo = (data?: any) => {
  return request.request<string[]>({
    url: '/saas/update/user/info',
    method: 'post',
    data
  })
}