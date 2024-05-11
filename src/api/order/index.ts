import r from '@/utils/request.ts'

// 订单相关API

export const getOrderListAPI = '/saas/get/order/list'

// 获取订单列表
export function getOrderList(data: any) {
  return r.request<string[]>({
    url: 'saas/get/order/list',
    method: 'post',
    data,
  })
}

// 取消订单
// order_no: ''
export function cancelOrder(data: any) {
  return r.request<string[]>({
    //r.request会做拦截，因此响应的数据就是string[] 类型
    url: 'saas/cancel/order',
    method: 'post',
    data,
  })
}

// 订单校验
// order_no: ''
// check_no: ''
export function checkOrder(data: any) {
  return r.request<string[]>({
    url: 'saas/check/order',
    method: 'post',
    data,
  })
}

// 创建订单
// "user_name": "散客", //用户名
// "user_phone": "19999999999", //手机号
// "shop_id": 1,
// "gmt_site_use": "2023-11-15", //场地使用时间
// "site_detail": [
// {
// "site_id": 1, //场地id
// "time_enum": [ 1, 2, 3 ] //预定的时间标签
// },
// ], //场地详情
// "reserve_name": "预约人姓名",
// "reserve_phone": "19999999999",
// "remark": "这个人打球很垃圾" //备注
export function addOrder(data: any) {
  return r.request<string[]>({
    //r.request会做拦截，因此响应的数据就是string[] 类型
    url: '/saas/add/order',
    method: 'post',
    data,
  })
}

// 模拟支付
// order_no: ''
export function wxPay(data: any) {
  return r.request<string[]>({
    url: '/wx/pay',
    method: 'post',
    data,
  })
}

export function updateRemark(data: any) {
  return r.request<string[]>({
    url: '/saas/update/remark',
    method: 'post',
    data,
  })
}
