<script setup lang="ts">
import OrderChart from '@/views/chart/orderChart.vue'
import AreaChart from '@/views/chart/areaChart.vue'
import PieChart from '@/views/chart/pieChart.vue'

const testData1 = [
  {
    text: '今日营收',
    value: 3600,
    oldValue: 1800,
    dValue: 1800,
    percentage: 50,
  },
  {
    text: '今日订单总额',
    value: 1000,
    oldValue: 2000,
    dValue: -1000,
    percentage: -50,
  },
  { text: '今日场时', value: 60, oldValue: 30, dValue: 30, percentage: 100 },
  { text: '场时均价', value: 60, oldValue: 30, dValue: 30, percentage: 100 },
]
</script>

<template>
  <div class="business_main">
    <div class="business_grid">
      <el-row :gutter="10">
        <el-col :span="6" v-for="(item, index) in testData1" :key="index"
          ><div class="grid_card">
            <div class="grid_head">
              <div>{{ item.text }}</div>
              <div>￥ {{ item.value }}</div>
            </div>
            <el-divider border-style="dashed" />
            <div>
              <p class="grid_tips">昨日 ￥{{ item.oldValue }}</p>
            </div>
          </div></el-col
        >
      </el-row>
    </div>
    <div class="business_chart">
      <OrderChart></OrderChart>
    </div>

    <div class="business_chart2">
      <el-row :gutter="10">
        <el-col :span="12">
          <div class="business_chart">
            <AreaChart></AreaChart></div
        ></el-col>
        <el-col :span="12">
          <div class="business_chart">
            <PieChart></PieChart></div
        ></el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped>
.business_main {
  padding: 20px;
  background-color: #f6f8fa;
}

.business_grid {
  border-radius: 12px;
  /* background-color: #ebeef4; */
  background-color: #f6f8fa;
  font-size: 14px;

  width: 100%;
  /* padding: 8px 12px; */
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
