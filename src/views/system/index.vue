<template>
  <div class="container">
    <el-form
      style="max-width: 1000px"
      :model="form"
      label-width="auto"
      size="large"
    >
      <el-form-item label="隐私协议">
        <el-input
          v-model="form.agreement"
          style="width: 1000px"
          :rows="18"
          type="textarea"
          placeholder="请输入隐私协议"
        />
      </el-form-item>

      <el-form-item label="关于我们">
        <el-input
          v-model="form.about_us"
          style="width: 1000px"
          :rows="13"
          type="textarea"
          placeholder="请输入关于我们信息"
        />
      </el-form-item>

      <el-button
        @click="submit"
        type="primary"
        style="width: 100%; max-width: 1000px"
        >更新</el-button
      >
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { getAgreement, updateAgreement } from '@/api/sys'
import { ElMessage } from 'element-plus'

const form = reactive({
  agreement: '',
  about_us: '',
})

onMounted(() => {
  showInfo()
})

const showInfo = async () => {
  getAgreement().then((res: any) => {
    if (res.data.code == 200) {
      form.agreement = res.data.data.agreement
      form.about_us = res.data.data.about_us
    }
  })
}

const submit = () => {
  updateAgreement(form).then((res: any) => {
    if (res.data.code == 200) {
      ElMessage.success('更新成功')
    } else ElMessage.error('更新失败')
  })
}
</script>
<style scoped>
.container {
  padding: 20px;
}
</style>
