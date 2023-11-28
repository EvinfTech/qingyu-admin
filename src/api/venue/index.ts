import  r  from "@/utils/request.ts"


export function paginationList(data:any)  {
    return r.request<string[]>({//r.request会做拦截，因此响应的数据就是string[] 类型
        url: '/saas/get/shop/detail',
        method: 'post',
        data,
    })
}