import {RouteRecordRaw} from "vue-router";

export const Site: RouteRecordRaw = {
  path: '/',
  component: () => import('@/views/layout/MainLayout.vue'),
  redirect: '/site',
  meta: {icon: 'Guide', title: "订场管理", alwaysShow: true},
  children: [
    {
      path: 'site',
      component: () => import('@/views/site/Site.vue'),
      meta: {icon: 'Guide', title: "订场管理", hideMenu: true}
    }
  ]
}

