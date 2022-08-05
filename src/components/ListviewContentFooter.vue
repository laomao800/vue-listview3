<script lang="tsx">
import { defineComponent, unref, computed } from 'vue'
import { ElPagination } from 'element-plus'
import { isNumber } from 'is-what'
import { useLvStore } from '@/useLvStore'

export default defineComponent({
  name: 'ListviewContentFooter',

  inheritAttrs: false,

  setup(_, { slots }) {
    const lvStore = useLvStore()
    const usePage = computed(() => lvStore.usePage)
    const pagePosition = computed(() => lvStore.pagePosition)
    const currentPage = computed({
      get: () => unref(lvStore.currentPage),
      set: (val: number) => (lvStore.currentPage.value = val),
    })
    const currentPageSize = computed({
      get: () => unref(lvStore.currentPageSize),
      set: (val: number) => (lvStore.currentPageSize.value = val),
    })
    const mergedAttrs = computed(() => {
      let total = unref(lvStore.contentData).total
      total = isNumber(total) ? total : 0
      return {
        pageSize: unref(currentPageSize),
        pageSizes: lvStore.pageSizes,
        background: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        ...lvStore.pageProps,
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
          class="lv__pager"
        />
      )

    return () => (
      <div class="lv__footer">
        <div class="lv__footer-left">
          {_renderSlot('footer-left') || _renderPager('left')}
        </div>

        <div class="lv__footer-center">{_renderSlot('footer-center')}</div>

        <div class="lv__footer-right">
          {_renderSlot('footer-right') || _renderPager('right')}
        </div>
      </div>
    )
  },
})
</script>

<style lang="less">
.lv__footer {
  display: flex;
  padding-top: 5px;

  &-left,
  &-center,
  &-right {
    display: flex;
    flex: 1;
    align-items: center;
  }

  &-left {
    justify-content: flex-start;
  }
  &-center {
    flex: inherit;
    justify-content: center;
  }
  &-right {
    justify-content: flex-end;
  }
}
</style>
