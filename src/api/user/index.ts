import request from '@/utils/request.ts'

export const getUserList = (data?: any) => {
  return request.request<string[]>({
    url: '/saas/get/user/list',
    method: 'post',
    data,
  })
}

// 更新会员信息
export const updateUserInfo = (data?: any) => {
  return request.request<string[]>({
    url: '/saas/update/user/info',
    method: 'post',
    data,
  })
}
