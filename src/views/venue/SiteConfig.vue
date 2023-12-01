<template>
  <div class="site_main">
    <div>
      <el-button type="primary" :icon="Plus">新增场地</el-button>
      <el-button type="primary" :icon="Plus">新增时间段</el-button>
    </div>
    <div class="hr"></div>

    <el-table :data="tableData" stripe style="width: 100%" border>
      <el-table-column prop="id" label="场地id" width="80"/>
      <el-table-column prop="name" label="场地名称" width="180"/>
      <el-table-column label="可预约时间" width="180">
        <template #default="scope">
          <div>
            {{ getWorkTime(scope.row) }}
          </div>

        </template>
      </el-table-column>
      <el-table-column prop="date" label="忙时时间段" width="180">
        <template #default="scope">
          <div>
            {{ getBusyTime(scope.row) }}
          </div>

        </template>
      </el-table-column>
      <el-table-column prop="free_price" label="闲时价格" width="180">
        <template #default="scope">
          <di>
            {{ scope.row.free_price / 100 }}元
          </di>
        </template>
      </el-table-column>
      <el-table-column prop="busy_price" label="忙时价格" width="180">
        <template #default="scope">
          <di>
            {{ scope.row.busy_price / 100 }}元
          </di>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="180">
        <template #default="scope">
          <di>
            {{ scope.row.status == "Y" ? "正常" : "不可用" }}
          </di>
        </template>
      </el-table-column>
      <el-table-column prop="weekend_busy" label="周末是否为忙时" width="180">
        <template #default="scope">
          <di>
            {{ scope.row.weekend_busy == 1 ? "是" : "否" }}
          </di>
        </template>
      </el-table-column>
      <el-table-column prop="holiday_busy" label="假期是否为忙时" width="180">
        <template #default="scope">
          <di>
            {{ scope.row.holiday_busy == 1 ? "是" : "否" }}
          </di>
        </template>
      </el-table-column>
      <el-table-column prop="data_busy" label="特殊忙时日期"/>
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-button @click="edit(scope.row) ">查看\编辑</el-button>

        </template>

      </el-table-column>
    </el-table>
  </div>

  <el-dialog v-model="dialogFormVisible" title="操作" width="30%">
    <el-form :model="form">
      <el-form-item label="场地名称" :label-width="formLabelWidth">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="可预约时间" :label-width="formLabelWidth">
        <div class="demo-time-range">
          <el-time-select
              v-model="form.site_start_time"
              start="1:00"
              step="00:30"
              end="23:30"
              @change="siteStartTimeChange()"
              placeholder="Select time"
          />
          <el-time-select
              v-model="form.site_end_time "
              :start=form.site_start_time
              step="01:00"
              end="23:30"
              placeholder="Select time"
          />
        </div>
      </el-form-item>
      <el-form-item label="忙时时间段" :label-width="formLabelWidth">
        <div class="demo-time-range">
          <el-time-select
              v-model="form.busy_start_time"
              start="1:00"
              step="00:30"
              end="23:30"
              placeholder="Select time"
          />
          <el-time-select
              v-model="form.busy_end_time"
              start="1:00"
              step="00:30"
              end="23:30"
              placeholder="Select time"
          />
        </div>
      </el-form-item>
      <el-form-item label="闲时价格" :label-width="formLabelWidth">
        <el-input v-model="form.free_price"/>
      </el-form-item>
      <el-form-item label="忙时价格" :label-width="formLabelWidth">
        <el-input v-model="form.busy_price"/>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <!--        <el-input v-model="form.status"/>-->
        <el-radio-group v-model="form.status" class="ml-4">
          <el-radio label="Y" size="large">正常</el-radio>
          <el-radio label="N" size="large">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="周末是否为忙时" :label-width="formLabelWidth">
        <el-radio-group v-model="form.weekend_busy" class="ml-4">
          <el-radio :label="1" size="large">是</el-radio>
          <el-radio :label="0" size="large">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="假期是否为忙时" :label-width="formLabelWidth">
        <el-radio-group v-model="form.holiday_busy" class="ml-4">
          <el-radio :label="1" size="large">是</el-radio>
          <el-radio :label="0" size="large">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="特殊忙时日期" :label-width="formLabelWidth">
        <el-input v-model="form.data_busy"/>
      </el-form-item>

    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm()">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref, watch} from 'vue'
import {Plus, Delete} from '@element-plus/icons-vue'
import {saasGetSiteList, saasUpdateSite} from "@/api/venue";
import {useEnumStore} from "@/stores/enum.ts";
import {ElMessage} from "element-plus";


const tableData = ref<any[]>([])
const TimeEnum = useEnumStore()
let dialogFormVisible = ref<boolean>(false)
let formLabelWidth = '150px'


let form = ref<any>({
  site_start_time: '',
  site_end_time: ''
})
onMounted(() => {
  saasGetSiteList({"shop_id": 1}).then((res: any) => {
    tableData.value = res.data.data
    console.log("表数据", tableData.value)
  })
  console.log("枚举数据", TimeEnum.Enum.time_enum[8])
})

function submitForm() {
  dialogFormVisible.value = false
  form.value.free_price = form.value.free_price * 100
  form.value.busy_price = form.value.busy_price * 100
  console.log("准备提交的数据", form)

  saasUpdateSite(form.value).then((res: any) => {
    if (res.data.code == 200) {
      ElMessage({
        type: 'success',
        message: '操作成功'
      })
    }
    console.log(res)
  })
  location.reload()
}

function getWorkTime(data: any) {
  return data.site_start_time + " ~ " + data.site_end_time
}

function getBusyTime(data: any) {
  return data.busy_start_time + " ~ " + data.busy_end_time
}

function siteStartTimeChange(){
  console.log("出发了特定的函数")
  form.value.site_end_time = ''
}
function edit(data: any) {

  dialogFormVisible.value = true
  let copyObj1 = copyObj(data);
  form.value = copyObj1
  form.value.free_price = copyObj1.free_price / 100
  form.value.busy_price = copyObj1.busy_price / 100
  console.log(form)
  // watch(() => form.value.site_start_time, (newValue, oldValue) => {
  //   console.log("监听成功", newValue.site_start_time, oldValue.site_start_time)
  //   form.value.site_end_time = ''
  //
  // }, {
  //   deep: true
  // })
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
</style>
