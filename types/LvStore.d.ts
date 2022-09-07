import { Ref, UnwrapNestedRefs } from 'vue'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Emitter } from 'mitt'
import { ListviewProps } from './Props'

export declare class LvStore {
  emitter: Emitter
  pressEnterSearch: ListviewProps['pressEnterSearch']
  filterModel: UnwrapNestedRefs<ListviewProps['filterModel']>
  usePage: ListviewProps['usePage']
  pagePosition: ListviewProps['pagePosition']
  pageSizes: ListviewProps['pageSizes']
  pageProps: ListviewProps['pageProps']
  currentPage: Ref<number>
  currentPageSize: Ref<ListviewProps['currentPageSize']>
  contentHeight: Ref<number>
  contentLoading: Ref<boolean>
  internalContentMessage: Ref<{ type: string; text: string }>
  selection: Ref<any[]>
  contentData: Ref<Record<string, any>>

  rootEmitProxy: (eventName: string, payload: any) => void
  search: (keepInPage?: boolean) => Promise<any>
  setContentMessage: (
    text: string,
    type?: ContentMessageObject['type'],
    cleanData?: boolean
  ) => void
}
