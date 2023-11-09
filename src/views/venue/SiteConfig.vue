<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Delete } from '@element-plus/icons-vue'

const site_list = [
  '时间/场地',
  '1号场',
  '2号场',
  '3号场',
  '4号场',
  '5号场',
  '6号场',
]

interface User {
  date: string
  name: string
  address: string
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<User[]>([])
const toggleSelection = (rows?: User[]) => {
  if (rows) {
    rows.forEach((row) => {
      // TODO: improvement typing when refactor table
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      multipleTableRef.value!.toggleRowSelection(row, undefined)
    })
  } else {
    multipleTableRef.value!.clearSelection()
  }
}
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
}

const tableData: User[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>

<template>
  <div class="site_main">
    <div>
      <el-button type="primary" :icon="Plus">新增场地</el-button>
      <el-button type="primary" :icon="Plus">新增时间段</el-button>
    </div>

    <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column
        v-for="item in site_list"
        :key="item"
        :label="item"
        width="120"
      >
        <template #default="scope">￥80</template>
        <!-- <template #default="scope">{{ scope.row.date }}</template> -->
      </el-table-column>
    </el-table>
    <el-button type="primary" :icon="Delete">删除选中项</el-button>
  </div>
</template>

<style scoped>
.site_main {
  padding: 10px 30px;
}
</style>
