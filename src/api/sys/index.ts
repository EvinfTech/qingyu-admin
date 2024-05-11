import request from '@/utils/request.ts'

export const getAgreement = (data?: any) => {
  return request.request<string[]>({
    url: '/saas/get/agreement/about',
    method: 'post',
    data,
  })
}

export const updateAgreement = (data?: any) => {
  return request.request<string[]>({
    url: '/saas/update/agreement/about',
    method: 'post',
    data,
  })
}

export const updateAdminUser = (data?: any) => {
  return request.request<string[]>({
    url: '/saas/update-password',
    method: 'post',
    data,
  })
}

//修改短信设置
export const updateMessageSetting = (data?: any) => {
  return request.request<string[]>({
    url: '/saas/setting/update-message',
    method: 'post',
    data,
  })
}

//修改微信app
export const updateWXSetting = (data?: any) => {
  return request.request<string[]>({
    url: '/saas/setting/update-wx',
    method: 'post',
    data,
  })
}
