<template>
  <div class="fund_main">
    <div class="grid_box">
      <p class="fund_title">线上数据</p>
      <el-row :gutter="20">
        <el-col :span="6" v-for="(item, index) in testData1" :key="index"
          ><div class="grid_card">
            <div class="grid_head">
              <div>{{ item.text }}</div>
              <div>{{ item.value }}</div>
            </div>
            <el-divider border-style="dashed" />
            <!-- <div><p class="grid_tips">昨日 --</p></div> -->
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="bill_box">
      <p class="flex-box-space-between">
        <span class="fund_title">账单流水</span>
        <el-button type="warning" @click="cash()">全部提现</el-button>
      </p>
    </div>

    <data-table
      :options="options"
      :query="query"
      ref="tableRef"
      :show-search="false"
    >
      <template #columns>
        <el-table-column type="index" width="50" />
        <el-table-column prop="transaction_serial_no" label="关联单号" />
        <el-table-column prop="content" label="类型">
          <template #default="scope">
            <el-tag v-if="scope.row.type == 'T'" type="warning">提现</el-tag>
            <el-tag v-else>结算</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="流水金额">
          <template #default="scope">
            <span>{{ formatMoney(scope.row.money) }}</span>
          </template>
        </el-table-column>

        <el-table-column label="余额">
          <template #default="scope">
            <span>{{ formatMoney(scope.row.balance) }}</span>
          </template>
        </el-table-column>
      </template>
    </data-table>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getShopCapital, getBillListAPI, withdrawal } from '@/api/shop'
import { formatMoney } from '@/utils/money'
import type {
  OptionsType,
  TableQueryType,
} from '@/components/DataTable/src/types'
import { DataTable } from '@/components/DataTable'

const testData1 = ref([
  { text: '总订单额', value: '' },
  { text: '总支付订单额', value: '999' },
  { text: '总退款订单额', value: '999' },
  { text: '总成交额', value: '999' },
  { text: '今日订单额', value: '999' },
  { text: '今日支付订单额', value: '999' },
  { text: '今日退款订单额', value: '999' },
  { text: '今日成交额', value: '999' },
])

const data2 = ref([
  { text: '净收入', value: '0' },
  { text: '总订单额', value: '0' },
  { text: '可提现', value: '0' },
])

const withdrawalMoeny = ref(0)

// 表格查询参数
let query = ref<TableQueryType>({
  page: 1,
  size: 10,
  params: {},
})

// 表格默认参数
let options = ref<OptionsType>({
  listUrl: getBillListAPI,
})

const tableRef = ref()

onMounted(() => {
  updateInfo()
})

const updateInfo = () => {
  getShopCapital({ shop_id: 1 }).then((res: any) => {
    console.log(res.data.data)
    let tmpData = res.data.data
    testData1.value[0].value = formatMoney(tmpData.aggregate_order_money)
    testData1.value[1].value = formatMoney(tmpData.aggregate_order_pay_money)
    testData1.value[2].value = formatMoney(tmpData.aggregate_order_refund_money)
    testData1.value[3].value = formatMoney(
      tmpData.aggregate_volume_of_transaction
    )
    testData1.value[4].value = formatMoney(tmpData.today_order_money)
    testData1.value[5].value = formatMoney(tmpData.today_order_pay_money)
    testData1.value[6].value = formatMoney(tmpData.today_order_refund_money)
    testData1.value[7].value = formatMoney(tmpData.today_volume_of_transaction)

    data2.value[0].value = formatMoney(tmpData.aggregate_amount)
    data2.value[1].value = formatMoney(tmpData.aggregate_order_money)
    data2.value[2].value = formatMoney(tmpData.balance)

    withdrawalMoeny.value = tmpData.balance
  })
}

const cash = () => {
  ElMessageBox.confirm('确认要全部提现吗?', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    withdrawal({ money: withdrawalMoeny.value }).then((res: any) => {
      if (res.data.code == 200) {
        ElMessage({
          showClose: true,
          message: '取消成功！',
          type: 'success',
        })
        updateInfo()
        tableRef.value.refresh()
      }
    })
  })
}
</script>

<style scoped>
p {
  margin: 0;
}
.el-divider--horizontal {
  margin: 0;
}
.fund_main {
  padding: 20px;
  .fund_title {
    font-size: 16px;
    font-weight: bold;
    line-height: 24px;
    margin: 16px 0;
  }
}

.el_page {
  padding-top: 10px;
}

.grid_box {
  border-radius: 12px;
  background-color: #f8f8ff;
  font-size: 14px;

  width: 100%;
  padding: 8px 12px;
  .grid_card {
    /* width: 700px; */
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 8px 12px;
    margin-bottom: 10px;
    gap: 8px;
    flex-grow: 1;
    align-self: stretch;

    background: #fff;
    .grid_head {
      display: flex;
      justify-content: space-between;
    }
    .grid_tips {
      font-size: 12px;
      color: #86909c;
    }
  }
}
</style>
