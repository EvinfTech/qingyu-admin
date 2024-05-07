<template>
  <el-row>
    <el-col :lg="18" :md="24">
      <div class="legend">
        <el-tag
          v-for="item in legends"
          :key="item.name"
          :type="item.type"
          effect="dark"
          size="large"
        >
          {{ item.name }}
        </el-tag>
        <el-check-tag>可预定</el-check-tag>
        <el-check-tag checked>已选择</el-check-tag>
      </div>

      <div class="left-main">
        <el-radio-group
          v-model="selectDate"
          :size="isMinScreen ? 'small' : 'large'"
        >
          <el-radio-button
            v-for="item in nextSevenDays"
            :label="item.short"
            :value="item.long"
          ></el-radio-button>
        </el-radio-group>
        <el-table class="my_table" :data="tableData" style="width: 100%">
          <el-table-column fixed prop="timeValue" label="时间" width="110">
          </el-table-column>
          <el-table-column
            v-for="(column, index) in colNames"
            :label="column"
            :key="index"
            :prop="column"
            :highlight-current-row="true"
            width="130"
          >
            <template #default="scope">
              <div>
                <el-check-tag
                  v-if="scope.row[column].price"
                  class="el-check-box"
                  :checked="scope.row[column].checked"
                  @change="onTagChange(scope.row[column])"
                  >{{ formatPrice(scope.row[column].price) }}</el-check-tag
                >
                <el-tag
                  v-else
                  :type="getTagType(scope.row[column])"
                  effect="dark"
                  size="large"
                  style="width: 90px; height: 48px"
                >
                  {{ scope.row[column] }}
                </el-tag>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-col>
    <el-col :lg="6">
      <div class="book_info">
        <h3>预约信息</h3>
        <el-form ref="ruleFormRef" :model="form" :rules="rules">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="手机" prop="phone">
            <el-input v-model="form.phone" />
          </el-form-item>
          <el-form-item label="备注" prop="remake">
            <el-input v-model="form.remake" />
          </el-form-item>
        </el-form>
        <h3>场次信息</h3>
        <div v-for="item in showSeletSite">
          <div class="right-middle-show">
            <div>线下预约:{{ item.site }}</div>
            <div class="flex_box" v-for="data in item.data">
              <div>{{ data.time_value }}</div>
              <div style="color: #f44336">
                {{ formatPrice(data.price) }}
              </div>
            </div>
            <div>{{ selectDate }} 共{{ item.data.length }}场</div>
          </div>
        </div>
        <div class="flex_box">
          <h3>合计</h3>
          <h3 style="color: #f44336">{{ formatPrice(showTotal) }}</h3>
        </div>
        <el-button
          @click="submit(ruleFormRef)"
          type="primary"
          style="width: 100%; height: 40%"
          >结算</el-button
        >
      </div>
    </el-col>
  </el-row>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { addOrder, wxPay } from '@/api/order'
import { getSiteReserve } from '@/api/site'
import { useEnumStore } from '@/stores/enum.ts'
import { ElMessage } from 'element-plus'
import { minScreenMaxWidth } from '@/config/app'
import { useMediaQuery } from '@vueuse/core'
import dayjs from 'dayjs'
import type { FormInstance, FormRules } from 'element-plus'

const isMinScreen = useMediaQuery(`(max-width: ${minScreenMaxWidth}px)`)

const timeEnums = useEnumStore().Enum.time_enum // 时间枚举
const colNames = ref([] as any)
const tableData = ref<any>([])
const seletSite = ref<any>([])
const showSeletSite = ref<any>([])
const showTotal = ref(0)
const nextSevenDays = ref([] as any)
const selectDate = ref('') //选择的日期

const legends = [
  { name: '线下预定', type: 'primary' },
  { name: '线上预定', type: 'warning' },
  { name: '不可预定', type: 'info' },
]

const ruleFormRef = ref<FormInstance>()
let form = reactive<RuleForm>({
  name: '',
  phone: '',
  remake: '',
})

interface RuleForm {
  name: string
  phone: string
  remake: string
}

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: '请输入预定人姓名', trigger: 'blur' },
    { min: 1, max: 15, message: '最长输入15个字符', trigger: 'blur' },
  ],
  phone: [
    { required: true, message: '请输入电话号码', trigger: 'blur' },
    { min: 11, max: 11, message: '电话格式不正确', trigger: 'blur' },
  ],
})

// 获取未来七天日期
const initSevenDays = () => {
  let today = dayjs()
  for (let i = 0; i < 7; i++) {
    let futureDate = today.add(i, 'day')
    nextSevenDays.value.push({
      short: futureDate.format('MM-DD'),
      long: futureDate.format('YYYY-MM-DD'),
    })
  }
  selectDate.value = nextSevenDays.value[0].long
}

