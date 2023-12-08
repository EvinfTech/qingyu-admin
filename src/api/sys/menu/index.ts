import request  from "@/utils/request.ts"

export const getMenuList = () => {
  return request.request<string[]>({
    url: '/saas/get/menu/list',
    method: 'post',
  })
}

export const addMenu = (data: any) => {
  return request.request<string[]>({
    url: '/saas/add/menu',
    method: 'post',
    data
  })
}

export const updateMenu = (data: any) => {
  return request.request<string[]>({
    url: '/saas/update/menu',
    method: 'post',
    data
  })
}

export const deleteMenu = (data: any) => {
  return request.request<string[]>({
    url: '/saas/del/menu',
    method: 'post',
    data
  })
}