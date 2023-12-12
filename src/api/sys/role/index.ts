import request from "@/utils/request.ts"

export const addRole = (data?: any) => {
  return request.request<string[]>({
    url: '/saas/add/role',
    method: 'post',
    data
  })
}

export const deleteRole = (data: any) => {
  return request.request<string[]>({
    url: '/saas/del/role',
    method: 'post',
    data
  })
}

export const getRoleList = () => {
  return request.request<string[]>({
    url: '/saas/get/role/list',
    method: 'post',
  })
}

export const updateRole = (data: any) => {
  return request.request<string[]>({
    url: '/saas/update/role',
    method: 'post',
    data
  })
}


// 更新角色的菜单权限
export const updateMenuRole = (data: any) => {
  return request.request<string[]>({
    url: '/saas/update/menuRole',
    method: 'post',
    data
  })
}

export const getMenuByRoleId = (data: any) => {
  return request.request<string[]>({
    url: '/saas/get/menuRole/list',
    method: 'post',
    data
  })
}
