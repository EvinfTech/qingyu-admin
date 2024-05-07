<template>
  <div class="business_main">
    <div class="business_grid">
      <el-row :gutter="10">
        <el-col :span="6" v-for="(item, index) in testData1" :key="index"
          ><div class="grid_card">
            <div class="grid_head">
              <div>{{ item.text }}</div>
              <div>{{ item.value }}</div>
            </div>
          </div></el-col
        >
      </el-row>
    </div>
    <div class="business_chart">
      <OrderChart :data="siteMoney"></OrderChart>
    </div>

    <div>
      <el-row :gutter="10">
        <el-col :sm="12" :xs="24">
          <div class="business_chart">
            <AreaChart :data="siteCount"></AreaChart></div
        ></el-col>
        <el-col :sm="12" :xs="0">
          <div class="business_chart">
            <PieChart :data="lineCount"></PieChart></div
        ></el-col>
      </el-row>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import OrderChart from '@/views/home/chart/orderChart.vue'
import AreaChart from '@/views/home/chart/areaChart.vue'
import PieChart from '@/views/home/chart/pieChart.vue'
import { getOperationalData } from '@/api/shop'

const siteMoney = ref([])
const siteCount = ref([])
const lineCount = ref([] as any)

onBeforeMount(() => {
  getData()
})

const getData = async () => {
  getOperationalData({}).then((res: any) => {
    let data = res.data.data
    testData1.value[0].value = '￥ ' + data.today_money
    testData1.value[1].value = data.today_order_count
    testData1.value[2].value = data.today_site_user_count
    testData1.value[3].value = '￥ ' + data.today_site_average_price

    siteMoney.value = data.week_site_money

    siteCount.value = data.week_site_count

    lineCount.value = []
    lineCount.value.push(data.offline_count)
    lineCount.value.push(data.on_line_count)
  })
}

const testData1 = ref([
  { text: '今日营收', value: '' },
  { text: '今日订单', value: 0 },
  { text: '今日场地数量', value: 0 },
  { text: '今日场时均价', value: '' },
])
</script>

<style scoped>
.business_main {
  padding: 20px;
  background-color: #f6f8fa;
}

.business_grid {
  border-radius: 12px;
  background-color: #f6f8fa;
  font-size: 14px;

  width: 100%;
  .grid_card {
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 8px 12px;
    margin-bottom: 10px;
    gap: 8px;
    flex-grow: 1;
    align-self: stretch;

    background: #ffffff;
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

.business_chart {
  margin-top: 10px;

  border-radius: 6px;
  background-color: #fff;
  width: 100%;
  height: 400px;
}

.business_chart2 {
  background-color: #f6f8fa;
  margin-top: 10px;
  /* border-radius: 6px; */
  width: 100%;
  height: 400px;
}
</style>
@/api/shop
