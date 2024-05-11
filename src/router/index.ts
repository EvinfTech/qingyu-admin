import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const commonRoute: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/common/Login.vue'),
    meta: { title: '登录', hideTabs: true },
  },
  {
    // 找不到路由重定向到404页面
    path: '/:pathMatch(.*)',
    // path: "*",
    component: () => import('@/views/common/404.vue'),
  },
]

//这里可以根据权限做动态路由
const menuRoute: RouteRecordRaw[] = [
  {
    path: '',
    component: () => import('@/views/layout/MainLayout.vue'),
    redirect: '/',
    meta: { icon: 'HomeFilled', title: '首页', alwaysShow: true },
    children: [
      {
        path: '',
        component: () => import('@/views/home/index.vue'),
        meta: { icon: 'HomeFilled', title: '首页', hideMenu: true },
      },
    ],
  },
  {
    path: '/book',
    component: () => import('@/views/layout/MainLayout.vue'),
    meta: { icon: 'Grid', title: '场地预定', alwaysShow: true },
    children: [
      {
        path: '',
        component: () => import('@/views/book/index.vue'),
        meta: { icon: 'Grid', title: '订场管理', hideMenu: true },
      },
    ],
  },

  {
    path: '/order',
    component: () => import('@/views/layout/MainLayout.vue'),
    meta: { icon: 'List', title: '订单管理', alwaysShow: true },
    children: [
      {
        path: '',
        component: () => import('@/views/order/index.vue'),
        meta: { icon: 'List', title: '订单管理', hideMenu: true },
      },
    ],
  },
  {
    path: '/fund',
    component: () => import('@/views/layout/MainLayout.vue'),
    meta: { icon: 'Money', title: '资金流水', alwaysShow: true },
    children: [
      {
        path: '',
        component: () => import('@/views/fund/index.vue'),
        meta: { icon: 'Grid', title: '资金流水', hideMenu: true },
      },
    ],
  },
  {
    path: '/user',
    component: () => import('@/views/layout/MainLayout.vue'),
    meta: { icon: 'User', title: '用户管理', alwaysShow: true },
    children: [
      {
        path: '',
        component: () => import('@/views/user/index.vue'),
        meta: { icon: 'Avatar', title: '用户管理' },
      },
      {
        path: 'feedback',
        component: () => import('@/views/user/feedback.vue'),
        meta: { icon: 'ChatDotRound', title: '意见反馈' },
      },
    ],
  },
  {
    path: '/shop',
    component: () => import('@/views/layout/MainLayout.vue'),
    meta: { icon: 'Shop', title: '场馆管理' },
    children: [
      {
        path: 'base',
        component: () => import('@/views/shop/index.vue'),
        meta: { icon: 'Box', title: '场馆信息' },
      },
      {
        path: 'site',
        component: () => import('@/views/shop/site.vue'),
        meta: { icon: 'Basketball', title: '场地设置' },
      },
    ],
  },
  {
    path: '/system',
    component: () => import('@/views/layout/MainLayout.vue'),
    meta: { icon: 'Setting', title: '系统设置' },
    children: [
      {
        path: '',
        component: () => import('@/views/system/index.vue'),
        meta: { icon: 'Document', title: '协议设置' },
      },
      {
        path: 'modifyPwd',
        component: () => import('@/views/system/admin.vue'),
        meta: { icon: 'Setting', title: '密码设置' },
      },
      {
        path: 'key',
        component: () => import('@/views/system/key.vue'),
        meta: { icon: 'Key', title: '密钥管理' },
      },
    ],
  },
]

const whiteList: string[] = ['/login'] //不需要登录也能查看的路由,最少需要'/login'，要不然会一直重定向到login

export default createRouter({
  history: createWebHashHistory(),
  routes: [...menuRoute, ...commonRoute],
})

export { menuRoute, whiteList }
