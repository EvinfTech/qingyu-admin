<template>
  <div class="detail_main">
    <el-descriptions class="margin-top" :column="2" :size="size" border>
      <el-descriptions-item v-for="item in showData" :span="item.span">
        <template #label>
          <div class="cell-item">
            <!-- <el-icon :style="iconStyle">
              <user />
            </el-icon> -->
            {{ item.title }}
          </div>
        </template>
        {{ item.value }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <tickets />
            </el-icon>
            订单状态
          </div>
        </template>
        <el-tag size="small">{{
          order.status == 'N'
            ? '待支付'
            : order.status == 'Y'
            ? '已支付'
            : '已取消'
        }}</el-tag>
      </el-descriptions-item>

      <el-descriptions-item v-if="order.status != 'C'">
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <tickets />
            </el-icon>
            操作
          </div>
        </template>
        <el-button type="warning" @click="cancel">取消订单</el-button>
      </el-descriptions-item>
    </el-descriptions>

    <div class="detail_detail">
      <p>商品明细</p>

      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="index" width="50" />
          <el-table-column label="场地" width="150">
            <template #default="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column label="时间">
            <template #default="scope">
              <span>{{ scope.row.time }}</span>
            </template>
          </el-table-column>

          <el-table-column label="价格" width="180">
            <template #default="scope">
              <span>￥{{ (scope.row.price / 100).toFixed(2) }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <p class="detail_all">
        订单总计：<span class="detail_price"
          >￥{{ (order.money / 100).toFixed(2) }}</span
        >
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { ComponentSize } from 'element-plus'
import { useEnumStore } from '@/stores/enum.ts'
import { cancelOrder } from '@/api/order'
import { ElMessageBox, ElMessage } from 'element-plus'
const props = defineProps({
  order: {
    type: Object as any,
    default: () => ({}),
  },
})

const timeEnums = useEnumStore().Enum.time_enum // 时间枚举
const size = ref<ComponentSize>('default')
const iconStyle = computed(() => {
  const marginMap = {
    large: '8px',
    default: '6px',
    small: '4px',
  } as any
  return {
    marginRight: marginMap[size.value] || marginMap.default,
  }
})

let order = ref({} as any)
const showData = ref({} as any)
const tableData = ref([{} as Goods])

interface Goods {
  id: string
  name: string
  time: string
  price: number
}

const emit = defineEmits(['onUpdate'])

watch(
  () => props.order,
  (val) => {
    order.value = val
    updateShowData()
  }
)

onMounted(() => {
  order.value = props.order
  updateShowData()
})

const updateShowData = () => {
  showData.value = [
    { title: '订单号', value: order.value.order_no, icon: '', span: 2 },
    { title: '预定人', value: order.value.user_name, icon: '', span: 1 },
    {
      title: '订单来源',
      value: order.value.type == 1 ? '线上' : '线下',
      icon: '',
      span: 1,
    },
    // { title: '订单状态', value: order.value.state, icon: '', span: 1 },
    { title: '下单时间', value: order.value.gmt_create, icon: '', span: 1 },
    { title: '截止时间', value: order.value.end_time, icon: '', span: 1 },
    {
      title: '应付金额',
      value: (order.value.money / 100).toFixed(2),
      icon: '',
      span: 1,
    },
  ]

  tableData.value = []
  for (let i = 0; i < order.value.SiteDetail.length; i++) {
    let tmp = order.value.SiteDetail[i]
    tableData.value.push({
      id: tmp.site_id,
      name: tmp.site_name,
      time: setTime(tmp.time_enum),
      price: tmp.money,
    })
  }
}

const cancel = () => {
  ElMessageBox.confirm('确认要取消订单吗?', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    cancelOrder({ order_no: order.value.order_no }).then((res: any) => {
      if (res.data.code == 200) {
        ElMessage({
          showClose: true,
          message: '取消成功！',
          type: 'success',
        })
        emit('onUpdate')
      }
    })
  })
}

const setTime = (data: any) => {
  let timeStr = ''
  data.forEach((item: any) => {
    timeStr += timeEnums[item] + ','
  })
  timeStr = timeStr.substring(0, timeStr.length - 1)
  return timeStr
}
</script>
<style scoped>
.detail_main {
  margin: 20px;
  .detail_title span {
    margin-right: 20px;
  }

  .detail_info {
    background: #f6f8fa;
    padding: 0 50px;
    display: flex;
    /* align-items: center; */
    justify-content: space-between;
    .detail_info_box p {
      color: #b1b4c3;
      font-size: 14px;
      line-height: 14px;
    }
  }

  .detail_detail {
    padding: 30px 0;
    .detail_all {
      float: right;
      .detail_price {
        font-size: 24;
        color: #f44336;
      }
    }
  }
}
</style>
