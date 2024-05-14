<script setup lang="ts">
import { onMounted } from 'vue'

import { getEnum } from '@/api/common'
import { useEnumStore } from '@/stores/enum.ts'
const commonEnum = useEnumStore()

onMounted(() => {
  getEnum().then((res: any) => {
    Object.keys(res.data.data.time_enum).forEach((key) => {
      if (Number(key) > 25) {
        delete res.data.data.time_enum[key]
      }
    })
    commonEnum.updateUserInfo(res.data.data)
  })
})
</script>

<template>
  <router-view></router-view>
</template>

<style>
* {
  box-sizing: border-box;
}
body {
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
