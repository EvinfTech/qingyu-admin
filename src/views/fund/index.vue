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
            <div><p class="grid_tips">昨日 --</p></div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="bill_box">
      <p class="flex-box-space-between">
        <span class="fund_title">账单流水</span>
        <el-button type="warning" @click="cash()">全部提现</el-button>
      </p>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" width="50" />

        <el-table-column label="时间">
          <template #default="scope">
            <span>{{ scope.row.time }}</span>
          </template>
        </el-table-column>

        <el-table-column label="关联单号">
          <template #default="scope">
            <span>{{ scope.row.transaction_serial_no }}</span>
          </template>
        </el-table-column>

        <el-table-column label="类型">
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
      </el-table>
      <div class="el_page">
        <el-pagination
          v-model:current-page="currentPage4"
          v-model:page-size="pageSize4"
          :page-sizes="[10, 20, 50]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next"
          :total="dataTotal"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getShopCapital, getBillList, withdrawal } from '@/api/shop'
import { formatMoney } from '@/utils/money'

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

const tableData = ref([])

onMounted(() => {
  updateInfo()
  updateTable()
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

const updateTable = () => {
  getBillList({
    shop_id: 1,
    page: currentPage4.value,
    size: pageSize4.value,
  }).then((res: any) => {
    tableData.value = []
    tableData.value = res.data.data.list
    dataTotal.value = res.data.data.total
    console.log('aaa', res.data.data.list)
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
        updateTable()
      }
    })
  })
}

// 分页信息
const currentPage4 = ref(1)
const pageSize4 = ref(20)
const dataTotal = ref(0)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = () => {
  updateTable()
}
const handleCurrentChange = () => {
  updateTable()
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
@/api/shop
