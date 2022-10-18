<template>
  <Listview v-bind="lvConfig">
    <template v-if="viewType === 'thumb'" #content="{ state }">
      <div v-if="state.contentMessage.text">
        {{ state.contentMessage.text }}
      </div>
      <ul v-else class="thumb-view">
        <li v-for="(item, index) in state.contentData.items" :key="index">
          <div class="thumb"></div>
          <p class="id">{{ item.id }}</p>
          <p class="name">{{ item.name }}</p>
          <div class="action">
            <ElButton size="mini" type="success" plain>审核</ElButton>
            <ElButton size="mini" type="danger" plain>删除</ElButton>
          </div>
        </li>
      </ul>
    </template>
  </Listview>
</template>

<script setup lang="tsx">
import { ref, shallowRef } from 'vue'
import 'element-plus/theme-chalk/el-switch.css'
import { ElSwitch, ElButton } from 'element-plus'

const viewType = ref('thumb')

const lvConfig = shallowRef({
  requestUrl: '/mock-list.json',
  filterButtons: [
    () => (
      <ElSwitch
        model-value={viewType.value}
        active-value="table"
        active-text="table"
        inactive-value="thumb"
        inactive-text="thumb"
        onChange={(val) => (viewType.value = val)}
      />
    ),
  ],
  tableColumns: [
    { label: 'id', prop: 'id', width: 120 },
    { label: 'name', prop: 'name' },
  ],
})
</script>

<style scoped>
.thumb-view {
  padding: 0;
  padding-bottom: 1px;
  margin: 0;
  list-style: none;
}

.thumb-view li {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
}

.thumb-view li .thumb {
  height: 80px;
  display: block;
  background: #efefef;
}

.thumb::after {
  display: block;
  color: #999;
  content: 'Image';
  text-align: center;
  line-height: 80px;
}
</style>
