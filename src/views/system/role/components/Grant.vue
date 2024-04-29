<template>
  <el-dialog
    v-model="dialogVisible"
    title="角色授权"
    width="50%"
    :before-close="handleClose"
  >
    <ContentWrap v-loading="loading">
      <el-tree
        ref="treeRef"
        :data="treeData"
        :default-checked-keys="grantMenus"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :props="{ class: nodeClass, label: 'name' }"
      />
    </ContentWrap>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSave" :loading="saving"
          >保存</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ContentWrap } from '@/components/ContentWrap'
import { ref, watch, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { updateMenuRole, getMenuByRoleId } from '@/api/sys/role'
import { getMenuList } from '@/api/sys/menu'
import { ElTree } from 'element-plus'

const treeRef = ref<InstanceType<typeof ElTree>>()

const dialogVisible = ref(false)

// 组件参数
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  roleId: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['update:modelValue'])

// 监听数据变化
watch(
  () => props.roleId,
  (val) => {
    if (!val) return
    loadData()
  }
)

// 监听数据变化
watch(
  () => props.modelValue,
  (val) => {
    dialogVisible.value = val
  }
)

const loading = ref(false)
const saving = ref(false)
const treeData = ref([])
const grantMenus = ref([] as any)

const transListDataToTreeData = (list: any, root: any) => {
  const arr: any = []
  // 1.遍历
  console.log('便利', list)
  list.forEach((item: any) => {
    // 2.首次传入空字符串  判断list的pid是否为空 如果为空就是一级节点
    if (item.pid === root) {
      // 找到之后就要去找item下面有没有子节点  以 item.id 作为 父 id, 接着往下找
      const children = transListDataToTreeData(list, item.id)
      if (children.length > 0) {
        // 如果children的长度大于0,说明找到了子节点
        item.children = children
      }
      // 将item项, 追加到arr数组中
      arr.push(item)
    }
  })
  return arr
}

// 加载数据
const loadData = async () => {
  // loading.value = true

  // 清空选定数据
  grantMenus.value = []

  // 等待查询完整的树结构
  await getMenuList().then((res: any) => {
    treeData.value = transListDataToTreeData(res.data.data, 0)
  })

  // 填充已经授权的菜单
  await getMenuByRoleId({ role_id: props.roleId }).then((res: any) => {
    grantMenus.value = []
    if (res.data.data) {
      for (var i = 0; i < res.data.data.length; i++) {
        grantMenus.value.push(res.data.data[i].menu_id)
      }
      console.log('授权', grantMenus.value)
    }
  })

  // await listMenuApi({ id: props.roleId }).then((res) => {
  //   grantMenus.value = res.data
  // })

  loading.value = false
}

const handleClose = () => {
  dialogVisible.value = false
  emit('update:modelValue', false)
}

// 保存授权
const handleSave = () => {
  saving.value = true

  const meunIds = treeRef.value!.getCheckedKeys(false)

  updateMenuRole({ role_id: props.roleId, menu_ids: meunIds }).then(() => {
    ElMessage({
      showClose: true,
      message: '授权保存成功！',
      type: 'success',
    })

    saving.value = false

    // 关闭窗口
    handleClose()
  })
}

const nodeClass = (data: any) => {
  if (data.menuType === 2 && data.children && data.children.length > 0) {
    return 'is-menu'
  }
  return ''
}

// 加载第一页数据
onMounted(() => {
  // 首次加载数据
  loadData()
})
</script>

<style scoped>
/* 菜单加粗 */
:deep(.is-menu > .el-tree-node__content) {
  font-weight: 700;
}

/* 功能外边框布局 */
:deep(.el-tree-node.is-expanded.is-menu > .el-tree-node__children) {
  display: flex;
  border: #eee 1px solid;
  border-radius: 5px;
  padding: 5px;
}

/* 功能文字 */
:deep(.is-menu > .el-tree-node__children > div) {
  color: #888;
}
</style>
