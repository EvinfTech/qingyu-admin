<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import * as echarts from 'echarts'

type EChartsOption = echarts.EChartsOption

var chartDom
var myChart: any
var option: EChartsOption

const props = defineProps({
  data: {
    type: Object,
  },
})

const xData = ref([])
const yData = ref([])
const siteList = ref([])

watch(
  () => props.data,
  () => {
    dealData()
  }
)

option = {
  title: { text: '场地收入' },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'line', // 'shadow' as default; can also be 'line' or 'shadow'
    },
  },
  legend: {
    top: '30',
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '10%',
    top: '30%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: xData.value,
  },
  yAxis: {
    type: 'value',
  },
  series: yData.value,
}

// 为窗口大小变化添加事件监听器
window.addEventListener('resize', function () {
  myChart.resize()
})

onMounted(() => {
  chartDom = document.getElementById('main')!
  myChart = echarts.init(chartDom)
  option && myChart.setOption(option)
})

const dealData = () => {
  xData.value = []
  yData.value = []
  Object.keys(props.data as any).forEach((key) => {
    xData.value.push(key as never)

    let tmp = (props.data as any)[key]
    Object.keys(tmp).forEach((k) => {
      siteList.value.push(k as never)
    })
  })
  const uniqueArr = Array.from(new Set(siteList.value))

  for (let i = 0; i < uniqueArr.length; i++) {
    let data = [] as any
    Object.keys(props.data as any).forEach((key) => {
      data.push(((props.data as any)[key][uniqueArr[i]] / 100) as never)
    })
    data.push()
    yData.value.push({
      name: uniqueArr[i],
      type: 'bar',
      stack: 'total',
      label: {
        show: false,
      },
      emphasis: {
        focus: 'series',
      },
      data: data,
    } as never)
  }

  myChart.setOption(
    (option = {
      xAxis: {
        type: 'category',
        data: xData.value,
      },
      series: yData.value,
    })
  )
}
</script>
<template>
  <div id="main" class="main"></div>
</template>

<style scoped>
.main {
  height: 400px;
}
</style>
