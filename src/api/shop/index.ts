import r from '@/utils/request.ts'
export function getShopDetail(data: any) {
  return r.request<string[]>({
    url: '/saas/get/shop/detail',
    method: 'post',
    data,
  })
}
export function updateShopDetail(data: any) {
  return r.request<string[]>({
    url: '/saas/update/shop/detail',
    method: 'post',
    data,
  })
}

// 场馆界面
export function getShopCapital(data: any) {
  return r.request<string[]>({
    url: 'saas/get/shop/capital',
    method: 'post',
    data,
  })
}

export const getBillListAPI = '/saas/get/bill/list'
// 获取流水数据
export function getBillList(data: any) {
  return r.request<string[]>({
    url: 'saas/get/bill/list',
    method: 'post',
    data,
  })
}

// 模拟提现
export function withdrawal(data: any) {
  return r.request<string[]>({
    url: 'saas/withdraw/deposit',
    method: 'post',
    data,
  })
}

// 查看首页运营数据接口
export function getOperationalData(data: any) {
  return r.request<string[]>({
    url: 'saas/get/operational/data',
    method: 'post',
    data,
  })
}
