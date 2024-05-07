import r from '@/utils/request.ts'

// 用户登录
// name: "admin1",
// password: "admin"
export function login(data: any) {
  return r.request<string[]>({
    url: 'saas/login',
    method: 'post',
    data,
  })
}

// 获取时间枚举
export function getEnum() {
  return r.request<string[]>({
    url: 'common/get/enum',
    method: 'post',
  })
}
