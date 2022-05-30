@@ -0,0 +1,424 @@
<template>
  <el-form
    :inline="true"
    :class="['lv__filterbar', { 'lv__filterbar--fold': isFold }]"
    @submit.prevent
    @keydown.enter="handleSubmit"
  >
    <div v-if="$slots['filterbar-top']" class="lv__filterbar-top">
      <slot name="filterbar-top" />
    </div>

    <div class="lv__filterbar-main">
      <div v-if="$slots['filterbar-left']" class="lv__filterbar-left">
        <slot name="filterbar-left" />
      </div>

      <div
        v-if="isShowFilterButtons || isShowFilterSubmit || isShowFilterFields"
        class="lv__filterbar-inner"
      >
        <!-- 提交、重置按钮区域 -->
        <div
          v-if="isShowFilterSubmit"
          ref="actionRef"
          :class="[
            'lv__filterbar-action',
            {
              'lv__filterbar-action--nomore': isNoMore,
              'lv__filterbar-action--onleft': isNoneFields,
            },
          ]"
        >
          <div
            :style="{ transform: `translateX(${searchBtnOffset}px)` }"
            class="lv__filterbar-action-submit"
          >
            <slot name="prepend-submit" />
            <el-button
              v-if="isShowSearchButton"
              v-bind="searchButtonProp"
              @click="handleFilterSearch"
            >
              {{ searchButtonProp.text }}
            </el-button>
            <el-button
              v-if="isShowResetButton"
              v-bind="resetButtonProp"
              @click="handleFilterReset"
            >
              {{ resetButtonProp.text }}
            </el-button>
            <slot name="append-submit" />
          </div>
          <div class="lv__filterbar-action-ext">
            <slot name="prepend-more" />
            <el-button
              v-if="filterbarFoldable"
              :icon="CaretTop"
              type="primary"
              class="lv__filterbar-action-more"
              @click="toggleFilterbar"
            />
            <slot name="append-more" />
          </div>
        </div>

        <!-- 操作按钮区域 -->
        <FilterbarButtons
          v-if="isShowFilterButtons"
          :buttons="filterButtons"
          class="lv__filterbar-buttons"
        />

        <!-- 搜索栏控件区域 -->
        <FilterbarFields
          v-if="isShowFilterFields"
          ref="filterbarFieldsRef"
          :fields="filterFields"
          class="lv__filterbar-fields"
        />
      </div>

      <div v-if="$slots['filterbar-right']" class="lv__filterbar-right">
        <slot name="filterbar-right" />
      </div>
    </div>

    <div v-if="$slots['filterbar-bottom']" class="lv__filterbar-bottom">
      <slot name="filterbar-bottom" />
    </div>
  </el-form>
</template>

<script lang="tsx" setup>
import type { PropType } from 'vue'
import { ref, unref, computed, useSlots, watch, nextTick, markRaw } from 'vue'
import { Search, CaretTop } from '@element-plus/icons-vue'
import { isPlainObject } from 'is-what'
import { FilterButton, FilterField } from '~/types'
import { hasOwn, useLvStore } from '@/utils'
import FilterbarButtons from './FilterbarButtons.vue'
import FilterbarFields from './FilterbarFields.vue'

const lvStore = useLvStore()

const DEFAULT_SEARCH_BUTTON = markRaw({
  text: '搜索',
  icon: Search,
  type: 'primary',
})

const DEFAULT_RESET_BUTTON = markRaw({
  text: '重置',
  type: 'default',
})

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  filterbarFoldable: {
    type: Boolean,
    default: true,
  },
  filterbarFold: {
    type: Boolean,
    default: true,
  },
  filterButtons: {
    type: Array as PropType<FilterButton[]>,
    default: /* istanbul ignore next */ () => [],
  },
  filterFields: {
    type: Array as PropType<FilterField[]>,
    default: /* istanbul ignore next */ () => [],
  },
  searchButton: {
    type: [Object, Boolean],
    default: true,
  },
  resetButton: {
    type: [Object, Boolean],
    default: true,
  },
})

const emit = defineEmits(['fold-change'])

const slots = useSlots()

const filterbarFieldsRef = ref<any>(null)
const actionRef = ref<Element | null>(null)
const isFold = ref(props.filterbarFold)
if (!props.filterbarFoldable) {
  isFold.value = false
}
const topRightItemIndex = ref(-1)
const actionOffsetLeft = ref(0)
const searchBtnOffset = ref(0)
const searchButtonProp = ref(
  isPlainObject(props.searchButton) ? props.searchButton : DEFAULT_SEARCH_BUTTON
)
const resetButtonProp = ref(
  isPlainObject(props.resetButton) ? props.resetButton : DEFAULT_RESET_BUTTON
)

const isNoneFields = computed(() => props.filterFields.length === 0)
const isShowFilterButtons = computed(() => props.filterButtons.length > 0)
const isShowFilterFields = computed(() => props.filterFields.length > 0)
const isShowSearchButton = computed(() => !!props.searchButton)
const isShowResetButton = computed(() => !!props.resetButton)
const isShowFilterSubmit = computed(
  () =>
    !!(
      !unref(isNoMore) ||
      unref(isShowSearchButton) ||
      unref(isShowResetButton) ||
      slots['prepend-filterbar-submit'] ||
      slots['append-filterbar-submit']
    )
)
const isNoMore = computed(
  () => unref(topRightItemIndex) === props.filterFields.length - 1
)

