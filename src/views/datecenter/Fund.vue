<script setup lang="ts">
import { ref } from 'vue'
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

const tableData: Turnover[] = [
  {
    id: '20230202026515665',
    datetime: new Date(2023, 11, 7, 0, 0, 0),
    order_id: '20230202026515665',
    group: '订单',
    type: '交易',
    money: 200,
    sum: 10000, // 余额
  },
  {
    id: '20230202026515665',
    datetime: new Date(2023, 11, 7, 0, 0, 0),
    order_id: '20230202026515665',
    group: '订单',
    type: '交易',
    money: 200,
    sum: 10000, // 余额
  },
  {
    id: '20230202026515665',
    datetime: new Date(2023, 11, 7, 0, 0, 0),
    order_id: '20230202026515665',
    group: '订单',
    type: '交易',
    money: 200,
    sum: 10000, // 余额
  },
]

// 查看详情
const handleEdit = (index: number, row: Turnover) => {
  // router.push('/order_detail')
  console.log(index, row)
}

// 分页信息

const currentPage4 = ref(4)
const pageSize4 = ref(100)
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

<template>
  <div class="fund_main">
    <div class="store_box">
      <div class="store_head">
        <img src="@/assets/logo.png" />
        <div class="store_head_main">
          <p class="store_name">我的店铺名称</p>
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
            <el-button type="warning">提现</el-button>
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
          :page-sizes="[100, 200, 300, 400]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

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
      width: 100%;
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

.bill_box {
}
</style>
