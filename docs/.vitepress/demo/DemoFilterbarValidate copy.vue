<template>
  <Listview v-bind="lvConfig" />
</template>

<script setup lang="tsx">
import { shallowRef } from 'vue'

const lvConfig = shallowRef({
  requestUrl: '/mock-list.json',
  autoload: false,
  filterFields: [{ type: 'text', model: 'title', label: '标题' }],
  tableColumns: [
    { label: 'id', prop: 'id', width: 120 },
    { label: 'name', prop: 'name' },
  ],
  contentMessage: {
    type: 'info',
    text: '初次打开页面不加载数据，请组合条件进行搜索。',
  },
  transformRequestData(requestData) {
    if (!requestData.title) {
      alert('请填写标题')
      return false
    }
  },
})
</script>
