import r from '@/utils/request.ts'

// 场地数据接口

// 获取场地的预约情况
export function getSiteReserve(data: any) {
  return r.request<string[]>({
    //r.request会做拦截，因此响应的数据就是string[] 类型
    url: 'saas/get/site/reserve',
    method: 'post',
    data,
  })
}

// 获取场地列表
// shop_id : 1
export function getSiteList(data: any) {
  return r.request<string[]>({
    url: '/saas/get/site/list',
    method: 'post',
    data,
  })
}

export function updateSite(data: any) {
  return r.request<string[]>({
    url: '/saas/update/site',
    method: 'post',
    data,
  })
}
export function addSite(data: any) {
  return r.request<string[]>({
    url: '/saas/add/site',
    method: 'post',
    data,
  })
}
export function delSite(data: any) {
  return r.request<string[]>({
    url: '/saas/del/site',
    method: 'post',
    data,
  })
}
