<template>
  <div class="lv-content lv-content-table">
    <ElTable
      ref="contentTableRef"
      border
      stripe
      v-bind="contentAttrs"
      :row-class-name="rowClassName"
      :data="contentData.items"
      :height="_height"
      :style="{ width: '100%' }"
      @selection-change="handleTableSelectionChange"
      @row-click="handleRowClick"
    >
      <template #empty>
        <slot name="content-empty">
          <MessageBlock
            v-if="contentMessage.text"
            :type="contentMessage.type"
            :text="contentMessage.text"
          />
        </slot>
      </template>

      <template v-if="!!selectionColumn">
        <ElTableColumn
          v-if="selectionColumn.type === 'single'"
          :resizable="false"
          :fixed="tableColumns.some((col) => col.fixed)"
          width="50"
          align="center"
          class-name="el-table-column--selection el-table-column--single-selection"
        >
          <template #default="{ row, $index }">
            <ElRadio
              :model-value="selection.indexOf(row) > -1 ? '' : false"
              :disabled="
                selectionColumn.selectable
                  ? !selectionColumn.selectable.call(null, row, $index)
                  : false
              "
              label
              @click.stop.prevent="($event: any) => handleRowClick(row, null, $event)"
            />
          </template>
        </ElTableColumn>

        <ElTableColumn
          v-else
          v-bind="selectionColumn"
          type="selection"
          width="50"
          align="center"
        />
      </template>

      <component
        :is="renderTableColumn(column)"
        v-for="column in tableColumns"
        :key="column.columnKey || column.prop"
      />
    </ElTable>
  </div>
</template>

<script lang="tsx" setup>
import parseSize from '@laomao800/parse-size'
import { ElRadio, ElTable, ElTableColumn } from 'element-plus'
import { isFunction, isPlainObject, isString } from 'is-what'
import type { PropType } from 'vue'
import { computed, h, isVNode, ref, unref, watch } from 'vue'

import type { TableColumn } from '~/types'

import MessageBlock from '@/components/MessageBlock.vue'
import { useLvStore } from '@/useLvStore'
import { nodeParents } from '@/utils'

defineOptions({
  inheritAttrs: false,
})

const lvStore = useLvStore()
const props = defineProps({
  tableColumns: { type: Array as PropType<TableColumn[]>, default: () => [] },
  tableSelectionColumn: { type: [Boolean, String, Object], default: true },
  contentAttrs: { type: Object, default: () => ({}) },
})

const contentTableRef = ref<any>(null)
const _height = computed(
  () => parseSize(unref(lvStore.state.contentHeight)) || undefined
)
const selection = computed({
  get: () => unref(lvStore.state.selection),
  set: (newVal) => (lvStore.state.selection = newVal),
})
const contentData = computed(() => lvStore.state.contentData)
const contentMessage = computed(() => lvStore.state.contentMessage)

/**
 * 规范化表格选择列配置
 */
const selectionColumn = computed(() => {
  const column = props.tableSelectionColumn
  if (column === false) {
    return false
  }
  const finalColumn: any = { selectable: null }
  if (column === 'single') {
    finalColumn.type = 'single'
  } else if (isPlainObject(column)) {
    finalColumn.type = column.type === 'single' ? 'single' : 'selection'
    if (isFunction(column.selectable)) {
      finalColumn.selectable = column.selectable
    }
  }
  return finalColumn
})

const attrClassName =
  props.contentAttrs['row-class-name'] || props.contentAttrs['rowClassName']
const rowClassName = (rowData: {
  row: Record<string, any>
  rowIndex: number
}) => {
  const result = []
  if (isFunction(attrClassName)) {
    result.push(attrClassName(rowData))
  } else if (isString(attrClassName)) {
    result.push(attrClassName)
  }
  if (unref(selection).includes(rowData.row)) {
    result.push('lv-row--selected')
  }
  return result.join(' ')
}

watch(contentData, () => {
  try {
    // 重置表格垂直滚动距离
    contentTableRef.value.$refs.scrollBarRef.scrollTo(0, 0)
  } catch (e) {}
})

/**
 * el-table 表格选中数据同步至父组件
 */
function handleTableSelectionChange(val: any) {
  selection.value = val
}

/**
 * tableColumns 转换为 el-table-column ，支持 children 属性多级列配置
 */
function renderTableColumn(tableColumn: TableColumn) {
  const _createColumn = (column: TableColumn) => {
    const { render, children, ...restOptions } = column
    const slots: Record<string, any> = {}
    if (render) {
      if (isFunction(render)) {
        slots.default = (props: any) => render(props)
      } else if (isVNode(render)) {
        slots.default = () => render
      }
    } else if (Array.isArray(children)) {
      slots.default = () => children.map((child) => _createColumn(child))
    }
    return h(ElTableColumn, restOptions, slots)
  }
  return isPlainObject(tableColumn) ? _createColumn(tableColumn) : null
}

/**
 * el-table 开启表格数据选择功能时表格行点击切换已选选项
 */
function handleRowClick(row: any, column: any, event: MouseEvent) {
  if (unref(selectionColumn)) {
    if (unref(selectionColumn).selectable && event) {
      // 选择列中若有禁用选项则当行数据禁止选中
      const $rowNode = nodeParents(event.target as Element, '.el-table__row')
      if ($rowNode) {
        const $selectNode = $rowNode.querySelector(
          '.el-table-column--selection input'
        )
        if (
          !$selectNode ||
          ($selectNode && ($selectNode as HTMLInputElement).disabled)
        ) {
          return
        }
      }
    }
    // 单选效果每次选择前清空 el-table 内部的存储值
    if (unref(selectionColumn).type === 'single') {
      contentTableRef.value.clearSelection()
    }
    contentTableRef.value.toggleRowSelection(row)
  }
}
</script>

<style lang="less">
.lv-content {
  overflow: auto;

  .el-scrollbar__view {
    height: 100%;
  }

  .el-table__empty-text {
    width: auto;
  }
}
</style>
