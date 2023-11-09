import {RouteRecordRaw} from "vue-router";

export const DateCenter: RouteRecordRaw = {
  path: '/datecenter',
  component: () => import('@/views/layout/MainLayout.vue'),
  redirect: '/datecenter',
  meta: {icon: 'TrendCharts', title: "数据中心"},
  children: [
    {
      path: 'business',
      component: () => import('@/views/datecenter/Business.vue'),
      meta: {icon: 'ElementPlus',title: "运营数据"},
    },
    {
      path: 'fund',
      component: () => import('@/views/datecenter/Fund.vue'),
      meta: {icon: 'Money', title: "资金流水"},
    }
  ]
}
