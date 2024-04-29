<script setup lang="ts">
import { onMounted } from 'vue'
import * as echarts from 'echarts'

type EChartsOption = echarts.EChartsOption

var chartDom
var myChart: any
var option: EChartsOption

option = {
  title: {
    text: '订票来源占比',
    left: 'center',
    top: '10',
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    // left: 'left',
    left: '10',
    top: '10',
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',

      data: [
        { value: 1048, name: '线上预定' },
        { value: 735, name: '电话预定' },
        { value: 580, name: '线下预定' },
        { value: 484, name: '其他' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
}

// 为窗口大小变化添加事件监听器
window.addEventListener('resize', function () {
  myChart.resize()
})

onMounted(() => {
  chartDom = document.getElementById('main3')!
  myChart = echarts.init(chartDom)
  option && myChart.setOption(option)
})
</script>

<template>
  <div id="main3" class="main"></div>
</template>

<style scoped>
.main {
  height: 400px;
}
</style>
