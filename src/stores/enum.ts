//src/store/modules/counter.ts
import {defineStore} from "pinia"
import {storagePrefixKey} from "@/config/app.ts";
import storage from "good-storage";
import {User} from "@/stores/user.ts";

const UIK = storagePrefixKey + "Enum"

export const useEnumStore = defineStore("enum",{
    state:()=>{
        return {
            Enum:storage.get(UIK)
        }
    },
    actions:{
        updateUserInfo(Enum: any) {
            this.Enum = Enum
            storage.set(UIK, Enum)
        },
    }
})
//下面这些函数是从本地读取，在pinia还没有创建的时候，例如路由钩子
export const getEnumInfo = (): any => {
    return storage.get(UIK, {})
}

export const getUserInfoByKey = (k: keyof any): any => {
    let u = getEnumInfo()
    return u[k]
}

export const getToken = (): string => {
    let u = getEnumInfo()
    return u["token"]
}
