<template>
  <div class="info_main">
    <h1>场馆信息</h1>
    <div class="info_box">
      <p>场馆名称</p>
      <el-input v-model="form.shop_name" placeholder="Please input" />
      <p>场馆头像</p>
      <el-upload
        class="avatar-uploader"
        action="http://172.16.7.99:8002/upload/common"
        :show-file-list="false"
        :on-preview="handlePictureCardPreview"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="form.shop_avatar" :src="form.shop_avatar" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
          <Plus />
        </el-icon>
      </el-upload>
      <p class="tips">允许单张jpg/png 文件，最大不超过 500KB.</p>

      <p>场馆相册</p>

      <el-upload
        :file-list="fileList"
        action="http://172.16.7.99:8002/upload/common"
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

      <p>场馆电话</p>
      <el-input v-model="form.shop_phone" placeholder="Please input" />

      <p>场馆地址</p>
      <el-input v-model="form.shop_address" placeholder="Please input" />

      <p>营业时间</p>
      <el-input v-model="form.work_time" placeholder="Please input" />

      <p>标签选择</p>
      <el-checkbox-group v-model="tags">
        <el-checkbox label="停车场" />
        <el-checkbox label="24小时热水" />
        <el-checkbox label="淋浴房" />
        <el-checkbox label="不让你选" disabled />
        <!--        <el-checkbox label="selected and disabled" disabled/>-->
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
        v-model="form.desc"
        :autosize="{ minRows: 2, maxRows: 4 }"
        type="textarea"
        placeholder="Please input"
      />
    </div>

    <h1>预约设置</h1>
    <div class="info_box">
      <p>可预约的时间段</p>
      <el-input v-model="form.demo" placeholder="Please input" />
      <p>允许提前预约的天数</p>
      <el-input-number v-model="form.demo" :step="1" />
    </div>
    <el-button @click="submit">提交</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, reactive, onMounted } from 'vue'
import { ElMessage, ElInput } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { UploadProps, UploadUserFile } from 'element-plus'
import { paginationList, saasUpdateShopDetail } from '@/api/venue'

let form = reactive({
  shop_id: 1,
  shop_name: '',
  shop_avatar: '',
  shop_photo: [],
  shop_phone: '',
  shop_address: '',
  work_time: '',
  tag: [],
  demo: '',
  desc: '',
}) as any
// 多图片列表
const fileList = ref<UploadUserFile[]>([])

// 标签选项
const tags = ref<string[]>([])
//自定义标签
// 自定义标签
const dynamicTags = ref<string[]>([])
const inputValue = ref('')
const inputVisible = ref(false)
const InputRef = ref<InstanceType<typeof ElInput>>()

const handleAvatarSuccess: UploadProps['onSuccess'] = (res: any) => {
  form.shop_avatar = res.data
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile: any) => {
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

onMounted(() => {
  paginationList({ shop_id: 1 }).then((res: any) => {
    form.shop_name = res.data.data.name
    form.shop_avatar = res.data.data.avatar
    // form.shop_photo = res.data.data.photo
    form.shop_address = res.data.data.address
    form.shop_phone = res.data.data.phone
    form.work_time = res.data.data.work_time
    form.tag = res.data.data.tag
    res.data.data.photo.forEach((value: any) => {
      fileList.value.push({ url: value })
    })
    tagInit(res.data.data.tag)
  })
})

function tagInit(tag: any) {
  if (tag.indexOf('停车场') != -1) {
    tags.value.push('停车场')
  }
  if (tag.indexOf('24小时热水') != -1) {
    tags.value.push('24小时热水')
  }
  if (tag.indexOf('淋浴房') != -1) {
    tags.value.push('淋浴房')
  }
  tag.forEach((value: string) => {
    if (value != '停车场' && value != '24小时热水' && value != '淋浴房') {
      dynamicTags.value.push(value)
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
  fileList.value.push({ url: uploadFile.data })
}

const handlePictureCardPreview: UploadProps['onPreview'] = (
  uploadFile: any
) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
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

function submit() {
  form.shop_photo = []
  fileList.value.forEach((value) => {
    form.shop_photo.push(value.url)
  })
  form.tag = []
  tags.value.forEach((value) => {
    form.tag.push(value)
  })
  dynamicTags.value.forEach((value) => {
    form.tag.push(value)
  })

  saasUpdateShopDetail(form).then((res: any) => {
    if (res.data.code == 200) {
      ElMessage({ message: '更新成功', type: 'success' })
    }
  })
  location.reload()
}
</script>

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
