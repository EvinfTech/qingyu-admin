import  r  from "@/utils/request.ts"



export function getSiteReserve(data:any)  {
  return r.request<string[]>({//r.request会做拦截，因此响应的数据就是string[] 类型
    url: 'saas/get/site/reserve',
    method: 'post',
    data,
  })
}
export function addOrder(data:any)  {
  return r.request<string[]>({//r.request会做拦截，因此响应的数据就是string[] 类型
    url: 'saas/add/order',
    method: 'post',
    data,
  })
}
