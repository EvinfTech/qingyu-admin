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
        <el-table-column type="selection" width="50px" />
        <el-table-column prop="order_no" label="订单号" size="mini" />
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
            {{ getStatusText(scope.row.status) }}
          </template>
        </el-table-column>
        <el-table-column prop="gmt_create" label="创建日期" />
        <el-table-column prop="user_phone" label="下单手机号" />
        <el-table-column prop="remake" label="备注" />
        <el-table-column label="操作" width="180px" :align="'center'">
          <template #default="scope">
            <el-button
              icon="Setting"
              type="primary"
              size="small"
              @click="showDetail(scope.row)"
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

let dialogFormVisible = ref<boolean>(false)
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
  listUrl: '/saas/get/order/list',
  add: {
    enable: false,
    // permission: ['role:add'],
  },
  edit: {
    enable: false,
    // permission: ['role:edit'],
  },
  del: {
    enable: false,
    // permission: ['role:delete'],
  },
})

const tableRef = ref()

const getStatusText = (index: string) => {
  // Y:已支付 N:待支付 c:已取消
  if (index == 'Y') return '已支付'
  else if (index == 'N') return '待支付'
  else if (index == 'C') return '已取消'
  else return '未知'
}

const getTypeText = (index: number) => {
  if (index == 1) return '线上'
  else if (index == 10) return '线下'
  else '其他'
}

// 查看详情
const showDetail = (row: any) => {
  orderInfo.value = row
  console.log(orderInfo.value)

  dialogFormVisible.value = true
}

const onUpdateList = () => {
  dialogFormVisible.value = false
  tableRef.value.reload()
}
</script>
