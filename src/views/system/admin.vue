<template>
  <div class="container">
    <el-form
      style="max-width: 1000px"
      :model="form"
      label-width="auto"
      size="large"
    >
      <el-form-item label="用户名">
        <el-input v-model="form.name" style="width: 600px" disabled />
      </el-form-item>

      <el-form-item label="旧密码">
        <el-input
          v-model="form.old_password"
          style="width: 600px"
          placeholder="请输入旧密码"
          type="password"
        />
      </el-form-item>

      <el-form-item label="新密码">
        <el-input
          v-model="form.new_password"
          style="width: 600px"
          placeholder="请输入新密码"
          type="password"
        />
      </el-form-item>

      <el-button @click="submit" type="primary" style="margin-top: 20px"
        >保存</el-button
      >
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import { reactive, onMounted } from 'vue'
import { updateAdminUser } from '@/api/sys'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const { userName } = storeToRefs(userStore)

const form = reactive({
  name: '',
  old_password: '',
  new_password: '',
})

onMounted(() => {
  console.log(userStore)
  form.name = userName.value
})

const submit = () => {
  updateAdminUser(form).then((res: any) => {
    if (res.data.code == 200) {
      ElMessage.success('修改成功,请重新登录')
      userStore.loginOut()
    } else ElMessage.error('修改失败,' + res.data.msg)
  })
}
</script>
<style scoped>
.container {
  padding: 20px;
}
</style>
