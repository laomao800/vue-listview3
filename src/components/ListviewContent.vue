<template>
  <div class="lv__content lv__table-content">
    <el-table
      ref="contentTableRef"
      :data="contentData.items"
      :height="_height"
      :style="{ width: '100%' }"
      v-bind="normalizedContentProps"
      @selection-change="handleTableSelectionChange"
      @row-click="handleRowClick"
      v-on="normalizedContentEvents"
    >
      <template #empty>
        <slot name="empty" v-bind="contentMessage">
          <MessageBlock
            v-if="contentMessage.text"
            :type="contentMessage.type"
            :text="contentMessage.text"
          />
        </slot>
      </template>

      <template v-if="!!selectionColumn">
        <el-table-column
          v-if="selectionColumn.type === 'single'"
          :resizable="false"
          :fixed="tableColumns.some((col) => col.fixed)"
          width="50"
          align="center"
          class-name="el-table-column--selection el-table-column--single-selection"
        >
          <template #default="{ row, $index }">
            <el-radio
              :model-value="selection.indexOf(row) > -1 ? '' : false"
              :disabled="
                selectionColumn.selectable
                  ? !selectionColumn.selectable.call(null, row, $index)
                  : false
              "
              label
              @click.stop.prevent="
                ($event) => handleRowClick(row, null, $event)
              "
            />
          </template>
        </el-table-column>

        <el-table-column
          v-else
          v-bind="selectionColumn"
          type="selection"
          width="50"
          align="center"
        />
      </template>

      <component
        :is="renderTableColumn(column)"
        v-for="(column, index) in tableColumns"
        :key="`col${index}`"
      />
    </el-table>
  </div>
</template>

<script lang="tsx" setup>
import type { PropType } from 'vue'
import { computed, ref, unref, watch, h } from 'vue'
import { mapKeys, kebabCase, merge } from 'lodash-es'
import { isPlainObject, isFunction } from 'is-what'
import parseSize from '@laomao800/parse-size-with-unit'
import { ElTableColumn } from 'element-plus'
import { useLvStore, nodeParents } from '@/utils'

import MessageBlock from '@/components/MessageBlock.vue'
import { TableColumn } from '~/types'

const props = defineProps({
  tableColumns: { type: Array as PropType<TableColumn[]>, default: () => [] },
  tableSelectionColumn: { type: [Boolean, String, Object], default: true },
  contentProps: { type: Object, default: () => ({}) },
  contentEvents: { type: Object, default: () => ({}) },
})

defineOptions({
  inheritAttrs: false,
})

const lvStore = useLvStore()
const contentTableRef = ref<any>(null)

const _height = computed(() => parseSize(lvStore.contentHeight) || void 0)
const selection = computed({
  get: () => lvStore.selection,
  set: (newVal) => (lvStore.selection = newVal),
})
const contentData = computed(() => lvStore.contentData)
const contentMessage = computed(
  () => lvStore.internalContentMessage || ({} as any)
)
/**
 * 规范化表格选择列配置
 */
const selectionColumn = computed(() => {
  const column = props.tableSelectionColumn
  if (column === false) {
    return false
  }
  let finalColumn: any = { selectable: null }
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

/**
 * 写在 $attrs 上的 prop 优先级会比 v-bind 内的高，以下 3 个属性需要可配置，
 * 既 <el-table size="small" v-bind="contentProps" /> 无法修改 size 的值，
 * 因此先通过 computed 合并所需的 props ，再统一绑定最后的合并结果
 */
const normalizedContentProps = computed(() => {
  const defaultProps = { size: 'small', border: true, stripe: true }
  const mergedPros = mapKeys(
    merge(defaultProps, props.contentProps),
    (value, key) => kebabCase(key)
  )

  const _rowClassName = mergedPros['row-class-name']
  const _getRowClassName = (rowData: {
    row: Record<string, any>
    rowIndex: number
  }) => {
    const classNames = [getRowClassName(rowData)]
    if (isFunction(_rowClassName)) {
      classNames.push(_rowClassName(rowData))
    } else if (_rowClassName) {
      classNames.push(_rowClassName)
    }
    return classNames.join(' ')
  }
  mergedPros['row-class-name'] = _getRowClassName

  return mergedPros
})

/**
 * 对传入的 contentEvents 的 key 统一转换为横线分隔格式
 */
const normalizedContentEvents = computed(() =>
  mapKeys(props.contentEvents, (value, key) => kebabCase(key))
)

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
  this.selection = val
}

/**
 * tableColumns 转换为 el-table-column ，支持 children 属性多级列配置
 */
function renderTableColumn(tableColumn: any) {
  const _createColumn = (column: any) => {
    const { render, children, ...restOptions } = column
    let slots: Record<string, any> = {}
    if (render) {
      slots.default = (props: any) => render(props)
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

/**
 * el-table 自定义选中行高亮
 */
function getRowClassName(rowData: any): string {
  return unref(selection).indexOf(rowData.row) > -1 ? 'row--selected' : ''
}
</script>

<style lang="less">
.lv__content {
  overflow: auto;

  .el-scrollbar__view {
    height: 100%;
  }

  .el-table__empty-text {
    width: auto;
  }
}
</style>
