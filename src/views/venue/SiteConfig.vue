<template>
  <div class="site_main">
    <div>
      <el-button type="primary" :icon="Plus">新增场地</el-button>
      <el-button type="primary" :icon="Plus">新增时间段</el-button>
    </div>
    <div class="hr"></div>

    <el-table :data="tableData" stripe style="width: 100%" border >
      <el-table-column prop="id" label="场地id" width="180" />
      <el-table-column prop="name" label="场地名称" width="180" />
      <el-table-column prop="date" label="可预约时间" width="180" />
      <el-table-column prop="date" label="可预约时间" width="180" />
      <el-table-column prop="free_price" label="闲时价格" width="180" />
      <el-table-column prop="busy_price" label="忙时价格" width="180" />
      <el-table-column prop="status" label="状态" width="180" />
      <el-table-column prop="weekend_busy" label="周末是否为忙时" width="180" />
      <el-table-column prop="holiday_busy" label="假期是否为忙时" width="180" />
      <el-table-column prop="data_busy" label="特殊忙时日期"  />
      <el-table-column label="操作" width="120">
        <el-button>查看\编辑</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import { Plus, Delete } from '@element-plus/icons-vue'
import {saasGetSiteList} from "@/api/venue";
import {useEnumStore} from "@/stores/enum.ts";



const tableData =ref<any[]>([])
const TimeEnum = useEnumStore()
onMounted(() =>{
  saasGetSiteList({"shop_id":1}).then((res) =>{
    tableData.value = res.data.data
    console.log("表数据",tableData.value)
  })
  console.log("枚举数据",TimeEnum.Enum.time_enum[8])
})

</script>

<style scoped lang="scss">
.site_main {
  padding: 10px 30px;
  .hr{
    margin-top: 10px;
    margin-bottom: 10px;
    height: 3px;
    width: 100%;
    background-color: #8c939d;
  }
}
</style>
