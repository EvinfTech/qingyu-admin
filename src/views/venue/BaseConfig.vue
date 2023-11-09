<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { ElMessage, ElInput } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

import type { UploadProps, UploadUserFile } from 'element-plus'

const imageUrl = ref('')

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

// 多图片列表
const fileList = ref<UploadUserFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'plant-1.png',
    url: '/images/plant-1.png',
  },
])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

// 标签选项
const checkList = ref(['selected and disabled', 'Option A'])

// 自定义标签
const inputValue = ref('')
const dynamicTags = ref(['Tag 1', 'Tag 2', 'Tag 3'])
const inputVisible = ref(false)
const InputRef = ref<InstanceType<typeof ElInput>>()

const handleClose = (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}
</script>

<template>
  <div class="info_main">
    <h1>场馆信息</h1>
    <div class="info_box">
      <p>场馆名称</p>
      <el-input v-model="input" placeholder="Please input" />

      <p>场馆头像</p>

      <el-upload
        class="avatar-uploader"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
      <p class="tips">允许单张jpg/png 文件，最大不超过 500KB.</p>

      <p>场馆相册</p>

      <el-upload
        v-model:file-list="fileList"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
      <p class="tips">允许上传多张jpg/png 文件，最大不超过 500KB.</p>

      <p>场馆电话</p>
      <el-input v-model="input" placeholder="Please input" />

      <p>场馆地址</p>
      <el-input v-model="input" placeholder="Please input" />

      <p>营业时间</p>
      <el-input v-model="input" placeholder="Please input" />

      <p>标签选择</p>
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="Option A" />
        <el-checkbox label="Option B" />
        <el-checkbox label="Option C" />
        <el-checkbox label="disabled" disabled />
        <el-checkbox label="selected and disabled" disabled />
      </el-checkbox-group>

      <p>自定义标签</p>
      <el-tag
        v-for="tag in dynamicTags"
        :key="tag"
        class="mx-1"
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
        size="small"
        @click="showInput"
      >
        + New Tag
      </el-button>

      <p>场馆简介</p>
      <el-input
        v-model="textarea2"
        :autosize="{ minRows: 2, maxRows: 4 }"
        type="textarea"
        placeholder="Please input"
      />
    </div>

    <h1>预约设置</h1>
    <div class="info_box">
      <p>可预约的时间段</p>
      <el-input v-model="input" placeholder="Please input" />
      <p>允许提前预约的天数</p>
      <el-input-number v-model="num" :step="1" />
    </div>
  </div>
</template>

<style scoped>
.info_main {
  padding: 10px 30px;
  .info_box {
    padding: 0 30px;
    .tips {
      color: #606266;
      font-size: 12px;
    }
  }
  .info_box p {
    color: #303133;
  }
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
