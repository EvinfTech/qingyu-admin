import {RouteRecordRaw} from "vue-router";

export const Venue: RouteRecordRaw = {
  path: '/venue',
  component: () => import('@/views/layout/MainLayout.vue'),
  redirect: '/venue',
  meta: {icon: 'ElementPlus', title: "场馆设置"},
  children: [
    {
      path: 'base',
      component: () => import('@/views/venue/BaseConfig.vue'),
      meta: {icon: 'Box', title: "场馆信息"},
    },
    {
      path: 'site',
      component: () => import('@/views/venue/SiteConfig.vue'),
      meta: {icon: 'Basketball',title: "场地设置"},
    },
    {
      path: 'book',
      component: () => import('@/views/venue/BookConfig.vue'),
      meta: {icon: 'Calendar',title: "预约设置"},
    }
  ]
}
