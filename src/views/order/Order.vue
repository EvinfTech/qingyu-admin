<script setup lang="ts">
import { Timer } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'

const router = useRouter()

interface Order {
  id: string
  username: string
  type: string
  state: string
  money: number
  datetime: Date
  site_info: string
  info: string
  mark: string
}

// 查看详情
const handleEdit = (index: number, row: Order) => {
  router.push('/order_detail')
  console.log(index, row)
}
const handleDelete = (index: number, row: Order) => {
  console.log(index, row)
}

const order_id = ref('')
const order_user = ref('')
const order_time = ref('')
const order_source = ref('')
const order_state = ref('')

const source_options = [
  {
    value: '线上',
    label: '线上',
  },
  {
    value: '线下',
    label: '线下',
  },
]
const state_options = [
  {
    value: '待使用',
    label: '待使用',
  },
  {
    value: '已使用',
    label: '已使用',
  },
]
const defaultTime = ref<[Date, Date]>([
  new Date(2000, 1, 1, 0, 0, 0),
  new Date(2000, 2, 1, 23, 59, 59),
])

const tableData: Order[] = [
  {
    id: '20230202026515665',
    username: 'Tom',
    type: '线上',
    state: '待使用',
    money: 200,
    datetime: new Date(2023, 11, 7, 0, 0, 0),
    site_info: '2号场地',
    info: '张国志',
    mark: '交际草',
  },
  {
    id: '20230202026515665',
    username: 'Tom',
    type: '线上',
    state: '待使用',
    money: 200,
    datetime: new Date(2023, 11, 7, 0, 0, 0),
    site_info: '2号场地',
    info: '张国志',
    mark: '交际草',
  },
  {
    id: '20230202026515665',
    username: 'Tom',
    type: '线上',
    state: '待使用',
    money: 200,
    datetime: new Date(2023, 11, 7, 0, 0, 0),
    site_info: '2号场地',
    info: '张国志',
    mark: '交际草',
  },
]

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
</script>

<template>
  <div class="order_main">
    <div>
      <span>订单编号</span>
      <el-input
        v-model="order_id"
        class="w-50 m-2"
        placeholder="请输入订单编号"
      />

      <span>订单来源</span>
      <el-select v-model="order_source" class="m-2" placeholder="全部订单">
        <el-option
          v-for="item in source_options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <span>订单状态</span>
      <el-select v-model="order_state" class="m-2" placeholder="默认">
        <el-option
          v-for="item in state_options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <span>用户</span>
      <el-input
        v-model="order_user"
        class="w-50 m-2"
        placeholder="请输入用户名称"
      />

      <span>下单时间</span>
      <div class="date_block">
        <el-date-picker
          v-model="order_time"
          type="daterange"
          start-placeholder="起始时间"
          end-placeholder="结束时间"
          :default-time="defaultTime"
        />
      </div>

      <el-button type="primary" :icon="Search">查询</el-button>
    </div>
    <div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column label="订单编号" width="180">
          <template #default="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column label="用户" width="80">
          <template #default="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>

        <el-table-column label="订单分类" width="100">
          <template #default="scope">
            <span>{{ scope.row.type }}</span>
          </template>
        </el-table-column>

        <el-table-column label="订单状态" width="100">
          <template #default="scope">
            <el-tag>{{ scope.row.state }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="下单时间" width="180">
          <template #default="scope">
            <span>{{ formattedDate(scope.row.datetime) }}</span>
          </template>
        </el-table-column>

        <el-table-column label="场地信息" width="180">
          <template #default="scope">
            <span>{{ scope.row.site_info }}</span>
          </template>
        </el-table-column>

        <el-table-column label="预约信息" width="180">
          <template #default="scope">
            <span>{{ scope.row.info }}</span>
          </template>
        </el-table-column>

        <el-table-column label="备注" width="180">
          <template #default="scope">
            <span>{{ scope.row.mark }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >详情</el-button
            >
            <!-- <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button
            > -->
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
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}

.m-2 {
  width: 150px;
  margin: 0 20px 0 10px;
}
.date_block {
  display: inline-block;
  margin: 0 10px;
}
.order_main {
  margin: 30px;
}

.el_page {
  padding: 10px;
  float: right;
}
</style>
