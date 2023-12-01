import  r  from "@/utils/request.ts"


export function paginationList(data:any)  {
    return r.request<string[]>({//r.request会做拦截，因此响应的数据就是string[] 类型
        url: '/saas/get/shop/detail',
        method: 'post',
        data,
    })
}
export function saasUpdateShopDetail(data:any)  {
    return r.request<string[]>({//r.request会做拦截，因此响应的数据就是string[] 类型
        url: '/saas/update/shop/detail',
        method: 'post',
        data,
    })
}
export function saasGetSiteList(data:any)  {
    return r.request<string[]>({//r.request会做拦截，因此响应的数据就是string[] 类型
        url: '/saas/get/site/list',
        method: 'post',
        data,
    })
}
export function saasUpdateSite(data:any)  {
    return r.request<string[]>({//r.request会做拦截，因此响应的数据就是string[] 类型
        url: '/saas/update/site',
        method: 'post',
        data,
    })
}