watch(
  [
    () => props.filterButtons,
    () => props.filterFields,
    isShowSearchButton,
    isShowResetButton,
  ],
  () => nextTick(updateLayout),
  {
    immediate: true,
  }
)

const $rootEmitProxy = lvStore.$rootEmitProxy.bind(lvStore)

function handleSubmit() {
  lvStore.pressEnterSearch && handleFilterSearch()
}

function handleFilterSearch() {
  $rootEmitProxy('filter-submit')
  lvStore.search()
}

function handleFilterReset() {
  const filterModel = lvStore.filterModel
  const _resetField = (field: FilterField) => {
    const name = field.model
    if (name && hasOwn(filterModel, name)) {
      const value = filterModel[name]
      if (Array.isArray(value)) {
        filterModel[name] = []
      } else {
        filterModel[name] = undefined
      }
    }
  }
  props.filterFields.forEach((field) => {
    if (Array.isArray(field)) {
      field.forEach(_resetField)
    } else {
      _resetField(field)
    }
  })
  $rootEmitProxy('filter-reset')
}

function toggleFilterbar() {
  isFold.value = !isFold.value
  emit('fold-change', isFold.value)
}

function updateLayout() {
  // TODO: updateTopRightItemIndex 计算流程待优化
  // updateTopRightItemIndex 影响 isNoMore 按钮显示，需计算后再执行按钮偏移量计算
  updateTopRightItemIndex()
  nextTick().then(() => {
    // updateTopRightItemIndex 可能受 more 按钮影响而产生变化，此处先直接重新计算作二次确认
    updateTopRightItemIndex()
    updateActionOffset()
    updateBtnOffset()
  })
}

function updateTopRightItemIndex() {
  let lastFilterIndex = -1
  const allFields: Element[] = unref(filterbarFieldsRef)?.$el.children
  if (allFields.length > 0) {
    let lastFilterTop = unref(actionRef)?.getBoundingClientRect().top || 0
    for (let i = 0; i < allFields.length; i++) {
      const curItemTop = allFields[i].getBoundingClientRect().top
      if (curItemTop > lastFilterTop) {
        break
      }
      lastFilterIndex = i
    }
  }
  topRightItemIndex.value = lastFilterIndex
}

function updateBtnOffset() {
  let offset = 0
  const allFields: Element[] = unref(filterbarFieldsRef)?.$el.children
  if (unref(topRightItemIndex) >= 0) {
    const lastItem = allFields[unref(topRightItemIndex)]
    const { left, width } = lastItem.getBoundingClientRect()
    offset = left + width - unref(actionOffsetLeft) + 10
    offset = Math.min(0, offset)
  }
  searchBtnOffset.value = Math.floor(offset)
}

function updateActionOffset() {
  const $action = unref(actionRef)
  if ($action) {
    actionOffsetLeft.value = $action.getBoundingClientRect().left
  }
}

defineExpose({
  updateLayout,
})
</script>

<style lang="less">
@filter-gap-size: 10px;

.lv__filterbar-top {
  margin-bottom: @filter-gap-size;
}
.lv__filterbar-bottom {
  margin-bottom: @filter-gap-size;
}
.lv__filterbar-left {
  margin-right: @filter-gap-size;
  margin-bottom: @filter-gap-size;
}
.lv__filterbar-right {
  margin-left: @filter-gap-size;
  margin-bottom: @filter-gap-size;
}
.lv__filterbar-main {
  display: flex;
}

.lv__filterbar {
  .el-button {
    .el-icon {
      vertical-align: top;

      // svg {
      //   width: 1em;
      // }
    }

    height: 32px;
    padding-top: 0;
    padding-bottom: 0;
    line-height: 1;
    vertical-align: top;
  }
  .el-input-group__append,
  .el-input-group__prepend {
    padding: 0 10px;
  }
  .el-form-item__label {
    padding: 0 0 0 2px;
    margin-right: -4px;
  }
  .el-form-item {
    margin: 0 !important;
  }
}

.lv__filterbar {
  &-buttons {
    float: left;
    margin-right: 0;

    > div.el-form-item__content {
      .el-button + .el-dropdown,
      .el-dropdown + .el-button,
      .el-dropdown + .el-dropdown,
      > * {
        display: inline-block;
        margin-right: @filter-gap-size;
        margin-left: 0;
      }
    }
  }

  &-action {
    display: flex;
    float: right;
    margin: 0;
    margin-bottom: 10px;

    &--nomore {
      .lv__filterbar-action-more {
        display: none;
      }
    }

    &--onleft {
      float: none;
      display: inline-block;
    }
  }

  &-action-submit .el-form-item__content,
  &-action-ext {
    display: flex;
    & > * {
      display: inline-block;
      transition: inherit;
    }
    & > *:not(:nth-child(1)) {
      margin-left: 10px;
    }
  }

  &-action-ext {
    float: right;
    margin-left: 10px;
  }

  & &-action-more {
    width: 40px;
    padding: 0;
    transition: none;
  }
}

.lv__filterbar-inner {
  flex: 1;
  padding-top: @filter-gap-size;
  margin-top: -@filter-gap-size;

  &::after {
    display: table;
    clear: both;
    content: '';
  }
}

.lv__filterbar--fold {
  .lv__filterbar-inner {
    box-sizing: content-box;
    height: 32px;
    overflow: hidden;
    margin-bottom: @filter-gap-size;
  }

  .lv__filterbar-action-more {
    transform: rotate(180deg);
  }
}
</style>
