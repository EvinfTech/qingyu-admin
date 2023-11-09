import {RouteRecordRaw} from "vue-router";

export const Order: RouteRecordRaw = {
  path: '/',
  component: () => import('@/views/layout/MainLayout.vue'),
  redirect: '/order',
  meta: {icon: 'List', title: "订单管理", alwaysShow: true},
  children: [
    {
      path: 'order',
      component: () => import('@/views/order/Order.vue'),
      meta: {icon: 'List', title: "订单管理", hideMenu: true}
    },
    {
      path: 'order_detail',
      component: () => import('@/views/order/OrderDetail.vue'),
      meta: {icon: 'Guide', title: "订单详情", hideMenu: true}
    },
  ]
}