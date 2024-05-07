<script setup lang="ts">
import { onMounted, watch } from 'vue'
import * as echarts from 'echarts'

type EChartsOption = echarts.EChartsOption

var chartDom
var myChart: any
var option: EChartsOption

const props = defineProps({
  data: {},
})

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
}

// 为窗口大小变化添加事件监听器
window.addEventListener('resize', function () {
  myChart.resize()
})

watch(
  () => props.data,
  () => {
    dealData()
  }
)

const dealData = () => {
  console.log(props.data)
  let offline = (props.data as any)[0]
  let online = (props.data as any)[1]

  option = {
    series: [
      {
        name: '订单来源',
        type: 'pie',
        radius: '50%',
        data: [
          { value: online, name: '线上预定' },
          { value: offline, name: '线下预定' },
          { value: 0, name: '其他' },
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
  myChart.setOption(option)
}

onMounted(() => {
  chartDom = document.getElementById('main3')!
  myChart = echarts.init(chartDom)
  option && myChart.setOption(option)
  dealData()
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
