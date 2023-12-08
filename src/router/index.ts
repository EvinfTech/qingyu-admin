import {Common} from "./modules/common"
import {Site} from "./modules/site"
import {Order} from "./modules/order"
import {System} from "./modules/system"
import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import { Venue } from "./modules/venue"
import { DateCenter } from "./modules/datecenter"

//这里可以根据权限做动态路由
const menuRoute: RouteRecordRaw[] = [
  Site,
  Order,
  DateCenter,
  Venue,
  System,
]


const whiteList: string[] = ['/login']//不需要登录也能查看的路由,最少需要'/login'，要不然会一直重定向到login

export default createRouter({
  history: createWebHashHistory(),
  routes:[...menuRoute, ...Common,]
})

export {menuRoute,whiteList}
