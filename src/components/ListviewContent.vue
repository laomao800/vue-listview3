<template>
  <div class="lv__content lv__table-content">
    <el-table
      ref="contentTable"
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

      <v-node
        v-for="(column, index) in tableColumns"
        :key="`col${index}`"
        :node="renderTableColumn(column)"
      />
    </el-table>
  </div>
</template>

<script lang="tsx">
import type { Slots } from 'vue'
import { defineComponent, h } from 'vue'
import { isPlainObject, isFunction, mapKeys, kebabCase, merge } from 'lodash-es'
import parseSize from '@laomao800/parse-size-with-unit'
import { ElTableColumn } from 'element-plus'
import storeProviderMixin from '@/mixins/storeProviderMixin'
import { nodeParents } from '@/utils'
import VNode from '@/components/VNode'
import MessageBlock from '@/components/MessageBlock.vue'

export default defineComponent({
  name: 'ListviewContent',

  components: { VNode, MessageBlock },

  mixins: [storeProviderMixin],

  inheritAttrs: false,

  props: {
    tableColumns: { type: Array, default: () => [] },
    tableSelectionColumn: { type: [Boolean, String, Object], default: true },
    contentProps: { type: Object, default: () => ({}) },
    contentEvents: { type: Object, default: () => ({}) },
  },

  computed: {
    _height() {
      return parseSize(this.lvStore.contentHeight)
    },
    selection: {
      get() {
        return this.lvStore.selection
      },
      set(newVal: any[]) {
        this.lvStore.selection = newVal
      },
    },
    contentData() {
      return this.lvStore.contentData
    },
    contentMessage() {
      return this.lvStore.internalContentMessage
    },

    /**
     * 规范化表格选择列配置
     */
    selectionColumn(): any {
      const column = this.tableSelectionColumn
      if (column === false) {
        return false
      }
      let finalColumn: any = {}
      if (column === 'single') {
        finalColumn.type = 'single'
      } else if (isPlainObject(column)) {
        finalColumn.type = column.type === 'single' ? 'single' : 'selection'
      }
      finalColumn.selectable = isFunction(column.selectable)
        ? column.selectable
        : null
      return finalColumn
    },

    /**
     * 写在 $attrs 上的 prop 优先级会比 v-bind 内的高，以下 3 个属性需要可配置，
     * 既 <el-table size="small" v-bind="contentProps" /> 无法修改 size 的值，
     * 因此先通过 computed 合并所需的 props ，再统一绑定最后的合并结果
     */
    normalizedContentProps(): any {
      const defaultProps = { size: 'small', border: true, stripe: true }
      const mergedPros = mapKeys(
        merge(defaultProps, this.contentProps),
        (value, key) => kebabCase(key)
      )

      const _rowClassName = mergedPros['row-class-name']
      const getRowClassName = (rowData: {
        row: Record<string, any>
        rowIndex: number
      }) => {
        const classNames = [this.getRowClassName(rowData)]
        if (isFunction(_rowClassName)) {
          classNames.push(_rowClassName(rowData))
        } else if (_rowClassName) {
          classNames.push(_rowClassName)
        }
        return classNames.join(' ')
      }
      mergedPros['row-class-name'] = getRowClassName

      return mergedPros
    },

    /**
     * 对传入的 contentEvents 的 key 统一转换为横线分隔格式
     */
    normalizedContentEvents(): any {
      /* istanbul ignore next */
      return mapKeys(this.contentEvents, (value, key) => kebabCase(key))
    },
  },

  watch: {
    contentData() {
      try {
        // 重置表格垂直滚动距离
        if (this.$refs.contentTable as any) {
          ;(this.$refs.contentTable as any).bodyWrapper.scrollTop = 0
        }
      } catch (e) {}
    },
  },

  methods: {
    /**
     * el-table 表格选中数据同步至父组件
     */
    handleTableSelectionChange(val: any) {
      this.selection = val
    },

    /**
     * tableColumns 转换为 el-table-column ，支持 children 属性多级列配置
     */
    renderTableColumn(tableColumn: any) {
      const _createColumn = (column: any) => {
        const { render, children, ...props } = column
        let slots: Slots = {}
        if (render) {
          slots.default = (props) => render(props)
        } else if (Array.isArray(children)) {
          slots.default = () => children.map((child) => _createColumn(child))
        }
        return h(ElTableColumn, props, slots)
      }
      return isPlainObject(tableColumn) ? _createColumn(tableColumn) : null
    },

    /**
     * el-table 开启表格数据选择功能时表格行点击切换已选选项
     */
    handleRowClick(row: any, column: any, event: MouseEvent) {
      if (this.selectionColumn) {
        if (this.selectionColumn.selectable && event) {
          // 选择列中若有禁用选项则当行数据禁止选中
          const $rowNode = nodeParents(
            event.target as Element,
            '.el-table__row'
          )
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
        if (this.selectionColumn.type === 'single') {
          ;(this.$refs.contentTable as any).clearSelection()
        }
        ;(this.$refs.contentTable as any).toggleRowSelection(row)
      }
    },

    /**
     * el-table 自定义选中行高亮
     */
    getRowClassName(rowData: any): string {
      return this.selection.indexOf(rowData.row) > -1 ? 'row--selected' : ''
    },
  },
})
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
