<template>
  <ListviewContainer
    header-title="演示列表容器"
    :header-nav="[{ text: '菜单1', to: '/list' }, '菜单2']"
  >
    <Listview header-title="演示列表1" v-bind="lvConfig" />
    <OtherComponent header-title="其他组件" />
    <div header-title="html内容"><h1>html content</h1></div>
  </ListviewContainer>
</template>

<script setup lang="tsx">
import { shallowRef, defineComponent } from 'vue'

const OtherComponent = defineComponent({
  setup() {
    return () => <Listview filter-fields={[{ type: 'text' }]} />
  },
})

const lvConfig = shallowRef({
  requestUrl: './mock-list.json',
  requestMethod: 'get',
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
