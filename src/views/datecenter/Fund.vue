<template>
  <div class="fund_main">
    <div class="store_box">
      <div class="store_head">
        <el-avatar
          shape="square"
          :size="180"
          :src="baseURL + '/' + store.avatar"
        />
        <div class="store_head_main hidden-xs-only">
          <p class="store_name">{{ store.name }}</p>
          <p class="store_tips">已使用奇羽SaaS运营366天</p>
          <div class="store_card">
            <div>
              <p class="card_text">总金额</p>
              <p class="card_value">7,425.75</p>
            </div>
            <div>
              <p class="card_text">结算中</p>
              <p class="card_value">7,425.75</p>
            </div>
            <div>
              <p class="card_text">可提现</p>
              <p class="card_value">7,425.75</p>
            </div>
            <el-button type="warning" @click="cash()">提现</el-button>
          </div>
        </div>
        <el-tag>运营中</el-tag>
      </div>
    </div>

    <div class="online_box">
      <div class="grid_box">
        <p class="fund_title">线上数据</p>
        <el-row :gutter="20">
          <el-col :span="6" v-for="(item, index) in testData1" :key="index"
            ><div class="grid_card">
              <div class="grid_head">
                <div>{{ item.text }}</div>
                <div>￥ {{ item.value }}</div>
              </div>
              <el-divider border-style="dashed" />
              <div><p class="grid_tips">昨日 ￥1200</p></div>
            </div></el-col
          >
        </el-row>
      </div>
    </div>
    <div class="bill_box">
      <p class="fund_title">账单流水</p>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column label="时间" width="180">
          <template #default="scope">
            <span>{{ formattedDate(scope.row.datetime) }}</span>
          </template>
        </el-table-column>

        <el-table-column label="关联单号">
          <template #default="scope">
            <span>{{ scope.row.order_id }}</span>
          </template>
        </el-table-column>

        <el-table-column label="分类" width="100">
          <template #default="scope">
            <span>{{ scope.row.group }}</span>
          </template>
        </el-table-column>

        <el-table-column label="类型" width="100">
          <template #default="scope">
            <el-tag>{{ scope.row.type }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="流水金额" width="180">
          <template #default="scope">
            <span>{{ scope.row.money }}</span>
          </template>
        </el-table-column>

        <el-table-column label="余额" width="180">
          <template #default="scope">
            <span>{{ scope.row.sum }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="el_page">
        <el-pagination
          v-model:current-page="currentPage4"
          v-model:page-size="pageSize4"
          :page-sizes="[20, 50, 100]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next"
          :total="3"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import 'element-plus/theme-chalk/display.css'
import { ElNotification } from 'element-plus'
import { getShopDetail } from '@/api/venue'
import { baseURL } from '@/config/request.ts'

const testData1 = [
  { text: '总订单额', value: 999 },
  { text: '总支付订单额', value: 999 },
  { text: '总退款订单额', value: 999 },
  { text: '总成交额', value: 999 },
  { text: '今日订单额', value: 999 },
  { text: '今日支付订单额', value: 999 },
  { text: '今日退款订单额', value: 999 },
  { text: '今日成交额', value: 999 },
]

interface Turnover {
  id: string
  datetime: Date
  order_id: string
  group: string
  type: string
  money: number
  sum: number // 余额
}

const store = ref({ name: '', avatar: '' })

const tableData: Turnover[] = [
  {
    id: '20230202026515665',
    datetime: new Date(2023, 11, 7, 0, 0, 0),
    order_id: '20230202026515665',
    group: '订单',
    type: '交易',
    money: 200,
    sum: -600, // 余额
  },
  {
    id: '2024020202651512312',
    datetime: new Date(2023, 11, 7, 0, 0, 0),
    order_id: '20230202026515665',
    group: '订单',
    type: '提现',
    money: -1000,
    sum: -800, // 余额
  },
  {
    id: '20230202026515665',
    datetime: new Date(2023, 11, 7, 0, 0, 0),
    order_id: '20230202026515665',
    group: '订单',
    type: '交易',
    money: 200,
    sum: 200, // 余额
  },
]

onMounted(() => {
  getShopDetail({ shop_id: 1 }).then((res: any) => {
    store.value.name = res.data.data.name
    store.value.avatar = res.data.data.avatar
  })
})

const cash = () => {
  ElNotification({
    title: '提示',
    message: '请绑定银行卡信息',
    type: 'info',
  })
}

// 查看详情
const handleEdit = (index: number, row: Turnover) => {
  // router.push('/order/order_detail')
  console.log(index, row)
  ElNotification({
    title: '暂无数据',
    message: '暂无数据',
    type: 'info',
  })
}

// 分页信息
const currentPage4 = ref(1)
const pageSize4 = ref(20)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}

function formattedDate(date: Date) {
  // 使用Date对象的toLocaleString方法进行格式化
  // 你可以根据需要选择不同的语言和格式选项
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
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

.store_box {
  border-radius: 12px;
  background-color: #ebeef4;
  margin-bottom: 20px;
  padding: 8px 12px;
  .store_head {
    display: flex;
    justify-content: space-between;
    .store_head_main {
      margin: 0 30px;
      width: 70%;
      .store_name {
        font-size: 32px;
        font-weight: bold;
        line-height: 64px;
      }
      .store_tips {
        font-size: 14px;
        color: #86909c;
        line-height: 30px;
      }
      .store_card {
        display: flex;
        justify-content: space-between;
        text-align: center;

        .card_text {
          line-height: 30px;
        }
        .card_value {
          line-height: 42px;
          font-size: 28px;
          font-weight: bold;
          color: #165dff;
        }
      }
    }
  }
}

.online_box {
  display: flex;
  justify-content: space-between;

  .grid_box {
    border-radius: 12px;
    background-color: #ebeef4;
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

      background: #f7f8fa;
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
}

.el_page {
  padding-top: 10px;
}
</style>
