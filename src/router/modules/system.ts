import  {RouteRecordRaw} from "vue-router";

export const System: RouteRecordRaw = {
  path: '/system',
  component: () => import('@/views/layout/MainLayout.vue'),
  redirect: '/system/fastCrudFrom',
  meta: {icon: 'ElementPlus', title: "系统工具"},
  children: [
    {
      path: 'role',
      component: () => import('@/views/system/role/role.vue'),
      meta: {title: "角色管理"},
    },
    {
      path: 'menu',
      component: () => import('@/views/system/menu/menu.vue'),
      meta: {title: "菜单管理"},
    }
  ]
}
