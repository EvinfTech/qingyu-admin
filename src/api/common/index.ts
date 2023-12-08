import  r  from "@/utils/request.ts"

export function commonGetEnum()  {
    return r.request<string[]>({//r.request会做拦截，因此响应的数据就是string[] 类型
        url: 'common/get/enum',
        method: 'post',
    })
}

export function saasLogin(data: any){
  return r.request<string[]>({//r.request会做拦截，因此响应的数据就是string[] 类型
    url: 'saas/login',
    method: 'post',
    data
})
}