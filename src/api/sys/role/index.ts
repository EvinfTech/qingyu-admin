import request from "@/utils/request.ts"

export const pagingApi = (data?: any) => {
  return request.request<string[]>({
    url: '/api/sys/role/paging',
    method: 'post',
    data
  })
}

export const saveApi = (data: any) => {
  return request.request<string[]>({
    url: '/api/sys/role/save',
    method: 'post',
    data
  })
}

export const listRoleApi = () => {
  return request.request<string[]>({
    url: '/saas/get/role/list',
    method: 'post',
  })
}

export const saveRoleApi = (data: any) => {
  return request.request<string[]>({
    url: '/api/sys/role/save-menus',
    method: 'post',
    data
  })
}
