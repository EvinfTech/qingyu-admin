<template>
  <div class="site_main">
    <div>
      <el-button
        type="primary"
        :icon="Plus"
        @click="createSite()"
        class="hidden-xs-only"
        >新增场地</el-button
      >
    </div>
    <div class="hr"></div>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="name" label="场地名称" />
      <el-table-column label="可预约时间">
        <template #default="scope">
          <div>
            {{ getWorkTime(scope.row) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="忙时时间段">
        <template #default="scope">
          <div>
            {{ getBusyTime(scope.row) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="free_price" label="闲时价格">
        <template #default="scope">
          <div>{{ scope.row.free_price / 100 }}元</div>
        </template>
      </el-table-column>
      <el-table-column prop="busy_price" label="忙时价格">
        <template #default="scope">
          <div>{{ scope.row.busy_price / 100 }}元</div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <div>
            {{ scope.row.status == 'Y' ? '正常' : '不可用' }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="weekend_busy" label="周末是否为忙时">
        <template #default="scope">
          <div>
            {{ scope.row.weekend_busy == 1 ? '是' : '否' }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-button @click="edit(scope.row)">更新</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <el-dialog
    class="form_box"
    v-model="dialogFormVisible"
    :title="func == 'create' ? '创建场地' : '更新场地'"
  >
    <el-form
      :model="form"
      label-position="top"
      :rules="rules"
      ref="ruleFormRef"
    >
      <el-form-item label="场地名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="可预约时间" prop="site_start_time">
        <div class="demo-time-range">
          <el-time-select
            v-model="form.site_start_time"
            start="00:00"
            step="01:00"
            end="24:00"
            @change="siteStartTimeChange()"
            placeholder="选择时间"
          />
          <el-time-select
            v-model="form.site_end_time"
            :start="form.site_start_time"
            step="01:00"
            end="24:00"
            placeholder="选择时间"
          />
        </div>
      </el-form-item>
      <el-form-item label="忙时时间段" prop="busy_start_time">
        <div class="demo-time-range">
          <el-time-select
            v-model="form.busy_start_time"
            start="00:00"
            step="01:00"
            end="23:30"
            placeholder="选择时间"
          />
          <el-time-select
            v-model="form.busy_end_time"
            start="00:00"
            step="01:00"
            end="24:00"
            placeholder="选择时间"
          />
        </div>
      </el-form-item>
      <el-form-item label="闲时价格" prop="free_price">
        <el-input v-model="form.free_price" />
      </el-form-item>
      <el-form-item label="忙时价格" prop="busy_price">
        <el-input v-model="form.busy_price" />
      </el-form-item>
      <el-form-item label="状态">
        <!--        <el-input v-model="form.status"/>-->
        <el-radio-group v-model="form.status" class="ml-4">
          <el-radio value="Y" size="large">正常</el-radio>
          <el-radio value="N" size="large">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="周末是否为忙时">
        <el-radio-group v-model="form.weekend_busy" class="ml-4">
          <el-radio :value="1" size="large">是</el-radio>
          <el-radio :value="0" size="large">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button @click="delSiteOp()" type="danger">删除</el-button>
        <el-button type="primary" @click="submit(ruleFormRef)">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { getSiteList, addSite, delSite, updateSite } from '@/api/site'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/theme-chalk/display.css'
import type { FormRules, FormInstance } from 'element-plus'

const tableData = ref<any[]>([])
let dialogFormVisible = ref<boolean>(false)
let func = ''

let form = ref<any>({
  site_start_time: '',
  site_end_time: '',
})

const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules<any>>({
  name: [
    {
      required: true,
      message: '请输入场馆名称',
      trigger: 'change',
    },
  ],
  busy_price: [
    {
      required: true,
      message: '请输入忙时价格',
      trigger: 'change',
    },
  ],
  free_price: [
    {
      required: true,
      message: '请输入闲时价格',
      trigger: 'change',
    },
  ],
  site_start_time: [
    {
      required: true,
      message: '请选择可预约开始时间',
      trigger: 'change',
    },
  ],
  site_end_time: [
    {
      required: true,
      message: '请选择可预约结束时间',
      trigger: 'change',
    },
  ],
  busy_start_time: [
    {
      required: true,
      message: '请选择忙时开始时间',
      trigger: 'change',
    },
  ],
  busy_end_time: [
    {
      required: true,
      message: '请选择忙时结束时间',
      trigger: 'change',
    },
  ],
})

onMounted(() => {
  updateInfo()
})

const updateInfo = () => {
  getSiteList({ shop_id: 1 }).then((res: any) => {
    tableData.value = res.data.data
    console.log('表数据', tableData.value)
  })
}

const submit = async (formEl: any) => {
  if (!formEl) return
  await formEl.validate((valid: any, fields: any) => {
    if (valid) {
      submitForm()
    } else {
      console.log('error submit!', fields)
    }
  })
}

const submitForm = () => {
  dialogFormVisible.value = false
  form.value.free_price = form.value.free_price * 100
  form.value.busy_price = form.value.busy_price * 100

  if (func == 'update') {
    updateSite(form.value).then((res: any) => {
      if (res.data.code == 200) {
        ElMessage({
          type: 'success',
          message: '操作成功',
        })
        updateInfo()
      }
    })
  }
  if (func == 'create') {
    console.log(form.value)
    form.value.shop_id = 1
    addSite(form.value).then((res: any) => {
      if (res.data.code == 200) {
        ElMessage({
          type: 'success',
          message: '操作成功',
        })
        updateInfo()
      }
    })
  }
}

const delSiteOp = () => {
  ElMessageBox.confirm('你确定要删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    delSite({ site_id: form.value.id }).then((res: any) => {
      if (res.data.code == 200) {
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
        dialogFormVisible.value = false
        updateInfo()
      }
    })
  })
}

function getWorkTime(data: any) {
  return data.site_start_time + ' ~ ' + data.site_end_time
}

function createSite() {
  func = 'create'
  dialogFormVisible.value = true
  form = ref<any>({})
}

function getBusyTime(data: any) {
  return data.busy_start_time + ' ~ ' + data.busy_end_time
}

function siteStartTimeChange() {
  console.log('出发了特定的函数')
  form.value.site_end_time = ''
}

function edit(data: any) {
  func = 'update'
  dialogFormVisible.value = true
  let copyObj1 = copyObj(data)
  form.value = copyObj1
  form.value.free_price = copyObj1.free_price / 100
  form.value.busy_price = copyObj1.busy_price / 100
}

function copyObj(obj: any): any {
  // 非对象 {}
  const isObj = typeof obj !== 'object' || obj === null

  if (isObj) return obj

  // 是数组 []
  const isArr = Array.isArray(obj)
  // 确认数据类型
  const newObj: any = isArr === true ? [] : {}

  // 遍历对象
  for (const key in obj) {
    newObj[key] = copyObj(obj[key])
  }

  return newObj
}
</script>

<style>
.el-dialog {
  min-width: 350px;
}
</style>

<style scoped lang="scss">
.site_main {
  padding: 10px 30px;

  .hr {
    margin-top: 10px;
    margin-bottom: 10px;
    height: 3px;
    width: 100%;
    background-color: #8c939d;
  }
}

.form_box {
  padding: 30px;
  .demo-time-range {
    width: 100%;
    display: flex;
    grid-gap: 0.5rem;
    gap: 0.5rem;
  }
}
</style>
