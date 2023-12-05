<script setup lang="ts">
import { onMounted } from 'vue'
import * as echarts from 'echarts'

type EChartsOption = echarts.EChartsOption

var chartDom
var myChart
var option: EChartsOption

option = {
  title: {
    text: 'Referer of a Website',
    subtext: 'Fake Data',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' },
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