onMounted(() => {
  seletSite.value = []
  initSevenDays()
})

watch(
  () => selectDate.value,
  () => {
    updateData(selectDate.value)
    seletSite.value = []
    setShowSeletSite()
  }
)

const onTagChange = (item: any) => {
  item.checked = !item.checked
  if (item.checked) {
    seletSite.value.push(item)
  } else {
    seletSite.value.splice(seletSite.value.indexOf(item), 1)
  }
  setShowSeletSite()
}

// 设置侧栏选中的场地信息
const setShowSeletSite = () => {
  showSeletSite.value = []
  showTotal.value = 0
  colNames.value.forEach((item: any) => {
    let tmp = { site: item, data: [] as any }
    seletSite.value.forEach((element: any) => {
      const siteName = element.site_name

      if (siteName == item) {
        tmp.data.push({ time_value: element.time_value, price: element.price })
        showTotal.value += element.price
      }
    })
    if (tmp.data.length > 0) showSeletSite.value.push(tmp)
  })
}

const getTagType = (name: string) => {
  switch (name) {
    case '线下预定':
      return 'primary'
    case '线上预定':
      return 'warning'
    case '不可预定':
      return 'info'
    default:
      return 'primary'
  }
}

// 刷新数据
const updateData = (date: any) => {
  getSiteReserve({ date: date }).then((res: any) => {
    let postData = res.data.data
    // 数据清空
    tableData.value = []

    // 设置列名
    colNames.value = []
    postData.forEach((element: any) => {
      colNames.value.push(element.site_name)
    })

    // 设置数据
    Object.keys(timeEnums).forEach((key) => {
      let dataObj = { timeValue: timeEnums[key] } as any
      let numberKey = Number(key)
      let tmpId = 0

      postData.forEach((value: any) => {
        if (value.saas_reserve_time_enum.includes(numberKey)) {
          dataObj[value.site_name] = '线下预定'
        } else if (value.online_reserve_time_enum.includes(numberKey)) {
          dataObj[value.site_name] = '线上预定'
        } else if (value.store_time_enum.includes(numberKey)) {
          value.price.forEach((v: any) => {
            // 可预定场地的信息
            if (v.time_enum == numberKey) {
              dataObj[value.site_name] = {
                id: tmpId,
                price: v.price,
                checked: false,
                site_id: value.site_id,
                site_name: value.site_name,
                time_enum: v.time_enum,
                time_value: timeEnums[v.time_enum],
              }
            }
          })
        } else {
          dataObj[value.site_name] = '不可预定'
        }
      })
      tableData.value.push(dataObj)
    })
  })
}

// 价格格式化
const formatPrice = (price: number) => {
  return '￥' + (price / 100.0).toFixed(2)
}

const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl || seletSite.value.length == 0) return
  await formEl.validate((valid) => {
    if (valid) {
      var data = reactive<any>({
        user_name: form.name,
        user_phone: form.phone,
        remake: form.remake,
        shop_id: 1,
        gmt_site_use: selectDate,
        site_detail: [],
      })
      console.log(seletSite.value)

      colNames.value.forEach((value: any) => {
        let tmpSite = { site_id: 0, time_enum: [] as any }
        seletSite.value.forEach((element: any) => {
          if (element.site_name == value) {
            tmpSite.site_id = element.site_id
            tmpSite.time_enum.push(element.time_enum)
          }
        })
        if (tmpSite.time_enum.length > 0) data.site_detail.push(tmpSite)
      })

      addOrder(data).then((res: any) => {
        if (res.data.code == 200) {
          ElMessage({
            type: 'success',
            message: '提交成功',
          })

          // 顺便模拟支付
          let order = res.data.data.order
          wxPay({ order_no: order })

          formEl.resetFields()
          updateData(selectDate.value)
        } else {
          ElMessage({
            type: 'error',
            message: '提交失败',
          })
        }
      })
    } else {
      // console.log('error submit!', fields)
    }
  })
}
</script>

<style lang="scss">
.legend {
  width: 100%;
  display: flex;
  margin: 20px 10px;
  grid-gap: 0.5rem;
  gap: 0.5rem;
}

.el-check-box {
  width: 90px;
  height: 48px;
  line-height: 35px;
  text-align: center;
}

.left-main {
  margin: 10px;
  width: 100%;

  .my_table {
    padding: 10px 0;
    height: 77vh;
    --el-table-border-color: '#FFFFFF' !important;
  }
}

.book_info {
  padding: 0 20px;
  .right-middle-show {
    padding: 10px 20px;
    border-radius: 10px;
    background-color: #eff3ff;
    line-height: 2rem;
    margin-bottom: 10px;
  }
}

.flex_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
