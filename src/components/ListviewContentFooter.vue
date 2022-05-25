<script lang="tsx">
import { defineComponent, unref, computed } from 'vue'
import { isNil } from 'lodash-es'
import { useLvStore } from '@/utils'

export default defineComponent({
  name: 'ListviewContentFooter',

  inheritAttrs: false,

  setup(_, { slots }) {
    const lvStore = useLvStore()
    const usePage = computed(() => lvStore.usePage)
    const pagePosition = computed(() => lvStore.pagePosition)
    const currentPage = computed({
      get: () => lvStore.currentPage,
      set: (val: number) => (lvStore.currentPage = val),
    })
    const currentPageSize = computed({
      get: () => unref(lvStore.currentPageSize),
      set: (val: number) => (lvStore.currentPageSize = val),
    })
    const mergedAttrs = computed(() => {
      let total = unref(lvStore.contentData).total
      total = isNil(total) ? 0 : total
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
        <el-pagination
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
