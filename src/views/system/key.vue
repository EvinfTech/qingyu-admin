<template>
  <div class="container">
    <div class="box">
      <p>短信设置</p>
      <el-form
        style="max-width: 1000px"
        :model="msgForm"
        label-width="auto"
        size="large"
      >
        <el-form-item label="KeyID">
          <el-input
            v-model="msgForm.alibaba_cloud_access_key_id"
            style="width: 600px"
            placeholder="请输入Key"
          />
        </el-form-item>

        <el-form-item label="秘钥">
          <el-input
            v-model="msgForm.alibaba_cloud_access_key_secret"
            style="width: 600px"
            placeholder="请输入密钥"
          />
        </el-form-item>
        <el-form-item label="签名">
          <el-input
            v-model="msgForm.sign_name"
            style="width: 600px"
            placeholder="请输入签名信息"
          />
        </el-form-item>

        <el-button @click="submitMsg" type="primary">更新</el-button>
      </el-form>
    </div>

    <div class="box">
      <p>微信app设置</p>
      <el-form
        style="max-width: 1000px"
        :model="wxForm"
        label-width="auto"
        size="large"
      >
        <el-form-item label="AppID">
          <el-input
            v-model="wxForm.wx_appid"
            style="width: 600px"
            placeholder="请输入AppID"
          />
        </el-form-item>

        <el-form-item label="秘钥">
          <el-input
            v-model="wxForm.wx_secret"
            style="width: 600px"
            placeholder="请输入密钥"
          />
        </el-form-item>

        <el-button @click="submitWX" type="primary">更新</el-button>
      </el-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { updateMessageSetting, updateWXSetting, getSecret } from '@/api/sys'
import { ElMessage } from 'element-plus'

const msgForm = reactive({
  alibaba_cloud_access_key_id: '',
  alibaba_cloud_access_key_secret: '',
  sign_name: '',
})

const wxForm = reactive({
  wx_appid: '',
  wx_secret: '',
})

onMounted(() => {
  showInfo()
})

const showInfo = async () => {
  getSecret().then((res: any) => {
    let postData = res.data.data
    msgForm.alibaba_cloud_access_key_id = postData.alibaba_cloud_access_key_id
    msgForm.alibaba_cloud_access_key_secret =
      postData.alibaba_cloud_access_key_secret
    msgForm.sign_name = postData.sign_name
    wxForm.wx_appid = postData.wx_appid
    wxForm.wx_secret = postData.wx_secret
  })
}

const submitMsg = () => {
  updateMessageSetting(msgForm).then((res: any) => {
    if (res.data.code == 200) {
      ElMessage.success('更新成功')
    } else ElMessage.error('更新失败')
  })
}

const submitWX = () => {
  updateWXSetting(wxForm).then((res: any) => {
    if (res.data.code == 200) {
      ElMessage.success('更新成功')
    } else ElMessage.error('更新失败')
  })
}
</script>
<style scoped>
p {
  margin: 0;
}
.container {
  padding: 20px;
  .box {
    background-color: #f8f8ff;
    border-radius: 20px;
    margin-bottom: 20px;
    p {
      padding: 20px;
    }
    .el-form {
      padding: 20px;
    }
  }
}
</style>
