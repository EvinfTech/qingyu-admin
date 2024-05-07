<template>
  <ContentWrap>
    <data-table
      :options="options"
      :query="query"
      @on-add="handleAdd(formRef)"
      @on-edit="handleEdit"
      ref="tableRef"
    >
      <template #search>
        <el-input
          class="filter-item"
          clearable
          v-model="query.params['name']"
          placeholder="搜索用户名称"
        />
      </template>

      <template #columns>
        <el-table-column type="selection" width="50px" />
        <el-table-column prop="avatar" label="头像">
          <template #default="scope">
            <el-avatar :size="30" :src="getUrl(scope.row.avatar)" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="用户名" />
        <el-table-column prop="phone" label="电话" />
        <el-table-column prop="birthday" label="出生年月" />
        <el-table-column prop="sex" label="性别">
          <template #default="scope">
            <span>
              {{
                scope.row.sex == 1 ? '男' : scope.row.sex == 2 ? '女' : '未知'
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="total_count" label="运动总次数" />
        <el-table-column prop="total_length" label="运动总时长" />
        <el-table-column prop="gmt_create" label="创建日期">
          <template #default="scope">
            <span>
              {{ dayjs(scope.row.gmt_create).format('YYYY-MM-DD HH:mm:ss') }}
            </span>
          </template>
        </el-table-column>
      </template>
    </data-table>

    <el-dialog
      v-model="dialogVisible"
      title="修改信息"
      :before-close="handleClose"
    >
      <el-form :model="form" :rules="rules" ref="formRef" label-position="top">
        <el-form-item label="用户名称" prop="name">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>

        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" autocomplete="off" />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSave(formRef)"
            >保存</el-button
          >
        </span>
      </template>
    </el-dialog>
  </ContentWrap>
</template>

<script lang="ts" setup>
import { ContentWrap } from '@/components/ContentWrap'
import { DataTable } from '@/components/DataTable'
import { ref, reactive, unref } from 'vue'
import type {
  OptionsType,
  TableQueryType,
} from '@/components/DataTable/src/types'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { updateUserInfo } from '@/api/user'
import { baseURL } from '@/config/request.ts'
import dayjs from 'dayjs'

// 表格查询参数
let query = ref<TableQueryType>({
  page: 1,
  size: 10,
  params: {
    title: '',
  },
})

const getUrl = (url: string) => {
  return baseURL + '/' + url
}

// 表格默认参数
let options = ref<OptionsType>({
  listUrl: '/saas/get/user/list',
  delUrl: '/saas/del/role',
  add: { enable: false },
  edit: { enable: false },
  del: { enable: false },

  // 批量操作
  batch: [
    {
      key: 'state',
      label: '启用',
      params: { state: 1 },
      action: '/api/user/state',
      idsKey: 'userIds',
    },
    {
      key: 'state',
      label: '禁用',
      params: { state: 0 },
    },
  ],
})

const tableRef = ref()

const dialogVisible = ref(false)
const form = ref<any>({
  name: '',
  phone: '',
})
const formRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  roleName: [
    {
      required: true,
      message: '角色名称必须输入',
      trigger: 'blur',
    },
  ],
  dataScope: [
    {
      required: true,
      message: '数据权限必须选择',
      trigger: 'blur',
    },
  ],
  roleLevel: [
    {
      required: true,
      message: '角色级别不能为空',
      trigger: 'blur',
    },
  ],
})

const handleAdd = (formEl: FormInstance | undefined) => {
  dialogVisible.value = true
  form.value = {}
  formEl?.resetFields()
}

const handleClose = () => {
  dialogVisible.value = false
}

const handleEdit = (row: any) => {
  dialogVisible.value = true
  form.value = row
}

const handleSave = (formEl: FormInstance | undefined) => {
  if (!formEl) return

  formEl.validate((valid) => {
    if (valid) {
      const formData = unref(form)
      console.log('formData', formData)
      if (formData.id) {
        //修改
        updateUserInfo(formData).then(() => {
          ElMessage({
            showClose: true,
            message: '操作成功！',
            type: 'success',
          })
          // 刷新表格
          tableRef.value.reload()
          dialogVisible.value = false
        })
      }
    } else {
      dialogVisible.value = false
    }
  })
}
</script>
@/api/user
