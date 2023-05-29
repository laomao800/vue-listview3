<script lang="tsx">
import { ElPagination } from 'element-plus'
import { isNumber } from 'is-what'
import { computed, defineComponent, unref } from 'vue'

import { useLvStore } from '@/useLvStore'

export default defineComponent({
  name: 'ListviewContentFooter',

  inheritAttrs: false,

  setup(_, { slots }) {
    const lvStore = useLvStore()
    const usePage = computed(() => lvStore.state.usePage)
    const pagePosition = computed(() => lvStore.state.pagePosition)
    const currentPage = computed({
      get: () => unref(lvStore.state.currentPage),
      set: (val: number) => (lvStore.state.currentPage = val),
    })
    const currentPageSize = computed({
      get: () => unref(lvStore.state.currentPageSize),
      set: (val: number) => (lvStore.state.currentPageSize = val),
    })
    const mergedAttrs = computed(() => {
      let total = unref(lvStore.state.contentData).total
      total = isNumber(total) ? total : 0
      return {
        pageSize: unref(currentPageSize),
        pageSizes: lvStore.state.pageSizes,
        background: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        ...lvStore.state.pageAttrs,
        total,
        currentPage: unref(currentPage),
        'onUpdate:currentPage': (page: number) => {
          currentPage.value = page
        },
        'onUpdate:pageSize': (pageSize: number) => {
          currentPageSize.value = pageSize
        },
      }
    })

    const _renderSlot = (name: string) => slots[name]?.()
    const _renderPager = (position: string) =>
      unref(usePage) &&
      unref(pagePosition) === position && (
        <ElPagination
          {...unref(mergedAttrs)}
          ref="pagination"
          class="lv-pager"
        />
      )

    return () => (
      <div class="lv-footer">
        <div class="lv-footer__left">
          {_renderSlot('footer-left') || _renderPager('left')}
        </div>

        <div class="lv-footer__center">{_renderSlot('footer-center')}</div>

        <div class="lv-footer__right">
          {_renderSlot('footer-right') || _renderPager('right')}
        </div>
      </div>
    )
  },
})
</script>

<style lang="less">
.lv-footer {
  display: flex;
  padding-top: 5px;

  &__left,
  &__center,
  &__right {
    display: flex;
    flex: 1;
    align-items: center;
  }

  &__left {
    justify-content: flex-start;
  }
  &__center {
    flex: inherit;
    justify-content: center;
  }
  &__right {
    justify-content: flex-end;
  }
}
</style>
