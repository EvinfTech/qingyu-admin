import request from '@/utils/request.ts'

export const getUserListAPI = '/saas/get/user/list'

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

// page: 1
// size: 10
// 获取意见反馈列表
export const getFeedbackList = (data?: any) => {
  return request.request<string[]>({
    url: '/saas/get/feedback/list',
    method: 'post',
    data,
  })
}

export const getFeedbackListAPI = '/saas/get/feedback/list'
