<template>
  <div v-loading="loading" element-loading-text="加载中...">
    <div class="search-box">
      <div class="search-items">
        <slot name="search"></slot>
      </div>

      <el-button type="primary" icon="Search" @click="search">搜索</el-button>
      <el-button icon="RefreshLeft" @click="reset()">重置</el-button>
    </div>

    <el-table
      :data="records"
      :row-key="rowKey || 'id'"
      stripe
      style="width: 100%"
      @selection-change="selection"
      @select="rowSelect"
    >
      <slot name="columns"></slot>
    </el-table>

    <div class="paging-box">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next"
        :default-page-size="pageSize"
        :total="total"
        :current-page="current"
        :page-sizes="[10, 20, 50, 100]"
        @size-change="sizeChange"
        @current-change="currentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, toRefs, PropType, ref } from 'vue'
import { OptionsType, TableQueryType } from './types'
import request from '@/utils/request'

// 页面参数
const current = ref(1)
const records = ref([])
const total = ref(0)
const pageSize = ref(10)
const loading = ref(false)
const selectedIds = ref([] as any[])
const selectedRow = ref({} as any)

// 表格参数
const props = defineProps({
  options: {
    type: Object as PropType<OptionsType>,
    default: () => ({}),
  },
  query: {
    type: Object as PropType<TableQueryType>,
    default: () => ({
      current: 1,
      size: 10,
      params: {},
    }),
  },
})

// 事件定义
const emit = defineEmits(['onAdd', 'onEdit', 'onDelete', 'onBatch'])

// 解构参数便于处理
const { listUrl, rowKey } = toRefs(props.options)
const { query } = toRefs(props)

// 搜索数据
const search = () => {
  // 第一页
  query.value.page = 1
  // 加载数据
  loadData()
}

// 搜索数据
const reset = () => {
  // 清空值并搜索
  query.value.params = { shop_id: 1 }
  search()
}

// 选定数据
const selection = (rows: { id: string }[]) => {
  let ids = [] as any[]
  rows.forEach((row) => {
    ids.push(row.id)
  })

  // 赋值
  selectedIds.value = ids
}

// 最后选择的数据，用于编辑
const rowSelect = (row: any) => {
  selectedRow.value = row
}
// 刷新数据
const reload = () => {
  console.log('数据已重新加载..')
  loadData()
}

// 加载数据
const loadData = async () => {
  loading.value = true

  var mergedObj = Object.assign(
    {},
    { size: query.value.size, page: query.value.page },
    query.value.params
  )

  request
    .request<string[]>({
      url: listUrl.value,
      method: 'post',
      data: mergedObj,
    })
    .then((res: any) => {
      records.value = res.data.data.list
      total.value = res.data.data.total
      current.value = query.value.page
      loading.value = false
    })
}

// 修改每页数量
const sizeChange = (size: any) => {
  // 清空值并搜索
  query.value.page = 1
  query.value.size = size
  // 加载数据
  loadData()
}

const currentChange = (count: any) => {
  current.value = count
  query.value.page = count
  loadData()
}

// 加载第一页数据
onMounted(() => {
  // 首次加载数据
  loadData()
})

// 对外开放数据
defineExpose({
  reload,
})
</script>

<style scoped></style>
