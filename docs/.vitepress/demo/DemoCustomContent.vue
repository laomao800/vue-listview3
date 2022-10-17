<template>
  <Listview v-bind="lvConfig">
    <template v-if="viewType === 'thumb'" #content="{ state }">
      <div v-if="state.contentMessage.text">
        {{ state.contentMessage.text }}
      </div>
      <ul v-else class="thumb-view">
        <li v-for="(item, index) in state.contentData.items" :key="index">
          <div class="thumb"></div>
          <div class="info">
            <div class="id">{{ item.id }}</div>
            <div class="name">{{ item.name }}</div>
          </div>
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

<style lang="less" scoped>
.thumb-view {
  padding: 0;
  padding-bottom: 1px;
  margin: 0;
  // overflow: auto;
  list-style: none;

  li {
    box-sizing: border-box;
    float: left;
    width: 12.5%;
    padding: 10px;
    margin: 0 -1px -1px 0;
    border: 1px solid #ddd;

    .el-button {
      height: 24px;
    }

    .thumb {
      width: 100%;
      height: 160px;
      background: #efefef;
      &::after {
        display: block;
        color: #999;
        content: 'Image';
        text-align: center;
      }
    }

    .info {
      padding: 5px;

      .id {
        font-size: 12px;
        color: #999;
      }
      .name {
        height: 1.6em;
        overflow: hidden;
        font-size: 12px;
        line-height: 1.6em;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .action {
      button {
        padding: 4px 8px;
      }
    }
  }
}

@media (max-width: 1360px) {
  .thumb-view li {
    width: 20%;
  }
}
</style>
