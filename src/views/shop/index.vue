<template>
  <div class="info_main">
    <el-form
      style="max-width: 1000px"
      :model="form"
      label-width="auto"
      label-position="top"
      size="large"
    >
      <el-form-item label="场馆名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="场馆头像">
        <el-upload
          class="avatar-uploader"
          :action="uploadAvatarUrl"
          :show-file-list="false"
          :on-preview="handlePictureCardPreview"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="form.avatar"
            :src="baseURL + '/' + form.avatar"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
        <p class="tips">允许单张jpg/png 文件，最大不超过 500KB.</p>
      </el-form-item>
      <el-form-item label="场馆相册">
        <el-upload
          :file-list="fileList"
          :action="uploadPhotoUrl"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
        >
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
        <p class="tips">允许上传多张jpg/png 文件，最大不超过 500KB.</p>
      </el-form-item>
      <el-form-item label="场馆电话">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="场馆地址">
        <el-input v-model="form.address" />
      </el-form-item>
      <el-form-item label="营业时间">
        <el-input v-model="form.work_time" />
      </el-form-item>
      <!-- <el-form-item label="标签">
        <div class="mx-1">
          <el-tag
            v-for="tag in tags"
            :key="tag"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            v-if="inputVisible"
            ref="InputRef"
            v-model="inputValue"
            class="ml-1 w-20"
            size="small"
            @keyup.enter="handleInputConfirm"
            @blur="handleInputConfirm"
          />
          <el-button
            v-else
            class="button-new-tag ml-1"
            size="default"
            @click="showInput"
          >
            + 添加新标签
          </el-button>
        </div>
      </el-form-item> -->
      <el-form-item label="场馆设施">
        <el-input v-model="form.facility" />
      </el-form-item>
      <el-form-item label="场馆服务">
        <el-input v-model="form.serve" />
      </el-form-item>
      <el-form-item label="场馆简介">
        <el-input
          v-model="form.desc"
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          placeholder="介绍一下你的场馆吧"
        />
      </el-form-item>
    </el-form>

    <!-- <h1>预约设置</h1>
    <div class="info_box">
      <p>可预约的时间段</p>
      <el-input v-model="form.demo" placeholder="Please input" />
      <p>允许提前预约的天数</p>
      <el-input-number v-model="form.demo" :step="1" />
    </div> -->
    <el-button
      @click="submit"
      type="primary"
      style="width: 100%; max-width: 1000px; height: 40%; margin-top: 20px"
      >提交</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { ElMessage, ElInput } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { UploadProps, UploadUserFile } from 'element-plus'
import { getShopDetail, updateShopDetail } from '@/api/shop'
import { baseURL } from '@/config/request.ts'

let form = reactive({
  id: 1,
  name: '',
  avatar: '',
  address: '',
  work_time: '',
  phone: '',
  photo: [],
  // tag: [],
  desc: '',
  facility: 0,
  serve: '',
}) as any

// 多图片列表
const fileList = ref<UploadUserFile[]>([])

const tags = ref<string[]>([])

const uploadPhotoUrl = baseURL + '/common/upload/photo'
const uploadAvatarUrl = baseURL + '/common/upload/avatar'

const handleAvatarSuccess: UploadProps['onSuccess'] = (res: any) => {
  form.avatar = res.data
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile: any) => {
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

onMounted(() => {
  getShop()
})

const getShop = () => {
  getShopDetail({ shop_id: 1 }).then((res: any) => {
    let data = res.data.data
    form.name = data.name
    form.avatar = data.avatar
    form.address = data.address
    form.phone = data.phone
    form.work_time = data.work_time
    form.desc = data.desc
    form.facility = data.facility
    form.serve = data.serve
    // tags.value = data.tag
    fileList.value = []
    if (data.photo.length > 0) {
      data.photo.forEach((value: any) => {
        fileList.value.push({ name: '', url: baseURL + '/' + value })
      })
    }
  })
}

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove: UploadProps['onRemove'] = (
  uploadFile: any,
  uploadFiles: any
) => {
  console.log(uploadFile, uploadFiles)
}

const handleSuccess: UploadProps['onSuccess'] = (uploadFile: any) => {
  console.log(uploadFile.data)
  fileList.value.push({ name: '', url: uploadFile.data })
}

const handlePictureCardPreview: UploadProps['onPreview'] = (
  uploadFile: any
) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const submit = () => {
  form.photo = []
  fileList.value.forEach((value) => {
    form.photo.push(value.url?.replace(baseURL + '/', ''))
  })
  form.tag = []
  tags.value.forEach((value) => {
    form.tag.push(value)
  })

  updateShopDetail(form).then((res: any) => {
    console.log(res.data)
    if (res.data.code == 200) {
      ElMessage({ message: '更新成功', type: 'success' })
      getShop()
    }
  })
}

// const inputValue = ref('')
// const inputVisible = ref(false)
// const InputRef = ref<InstanceType<typeof ElInput>>()
// const handleClose = (tag: string) => {
//   tags.value.splice(tags.value.indexOf(tag), 1)
// }

// const showInput = () => {
//   inputVisible.value = true
//   nextTick(() => {
//     InputRef.value!.input!.focus()
//   })
// }

// const handleInputConfirm = () => {
//   if (inputValue.value) {
//     tags.value.push(inputValue.value)
//   }
//   inputVisible.value = false
//   inputValue.value = ''
// }
</script>

<style scoped>
.info_main {
  padding: 10px 30px;

  .info_box {
    .tips {
      color: #606266;
      font-size: 12px;
    }
  }

  .info_box p {
    color: #303133;
  }
}

.mx-1 {
  display: flex;

  grid-gap: 0.5rem;
  gap: 0.5rem;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
@/api/shop
