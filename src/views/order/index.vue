<template>
  <ContentWrap>
    <data-table :options="options" :query="query" ref="tableRef">
      <template #search>
        <el-input
          class="filter-item"
          clearable
          v-model="query.params['user_name']"
          placeholder="搜索用户名称"
        />
      </template>

      <template #columns>
        <el-table-column type="index" width="50" />
        <el-table-column prop="order_no" label="订单号" width="260px" />
        <el-table-column prop="user_name" label="用户名" />
        <el-table-column prop="type" label="类型">
          <template #default="scope">
            {{ getTypeText(scope.row.type) }}
          </template>
        </el-table-column>
        <el-table-column prop="money" label="金额">
          <template #default="scope">
            {{ (scope.row.money / 100).toFixed(2) }}
          </template>
        </el-table-column>

        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-tag size="small" :type="statusEnum[scope.row.status]?.type">{{
              statusEnum[scope.row.status]?.text
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="gmt_create" label="创建日期" />
        <el-table-column prop="user_phone" label="下单手机号" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column label="操作" width="180px">
          <template #default="scope">
            <el-button
              v-if="scope.row.status == 'Y' || scope.row.status == 'N'"
              :type="statusEnum[scope.row.status].type"
              size="small"
              @click="showCheck(scope.row, scope.row.status)"
              >{{ statusEnum[scope.row.status].tip }}
            </el-button>

            <el-button size="small" @click="showDetail(scope.row)"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </template>
    </data-table>
  </ContentWrap>
  <el-dialog v-model="dialogFormVisible" title="订单详情">
    <OrderDetail :order="orderInfo" @onUpdate="onUpdateList"></OrderDetail>
  </el-dialog>

  <el-dialog v-model="dlgCheckVisible" title="订单核验">
    <div class="check_box">
      <div class="flex">
        <span>订单编号</span>
        <el-input v-model="orderId" disabled />
      </div>
      <div class="flex">
        <span>校验码</span>
        <el-input v-model="checkCode" placeholder="输入校验码" />
      </div>
      <el-button type="primary" @click="check()">校验</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ContentWrap } from '@/components/ContentWrap'
import { DataTable } from '@/components/DataTable'
import OrderDetail from '@/views/order/OrderDetail.vue'
import { ref } from 'vue'
import type {
  OptionsType,
  TableQueryType,
} from '@/components/DataTable/src/types'

import { checkOrder, wxPay, getOrderListAPI } from '@/api/order'
import { ElMessage } from 'element-plus'
import { statusEnum } from '@/stores/enum'

let dialogFormVisible = ref<boolean>(false)
let dlgCheckVisible = ref<boolean>(false)

let checkCode = ref<string>('')
let orderId = ref<string>('')

// 表格查询参数
let query = ref<TableQueryType>({
  page: 1,
  size: 10,
  params: {
    shop_id: 1,
  },
})

let orderInfo = ref({} as any)
// 表格默认参数
let options = ref<OptionsType>({
  listUrl: getOrderListAPI,
  add: { enable: false },
  edit: { enable: false },
  del: { enable: false },
})

const tableRef = ref()

const getTypeText = (index: number) => {
  if (index == 1) return '线上'
  else if (index == 10) return '线下'
  else '其他'
}

// 查看详情
const showDetail = (row: any) => {
  orderInfo.value = row
  dialogFormVisible.value = true
}

const onUpdateList = () => {
  dialogFormVisible.value = false
  tableRef.value.reload()
}

const showCheck = (row: any, status: string) => {
  if (status == 'Y') {
    orderId.value = row.order_no
    checkCode.value = ''
    dlgCheckVisible.value = true
    // ElMessage({
    //   message: '订单已核验，请勿重复核验',
    //   type: 'error',
    // })
    // return
  }
  if (status == 'N') {
    wxPay({ order_no: row.order_no }).then((res: any) => {
      if (res.data.code == '200') {
        ElMessage({
          message: '订单支付成功',
          type: 'success',
        })
        tableRef.value.reload()
      } else {
        ElMessage({
          message: '订单支付失败',
          type: 'error',
        })
      }
    })
    return
  }
}

const check = () => {
  console.log(checkCode.value)
  checkOrder({ order_no: orderId.value, check_no: checkCode.value }).then(
    (res: any) => {
      if (res.data.msg == '核验成功') {
        ElMessage({
          message: '校验成功',
          type: 'success',
        })
        tableRef.value.reload()
        dlgCheckVisible.value = false
      } else {
        ElMessage({
          message: res.data.msg,
          type: 'error',
        })
      }
    }
  )
}
</script>

<style scoped>
.check_box {
  text-align: center;
  .flex {
    display: flex;
    margin-bottom: 20px;
    align-items: center;
    span {
      width: 100px;
    }
  }
}
</style>
