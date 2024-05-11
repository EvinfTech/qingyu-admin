<template>
  <ContentWrap>
    <data-table
      :options="options"
      :query="query"
      ref="tableRef"
      :show-search="false"
    >
      <template #columns>
        <el-table-column type="index" width="50" />
        <el-table-column prop="user_avatar" label="头像">
          <template #default="scope">
            <el-avatar :size="30" :src="getUrl(scope.row.user_avatar)" />
          </template>
        </el-table-column>
        <el-table-column prop="user_name" label="用户名" />
        <el-table-column prop="content" label="反馈内容" />
        <el-table-column prop="photo" label="图片">
          <template #default="scope">
            <div v-if="scope.row.photo.length > 0">
              <el-image
                class="preview_img_box"
                style="width: 100px; height: 100px"
                :src="getUrl(scope.row.photo[0])"
                :zoom-rate="1.2"
                :max-scale="7"
                :min-scale="0.2"
                :preview-src-list="getSrcList(scope.row.photo)"
                :initial-index="0"
                fit="cover"
                :z-index="zIndex"
              />
              <!-- <span> 共{{ scope.row.photo.length }}张</span> -->
            </div>

            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column prop="gmt_create" label="创建时间" />
      </template>
    </data-table>
  </ContentWrap>
</template>

<script lang="ts" setup>
import { ContentWrap } from '@/components/ContentWrap'
import { DataTable } from '@/components/DataTable'
import { ref } from 'vue'
import type {
  OptionsType,
  TableQueryType,
} from '@/components/DataTable/src/types'
import { getFeedbackListAPI } from '@/api/user'
import { baseURL } from '@/config/request.ts'

// 表格查询参数
let query = ref<TableQueryType>({
  page: 1,
  size: 10,
  params: {},
})

const zIndex = ref(28888)

const getUrl = (url: string) => {
  return baseURL + '/' + url
}

const getSrcList = (url: Array<any>) => {
  return url.map((item: any) => {
    return baseURL + '/' + item
  })
}

// 表格默认参数
let options = ref<OptionsType>({
  listUrl: getFeedbackListAPI,
})

const tableRef = ref()
</script>

<style>
/* --el-table-index: 0 import; */
/* .preview_img_box {
  z-index: 20;
} */

/* .el-table {
  --el-table-index: 0;
} */
.el-table__cell {
  position: static !important;
}
</style>
