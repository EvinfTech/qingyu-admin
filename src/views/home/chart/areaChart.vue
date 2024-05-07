<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
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
  color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
  title: {
    text: '到店流量',
    top: '10',
    left: '10',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985',
      },
    },
  },
  legend: {
    data: siteList.value,
    top: '10',
  },
  grid: {
    left: '3%',
    right: '4%',
    top: '25%',
    bottom: '15%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: xData.value,
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [],
}
// 为窗口大小变化添加事件监听器
window.addEventListener('resize', function () {
  myChart.resize()
})

onMounted(() => {
  chartDom = document.getElementById('main2')!
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
      data.push((props.data as any)[key][uniqueArr[i]] as never)
    })
    data.push()
    yData.value.push({
      name: uniqueArr[i],
      type: 'line',
      stack: 'Total',
      areaStyle: {},
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
      legend: {
        data: siteList.value,
        top: '360',
      },
      series: yData.value,
    })
  )
}
</script>

<template>
  <div id="main2" class="main"></div>
</template>

<style scoped>
.main {
  height: 400px;
}
</style>
