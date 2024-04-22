import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'

const commonRoute: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/common/Login.vue'),
    meta: {title: '登录', hideTabs: true}
  },
  {
    // 找不到路由重定向到404页面
    path: "/:pathMatch(.*)",
    // path: "*",
    component: () => import('@/views/common/404.vue'),
  },
]

//这里可以根据权限做动态路由
const menuRoute: RouteRecordRaw[] = [
  {
    path: '',
    component: () => import('@/views/layout/MainLayout.vue'),
    redirect: '/business',
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
  },  
  {
    path: '/book',
    component: () => import('@/views/layout/MainLayout.vue'),
    meta: {icon: 'Grid', title: "订场管理", alwaysShow: true},
    redirect: '/book/book',
    children: [
      {
        path: 'book',
        component: () => import('@/views/book/Book.vue'),
        meta: {icon: 'Grid', title: "订场管理", hideMenu: true}
      },
    ]
  },
  {
    path: '/order',
    component: () => import('@/views/layout/MainLayout.vue'),
    redirect: '/order/order',
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
  },
  {
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
  },
  {
    path: '/system',
    component: () => import('@/views/layout/MainLayout.vue'),
    redirect: '/system/fastCrudFrom',
    meta: {icon: 'ElementPlus', title: "系统工具"},
    children: [
      {
        path: 'user',
        component: () => import('@/views/system/user/user.vue'),
        meta: {title: "用户管理"},
      },
      {
        path: 'role',
        component: () => import('@/views/system/role/role.vue'),
        meta: {title: "角色管理"},
      },
      {
        path: 'menu',
        component: () => import('@/views/system/menu/menu.vue'),
        meta: {title: "菜单管理"},
      },
  
    ]
  },
]

const whiteList: string[] = ['/login']//不需要登录也能查看的路由,最少需要'/login'，要不然会一直重定向到login

export default createRouter({
  history: createWebHashHistory(),
  routes:[...menuRoute, ...commonRoute]
})

export { menuRoute, whiteList}
