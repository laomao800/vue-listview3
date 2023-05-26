<template>
  <ElForm
    :inline="true"
    :class="{ 'lv-filterbar--fold': isFold }"
    class="lv-filterbar"
    @submit.prevent
    @keydown.enter="handleSubmit"
  >
    <div v-if="$slots['filterbar-top']" class="lv-filterbar__top">
      <slot name="filterbar-top" />
    </div>

    <div class="lv-filterbar__main">
      <div v-if="$slots['filterbar-left']" class="lv-filterbar__left">
        <slot name="filterbar-left" />
      </div>

      <div
        v-if="isShowFilterButtons || isShowFilterSubmit || isShowFilterFields"
        class="lv-filterbar__inner"
      >
        <!-- 提交、重置按钮区域 -->
        <div
          v-if="isShowFilterSubmit"
          ref="actionRef"
          class="lv-filterbar__action"
          :class="{
            'lv-filterbar__action--nomore': isNoMore,
            'lv-filterbar__action--onleft': isNoneFields,
          }"
        >
          <div
            :style="{ transform: `translateX(${searchBtnOffset}px)` }"
            class="lv-filterbar__submit"
          >
            <slot name="prepend-submit" />
            <ElButton
              v-if="isShowSearchButton"
              v-bind="searchButtonProp.attrs"
              @click="handleFilterSearch"
            >
              {{ searchButtonProp.text }}
            </ElButton>
            <ElButton
              v-if="isShowResetButton"
              v-bind="resetButtonProp.attrs"
              @click="resetFilter"
            >
              {{ resetButtonProp.text }}
            </ElButton>
            <slot name="append-submit" />
          </div>
          <div class="lv-filterbar__action-ext">
            <slot name="prepend-more" />
            <ElButton
              v-if="filterbarFoldable"
              :icon="CaretTop"
              type="primary"
              class="lv-filterbar__action-more"
              @click="toggleFilterbar"
            />
            <slot name="append-more" />
          </div>
        </div>

        <!-- 操作按钮区域 -->
        <FilterbarButtons
          v-if="isShowFilterButtons"
          :buttons="filterButtons"
          class="lv-filterbar__buttons"
        />

        <!-- 搜索栏控件区域 -->
        <FilterbarFields
          v-if="isShowFilterFields"
          ref="filterbarFieldsRef"
          :fields="filterFields"
          class="lv-filterbar__fields"
        />
      </div>

      <div v-if="$slots['filterbar-right']" class="lv-filterbar__right">
        <slot name="filterbar-right" />
      </div>
    </div>

    <div v-if="$slots['filterbar-bottom']" class="lv-filterbar__bottom">
      <slot name="filterbar-bottom" />
    </div>
  </ElForm>
</template>

<script lang="tsx" setup>
import type { PropType } from 'vue'
import { ref, unref, computed, useSlots, watch, nextTick, markRaw } from 'vue'
import { ElForm, ElButton } from 'element-plus'
import { Search, CaretTop } from '@element-plus/icons-vue'
import { isPlainObject } from 'is-what'
import type { FilterButton, FilterField } from '~/types'
import { useLvStore } from '@/useLvStore'
import FilterbarButtons from './FilterbarButtons.vue'
import FilterbarFields from './FilterbarFields.vue'

const lvStore = useLvStore()
lvStore.emitter.on('updateFilterLayout', updateLayout)

const DEFAULT_SEARCH_BUTTON = markRaw({
  text: '搜索',
  attrs: { type: 'primary', icon: Search },
})

const DEFAULT_RESET_BUTTON = markRaw({
  text: '重置',
  attrs: { type: 'default' },
})

defineOptions({
  name: 'ListviewFilterbar',
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
    default: () => [],
  },
  filterFields: {
    type: Array as PropType<FilterField[]>,
    default: () => [],
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
const isFold = ref(!props.filterbarFoldable ? false : props.filterbarFold)
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

const rootEmitProxy = lvStore?.rootEmitProxy?.bind(lvStore)

function handleSubmit() {
  lvStore.state.pressEnterSearch && handleFilterSearch()
}

function handleFilterSearch() {
  rootEmitProxy('filter-submit')
  lvStore.search()
}

function resetFilter() {
  lvStore.resetFilterModel()
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
  const allFields: Element[] = unref(filterbarFieldsRef)?.$el.children || []
  if (allFields.length > 0) {
    const lastFilterTop = unref(actionRef)?.getBoundingClientRect().top || 0
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
</script>

<style lang="less">
@filter-gap-size: 10px;

.lv-filterbar__top {
  margin-bottom: @filter-gap-size;
}
.lv-filterbar__bottom {
  margin-bottom: @filter-gap-size;
}
.lv-filterbar__left {
  margin-right: @filter-gap-size;
  margin-bottom: @filter-gap-size;
}
.lv-filterbar__right {
  margin-left: @filter-gap-size;
  margin-bottom: @filter-gap-size;
}
.lv-filterbar__main {
  display: flex;
}

.lv-filterbar {
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

.lv-filterbar {
  &__buttons {
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

  &__action {
    display: flex;
    float: right;
    margin: 0;
    margin-bottom: 10px;

    &--nomore {
      .lv-filterbar__action-more {
        display: none;
      }
    }

    &--onleft {
      float: none;
      display: inline-block;
    }
  }

  &__submit .el-form-item__content,
  &__action-ext {
    display: flex;
    & > * {
      display: inline-block;
      transition: inherit;
    }
    & > *:not(:nth-child(1)) {
      margin-left: 10px;
    }
  }

  &__action-ext {
    float: right;
    margin-left: 10px;
  }

  & &__action-more {
    width: 40px;
    padding: 0;
    transition: none;
  }
}

.lv-filterbar__inner {
  flex: 1;
  padding-top: @filter-gap-size;
  margin-top: -@filter-gap-size;

  &::after {
    display: table;
    clear: both;
    content: '';
  }
}

.lv-filterbar--fold {
  .lv-filterbar__inner {
    box-sizing: content-box;
    height: 32px;
    overflow: hidden;
    margin-bottom: @filter-gap-size;
  }

  .lv-filterbar__action-more {
    transform: rotate(180deg);
  }
}
</style>
