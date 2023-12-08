import request  from "@/utils/request.ts"

export const treeApi = () => {
  return request.request<string[]>({
    url: '/saas/get/menu/list',
    method: 'post',
  })
}

export const saveApi = (data: any) => {
  return request.request<string[]>({
    url: '/saas/update/menu',
    method: 'post',
    data
  })
}

export const deleteApi = (data: any) => {
  return request.request<string[]>({
    url: '/saas/del/menu',
    method: 'post',
    data
  })
}

export const detailApi = (data: any) => {
  return request.request<string[]>({
    url: '/api/sys/menu/detail',
    method: 'post',
    data
  })
}

export const sortApi = (data: any) => {
  return request.request<string[]>({
    url: '/api/sys/menu/sort',
    method: 'post',
    data
  })
}