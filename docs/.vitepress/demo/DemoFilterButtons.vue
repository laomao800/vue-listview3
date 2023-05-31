<template>
  <Listview v-model:selection="selection" v-bind="lvConfig" />
  <ElDialog title="Dialog" v-model="dialogVisible" width="30%" />
</template>

<script setup lang="tsx">
import { shallowRef, ref, unref } from 'vue'
import { ElDialog, ElButton } from 'element-plus'
import 'element-plus/theme-chalk/el-dialog.css'
import 'element-plus/theme-chalk/el-overlay.css'
import { Download } from '@element-plus/icons-vue'

const dialogVisible = ref(false)
const selection = shallowRef([])
const isExporting = ref(false)

const filterButtons = [
  {
    text: '添加',
    type: 'success',
    onClick: () => (dialogVisible.value = true),
  },
  {
    text: '查看选中数据',
    onClick: () => {
      if (unref(selection).length < 1) {
        alert('请至少选择一条数据')
      } else {
        alert(JSON.stringify(unref(selection)))
      }
    },
  },
  () => (
    <ElButton
      loading={isExporting.value}
      type="primary"
      icon={Download}
      onClick={handleExport}
    >
      导出
    </ElButton>
  ),
]

function handleExport() {
  console.log(isExporting)
  isExporting.value = true
  setTimeout(() => {
    alert('done')
    isExporting.value = false
  }, 500)
}

const lvConfig = shallowRef({
  requestUrl: './mock-list.json',
  requestMethod: 'get',
  filterButtons,
  filterFields: [{ type: 'text', model: 'name', label: '文本字段' }],
  tableColumns: [
    { label: 'id', prop: 'id', width: 100 },
    { label: 'name', prop: 'name' },
    { label: '负责人', prop: 'seller', width: 100 },
    { label: '修改人', prop: 'seller', width: 100 },
    { label: '修改时间', prop: 'date', width: 120 },
  ],
})
</script>
