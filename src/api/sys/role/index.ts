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
    url: '/saas/role/update',
    method: 'post',
    data
  })
}
